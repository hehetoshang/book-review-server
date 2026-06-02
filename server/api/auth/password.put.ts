import bcrypt from 'bcryptjs'
import { getPrisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: '未登录' })
  }

  const body = await readBody(event)
  const { currentPassword, newPassword } = body

  if (!currentPassword || !newPassword) {
    throw createError({ statusCode: 400, statusMessage: '当前密码和新密码不能为空' })
  }

  if (newPassword.length < 6 || newPassword.length > 50) {
    throw createError({ statusCode: 400, statusMessage: '密码长度需在6-50个字符之间' })
  }

  const prisma = getPrisma()

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!dbUser) {
    throw createError({ statusCode: 404, statusMessage: '用户不存在' })
  }

  const valid = await bcrypt.compare(currentPassword, dbUser.password)
  if (!valid) {
    throw createError({ statusCode: 400, statusMessage: '当前密码错误' })
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  })

  return { err: 'ok', msg: '密码修改成功' }
})
