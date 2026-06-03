import { getPrisma } from '~/server/utils/db'

export default defineEventHandler(async () => {
  const prisma = getPrisma()

  // 检查是否有管理员账户
  const adminCount = await prisma.user.count({
    where: { role: 'admin' },
  })

  // 检查是否有应用
  const appCount = await prisma.app.count()

  const isInstalled = adminCount > 0

  return {
    err: 'ok',
    data: {
      isInstalled,
      hasApps: appCount > 0,
    },
  }
})
