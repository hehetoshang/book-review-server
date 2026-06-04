import { getPrisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  if (!event.context.user || event.context.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: '需要管理员权限' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: '缺少应用ID' })
  }

  const body = await readBody(event)
  const { name, domains, isActive } = body

  if (name && !name.trim()) {
    throw createError({ statusCode: 400, statusMessage: '应用名称不能为空' })
  }

  const prisma = getPrisma()

  const data: Record<string, any> = {}
  if (name !== undefined) data.name = name.trim()
  if (domains !== undefined) data.domains = domains
  if (isActive !== undefined) data.isActive = isActive

  const app = await prisma.app.update({
    where: { id: parseInt(id) },
    data,
    select: {
      id: true,
      appId: true,
      name: true,
      domains: true,
      isActive: true,
      updatedAt: true,
    },
  })

  return { err: 'ok', data: app }
})
