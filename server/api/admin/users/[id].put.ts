import { getPrisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  if (!event.context.user || event.context.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: '需要管理员权限' })
  }

  const id = parseInt(event.context.params?.id as string)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: '无效的用户ID' })
  }

  const body = await readBody(event)
  const { nickname, role, isActive } = body

  const prisma = getPrisma()
  const user = await prisma.user.findUnique({ where: { id } })

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: '用户不存在' })
  }

  const updateData: Record<string, any> = {}
  if (nickname !== undefined) updateData.nickname = nickname
  if (role !== undefined) updateData.role = role
  if (isActive !== undefined) updateData.isActive = isActive

  const updatedUser = await prisma.user.update({
    where: { id },
    data: updateData,
    select: {
      id: true,
      email: true,
      nickname: true,
      role: true,
      isActive: true,
    },
  })

  return {
    err: 'ok',
    data: updatedUser,
  }
})
