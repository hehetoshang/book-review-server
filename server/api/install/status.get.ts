import { getPrisma } from '~/server/utils/db'

export default defineEventHandler(async () => {
  try {
    const prisma = getPrisma()
    const adminCount = await prisma.user.count({
      where: { role: 'admin' },
    })

    return {
      err: 'ok',
      data: {
        isInstalled: adminCount > 0,
      },
    }
  } catch {
    // DB connection failed = not installed yet
    return {
      err: 'ok',
      data: {
        isInstalled: false,
      },
    }
  }
})
