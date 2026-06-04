import { getPrisma } from '~/server/utils/db'
import { verifyProxyToken } from '~/server/utils/proxy-auth'
import { signToken } from '~/server/utils/jwt'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { appId, proxyToken: token, externalId, externalEmail, externalNick } = body

  if (!appId || !token || !externalId) {
    throw createError({ statusCode: 400, statusMessage: '缺少必要参数' })
  }

  const prisma = getPrisma()

  // Find app by appId
  const app = await prisma.app.findUnique({ where: { appId } })
  if (!app || !app.isActive) {
    throw createError({ statusCode: 401, statusMessage: '应用不存在或已禁用' })
  }

  // Verify proxy token (HMAC-SHA256 signed by app secret)
  const payload = verifyProxyToken(app.secret, token)
  if (!payload) {
    throw createError({ statusCode: 401, statusMessage: '代理令牌无效' })
  }

  // Check nonce for replay protection
  const nonce = payload.nonce as string
  if (!nonce) {
    throw createError({ statusCode: 400, statusMessage: '缺少nonce' })
  }

  const existingNonce = await prisma.nonce.findUnique({ where: { nonce } })
  if (existingNonce) {
    throw createError({ statusCode: 400, statusMessage: 'nonce已被使用' })
  }

  // Store nonce with expiry
  const config = useRuntimeConfig()
  await prisma.nonce.create({
    data: {
      appId: app.id,
      nonce,
      expiresAt: new Date(Date.now() + config.proxyTokenTtl * 1000),
    },
  })

  // Find or create internal user mapping
  let thirdPartyUser = await prisma.thirdPartyUser.findUnique({
    where: { appId_externalId: { appId: app.id, externalId } },
    include: { internalUser: true },
  })

  let user = thirdPartyUser?.internalUser

  if (!user) {
    // Create new internal user
    const randomPassword = await bcrypt.hash(Math.random().toString(36), 10)
    user = await prisma.user.create({
      data: {
        email: externalEmail || `${externalId}@proxy.${appId}.local`,
        nickname: externalNick || `User_${externalId}`,
        password: randomPassword,
        role: 'user',
        isActive: true,
      },
    })

    thirdPartyUser = await prisma.thirdPartyUser.create({
      data: {
        appId: app.id,
        externalId,
        externalEmail: externalEmail || null,
        externalNick: externalNick || null,
        internalUserId: user.id,
      },
    })
  } else {
    await prisma.thirdPartyUser.update({
      where: { id: thirdPartyUser.id },
      data: { lastLoginAt: new Date() },
    })
  }

  // Generate internal JWT
  const jwt = signToken(
    { userId: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    config.jwtExpiresIn
  )

  return {
    err: 'ok',
    data: {
      token: jwt,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        role: user.role,
      },
    },
  }
})
