import bcrypt from 'bcryptjs'
import { getPrisma } from '~/server/utils/db'
import { sanitizeHtml } from '~/server/utils/sanitize'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, email, nickname, password } = body

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: '邮箱和密码不能为空' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    throw createError({ statusCode: 400, statusMessage: '邮箱格式不正确' })
  }

  if (password.length < 6 || password.length > 50) {
    throw createError({ statusCode: 400, statusMessage: '密码长度需在6-50个字符之间' })
  }

  const prisma = getPrisma()

  const existing = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } })
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: '该邮箱已被注册' })
  }

  if (username) {
    const usernameRegex = /^[a-zA-Z0-9_]{2,20}$/
    if (!usernameRegex.test(username.trim())) {
      throw createError({ statusCode: 400, statusMessage: '用户名只能包含字母、数字和下划线，长度2-20位' })
    }
    const existingUsername = await prisma.user.findUnique({ where: { username: username.trim().toLowerCase() } })
    if (existingUsername) {
      throw createError({ statusCode: 409, statusMessage: '该用户名已被注册' })
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      username: username ? username.trim().toLowerCase() : email.trim().toLowerCase().split('@')[0],
      email: email.trim().toLowerCase(),
      nickname: sanitizeHtml(nickname || email.split('@')[0]).slice(0, 50),
      password: hashedPassword,
      role: 'user',
      isActive: true,
    },
  })

  return {
    err: 'ok',
    data: {
      id: user.id,
      username: user.username,
      email: user.email,
      nickname: user.nickname,
    },
  }
})
