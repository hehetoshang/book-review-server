import { getPrisma } from '~/server/utils/db'
import { sanitizeHtml } from '~/server/utils/sanitize'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: '请先登录' })
  }

  const body = await readBody(event)
  const { appId, bookId, chapterId, chapterName, segmentId, content, rootId, quoteId } = body

  if (!appId || !chapterId || !content) {
    throw createError({ statusCode: 400, statusMessage: '缺少必要参数' })
  }

  const sanitizedContent = sanitizeHtml(String(content)).slice(0, 1024)
  if (!sanitizedContent.trim()) {
    throw createError({ statusCode: 400, statusMessage: '评论内容不能为空' })
  }

  const prisma = getPrisma()

  const app = await prisma.app.findUnique({ where: { appId } })
  if (!app || !app.isActive) {
    throw createError({ statusCode: 404, statusMessage: '应用不存在或已禁用' })
  }

  // Validate rootId and quoteId if provided
  if (rootId) {
    const root = await prisma.comment.findUnique({ where: { id: parseInt(rootId) } })
    if (!root) {
      throw createError({ statusCode: 400, statusMessage: '根评论不存在' })
    }
  }

  if (quoteId) {
    const quote = await prisma.comment.findUnique({ where: { id: parseInt(quoteId) } })
    if (!quote) {
      throw createError({ statusCode: 400, statusMessage: '引用的评论不存在' })
    }
  }

  // Calculate level for replies
  let level = 1
  if (rootId) {
    const rootComments = await prisma.comment.count({
      where: { appId: app.id, chapterId: parseInt(chapterId), rootId: parseInt(rootId) },
    })
    level = rootComments + 2
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) || ''

  const comment = await prisma.comment.create({
    data: {
      appId: app.id,
      bookId: parseInt(bookId) || 0,
      bookTitle: body.bookTitle || '',
      chapterId: parseInt(chapterId),
      chapterName: sanitizeHtml(String(chapterName || '')).slice(0, 255),
      segmentId: parseInt(segmentId) || 0,
      cfi: sanitizeHtml(String(body.cfi || '')).slice(0, 255),
      cfiBase: sanitizeHtml(String(body.cfiBase || '')).slice(0, 255),
      content: sanitizedContent,
      userId: user.id,
      rootId: rootId ? parseInt(rootId) : null,
      quoteId: quoteId ? parseInt(quoteId) : null,
      level,
      type: 1,
      geo: ip,
    },
    include: {
      user: {
        select: { id: true, email: true, nickname: true, avatar: true },
      },
    },
  })

  return {
    err: 'ok',
    data: {
      id: comment.id,
      bookId: comment.bookId,
      chapterId: comment.chapterId,
      chapterName: comment.chapterName,
      segmentId: comment.segmentId,
      content: comment.content,
      userId: comment.userId,
      nickname: comment.user.nickname,
      avatar: comment.user.avatar,
      rootId: comment.rootId,
      quoteId: comment.quoteId,
      level: comment.level,
      createdAt: comment.createdAt,
    },
  }
})
