import { getPrisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: '未登录' })
  }

  const query = getQuery(event)
  const page = parseInt(query.page as string) || 1
  const limit = Math.min(parseInt(query.limit as string) || 20, 100)
  const skip = (page - 1) * limit

  const prisma = getPrisma()

  const [comments, total] = await Promise.all([
    prisma.comment.findMany({
      where: { userId: user.id },
      include: {
        app: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.comment.count({ where: { userId: user.id } }),
  ])

  return {
    err: 'ok',
    data: {
      list: comments.map(c => ({
        id: c.id,
        appName: c.app?.name || '',
        chapterName: c.chapterName,
        content: c.content,
        createdAt: c.createdAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    },
  }
})
