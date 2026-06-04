import crypto from 'crypto'
import { getPrisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  if (!event.context.user || event.context.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: '需要管理员权限' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: '缺少应用ID' })
  }

  const prisma = getPrisma()

  const newSecret = crypto.randomBytes(32).toString('hex')

  const app = await prisma.app.update({
    where: { id: parseInt(id) },
    data: { secret: newSecret },
    select: { id: true, appId: true, secret: true },
  })

  return {
    err: 'ok',
    data: { secret: app.secret },
  }
})
