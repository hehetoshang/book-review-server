import { getPrisma } from '~/server/utils/db'

const inMemoryRateLimit = new Map<string, { count: number; resetAt: number }>()

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)

  if (url.pathname.startsWith('/api/platform/comments') && event.method === 'POST') {
    const config = useRuntimeConfig()
    const userId = event.context.user?.id
    const ip = getRequestIP(event, { xForwardedFor: true }) || 'anonymous'
    const key = `comment:${userId || ip}`
    const now = Date.now()
    const windowMs = 60 * 1000

    let record = inMemoryRateLimit.get(key)

    if (!record || now > record.resetAt) {
      record = { count: 1, resetAt: now + windowMs }
      inMemoryRateLimit.set(key, record)
    } else {
      record.count++
      inMemoryRateLimit.set(key, record)

      if (record.count > config.rateLimitPerMinute) {
        throw createError({
          statusCode: 429,
          statusMessage: '评论频率过高，请稍后重试',
        })
      }
    }
  }

  if (url.pathname.startsWith('/api/platform/comments') && event.method === 'GET') {
    const prisma = getPrisma()
    const query = getQuery(event)
    const appId = query.appId as string

    if (appId) {
      const app = await prisma.app.findUnique({ where: { appId } })
      if (app && app.domains) {
        const allowedDomains = app.domains.split(',').map(d => d.trim()).filter(Boolean)
        const origin = getHeader(event, 'origin')
        if (allowedDomains.length > 0) {
          const isAllowed = allowedDomains.includes('*') || allowedDomains.some(d => {
            if (d.startsWith('*.')) {
              const domain = d.slice(2)
              return origin?.endsWith(domain) || origin === domain
            }
            return origin === d
          })
          if (isAllowed && origin) {
            setHeader(event, 'Access-Control-Allow-Origin', origin)
          }
        } else {
          setHeader(event, 'Access-Control-Allow-Origin', '*')
        }
      } else {
        setHeader(event, 'Access-Control-Allow-Origin', '*')
      }
    } else {
      setHeader(event, 'Access-Control-Allow-Origin', '*')
    }

    setHeader(event, 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    setHeader(event, 'Access-Control-Allow-Headers', 'Content-Type, Authorization')
    setHeader(event, 'Access-Control-Allow-Credentials', 'true')
  }

  if (event.method === 'OPTIONS') {
    return null
  }
})
