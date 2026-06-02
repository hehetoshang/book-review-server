import { getPrisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  if (!event.context.user || event.context.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: '需要管理员权限' })
  }

  const prisma = getPrisma()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [appCount, commentCount, todayComments] = await Promise.all([
    prisma.app.count(),
    prisma.comment.count(),
    prisma.comment.count({ where: { createdAt: { gte: today } } }),
  ])

  return {
    err: 'ok',
    data: {
      appCount,
      commentCount,
      todayComments,
    },
  }
})
