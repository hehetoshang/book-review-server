import { getPrisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  if (!event.context.user || event.context.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: '需要管理员权限' })
  }

  const query = getQuery(event)
  const page = parseInt(query.page as string) || 1
  const limit = Math.min(parseInt(query.limit as string) || 20, 100)
  const skip = (page - 1) * limit
  const search = query.search as string

  const prisma = getPrisma()

  const where: Record<string, any> = {}
  if (search) {
    where.OR = [
      { email: { contains: search } },
      { nickname: { contains: search } },
    ]
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      select: {
        id: true,
        email: true,
        nickname: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    }),
    prisma.user.count({ where }),
  ])

  return {
    err: 'ok',
    data: {
      list: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    },
  }
})
