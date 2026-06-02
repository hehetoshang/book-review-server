import { getPrisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  if (!event.context.user || event.context.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: '需要管理员权限' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: '缺少应用ID' })
  }

  const prisma = getPrisma()

  const app = await prisma.app.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      appId: true,
      name: true,
      domains: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      _count: { select: { comments: true } },
    },
  })

  if (!app) {
    throw createError({ statusCode: 404, statusMessage: '应用不存在' })
  }

  return { err: 'ok', data: app }
})
