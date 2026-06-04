import { getPrisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  if (!event.context.user || event.context.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: '需要管理员权限' })
  }

  const query = getQuery(event)
  const page = Math.max(1, parseInt(query.page as string, 10) || 1)
  const limit = Math.min(100, Math.max(1, parseInt(query.limit as string, 10) || 20))
  const search = (query.search as string)?.trim() || ''

  const prisma = getPrisma()

  const where: Record<string, any> = {}
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { appId: { contains: search } },
    ]
  }

  const [apps, total] = await Promise.all([
    prisma.app.findMany({
      where,
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
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.app.count({ where }),
  ])

  return {
    err: 'ok',
    data: {
      list: apps,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    },
  }
})
