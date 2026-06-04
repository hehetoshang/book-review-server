import { getPrisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  if (!event.context.user || event.context.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: '需要管理员权限' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: '缺少评论ID' })
  }

  const prisma = getPrisma()

  const comment = await prisma.comment.findUnique({ where: { id: parseInt(id) } })
  if (!comment) {
    throw createError({ statusCode: 404, statusMessage: '评论不存在' })
  }

  await prisma.comment.delete({ where: { id: parseInt(id) } })

  return { err: 'ok', msg: '评论已删除' }
})
