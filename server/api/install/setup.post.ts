import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { getPrisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const prisma = getPrisma()

  // 检查是否已安装
  const adminCount = await prisma.user.count({
    where: { role: 'admin' },
  })

  if (adminCount > 0) {
    throw createError({ statusCode: 400, statusMessage: '系统已安装，无法重复安装' })
  }

  const body = await readBody(event)
  const { username, email, password, nickname, siteName } = body

  if (!username || !email || !password || !nickname) {
    throw createError({ statusCode: 400, statusMessage: '请填写完整信息' })
  }

  const usernameRegex = /^[a-zA-Z0-9_]{2,20}$/
  if (!usernameRegex.test(username.trim())) {
    throw createError({ statusCode: 400, statusMessage: '用户名只能包含字母、数字和下划线，长度2-20位' })
  }

  if (password.length < 6 || password.length > 50) {
    throw createError({ statusCode: 400, statusMessage: '密码长度需在6-50个字符之间' })
  }

  // 创建管理员账户
  const hashedPassword = await bcrypt.hash(password, 10)
  const admin = await prisma.user.create({
    data: {
      username: username.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      nickname,
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    },
  })

  // 创建默认应用
  const appId = `app_${crypto.randomBytes(8).toString('hex')}`
  const secret = crypto.randomBytes(32).toString('hex')

  const app = await prisma.app.create({
    data: {
      appId,
      secret,
      name: siteName || '默认应用',
      domains: '',
      isActive: true,
    },
  })

  return {
    err: 'ok',
    data: {
      admin: {
        id: admin.id,
        email: admin.email,
        nickname: admin.nickname,
      },
      app: {
        appId: app.appId,
        name: app.name,
      },
    },
  }
})
