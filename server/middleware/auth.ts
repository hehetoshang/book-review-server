import { verifyToken, getAuthToken } from '~/server/utils/jwt'
import { getPrisma } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const token = getAuthToken(event)

  if (token) {
    const payload = verifyToken(token, config.jwtSecret)
    if (payload) {
      const prisma = getPrisma()
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, email: true, nickname: true, role: true, avatar: true, isActive: true },
      })

      if (user && user.isActive) {
        event.context.user = user
      }
    }
  }
})
