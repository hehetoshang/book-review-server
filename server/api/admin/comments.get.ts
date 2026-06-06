import { getPrisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  if (!event.context.user || event.context.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: '需要管理员权限' })
  }

  const query = getQuery(event)
  const page = Math.max(1, parseInt(query.page as string, 10) || 1)
  const limit = Math.min(100, Math.max(1, parseInt(query.limit as string, 10) || 20))
  const appId = query.appId as string
  const chapterId = query.chapterId ? parseInt(query.chapterId as string, 10) : undefined
  const search = (query.search as string)?.trim() || ''

  const prisma = getPrisma()

  const where: Record<string, any> = {}
  if (appId) {
    const app = await prisma.app.findUnique({ where: { appId } })
    if (app) {
      where.appId = app.id
    }
  }
  if (chapterId !== undefined) where.chapterId = chapterId
  if (search) {
    where.content = { contains: search }
  }

  const [comments, total] = await Promise.all([
    prisma.comment.findMany({
      where,
      include: {
        user: { select: { id: true, email: true, nickname: true } },
        app: { select: { id: true, appId: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.comment.count({ where }),
  ])

  return {
    err: 'ok',
    data: {
      list: comments.map((c) => ({
        id: c.id,
        appId: c.app?.appId || '',
        appName: c.app?.name || '',
        bookId: c.bookId,
        bookTitle: c.bookTitle,
        chapterId: c.chapterId,
        chapterName: c.chapterName,
        segmentId: c.segmentId,
        content: c.content,
        userId: c.userId,
        nickname: c.user.nickname,
        level: c.level,
        createdAt: c.createdAt,
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    },
  }
})
