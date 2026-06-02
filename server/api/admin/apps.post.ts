import crypto from 'crypto'
import { getPrisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  if (!event.context.user || event.context.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: '需要管理员权限' })
  }

  const body = await readBody(event)
  const { name, domains } = body

  if (!name || !name.trim()) {
    throw createError({ statusCode: 400, statusMessage: '应用名称不能为空' })
  }

  const prisma = getPrisma()

  const appId = `app_${crypto.randomBytes(12).toString('hex')}`
  const secret = crypto.randomBytes(32).toString('hex')

  const app = await prisma.app.create({
    data: {
      appId,
      secret,
      name: name.trim(),
      domains: domains || '',
      isActive: true,
    },
  })

  return {
    err: 'ok',
    data: {
      id: app.id,
      appId: app.appId,
      secret: app.secret,
      name: app.name,
      domains: app.domains,
      isActive: app.isActive,
      createdAt: app.createdAt,
    },
  }
})
