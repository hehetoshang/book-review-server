import { getPrisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const appId = query.appId as string
  const chapterId = query.chapterId ? parseInt(query.chapterId as string, 10) : undefined
  const bookId = query.bookId ? parseInt(query.bookId as string, 10) : undefined
  const segmentId = query.segmentId ? parseInt(query.segmentId as string, 10) : undefined
  const page = Math.max(1, parseInt(query.page as string, 10) || 1)
  const limit = Math.min(100, Math.max(1, parseInt(query.limit as string, 10) || 20))

  if (!appId) {
    throw createError({ statusCode: 400, statusMessage: '缺少appId参数' })
  }

  const prisma = getPrisma()

  const app = await prisma.app.findUnique({ where: { appId } })
  if (!app) {
    throw createError({ statusCode: 404, statusMessage: '应用不存在' })
  }

  const where: Record<string, any> = { appId: app.id }
  if (chapterId !== undefined) where.chapterId = chapterId
  if (bookId !== undefined) where.bookId = bookId
  if (segmentId !== undefined) where.segmentId = segmentId

  const total = await prisma.comment.count({ where })

  const comments = await prisma.comment.findMany({
    where,
    include: {
      user: {
        select: { id: true, email: true, nickname: true, avatar: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  })

  return {
    err: 'ok',
    data: {
      list: comments.map((c) => ({
        id: c.id,
        bookId: c.bookId,
        bookTitle: c.bookTitle,
        chapterId: c.chapterId,
        chapterName: c.chapterName,
        segmentId: c.segmentId,
        content: c.content,
        userId: c.userId,
        nickname: c.user.nickname,
        avatar: c.user.avatar,
        rootId: c.rootId,
        quoteId: c.quoteId,
        level: c.level,
        likeCount: c.likeCount,
        dislikeCount: c.dislikeCount,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
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
