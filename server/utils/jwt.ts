import jwt from 'jsonwebtoken'
import type { H3Event } from 'h3'

export interface JWTPayload {
  userId: number
  email: string
  role: string
}

export function signToken(payload: JWTPayload, secret: string, expiresIn: string): string {
  return jwt.sign(payload, secret, { expiresIn })
}

export function verifyToken(token: string, secret: string): JWTPayload | null {
  try {
    return jwt.verify(token, secret) as JWTPayload
  } catch {
    return null
  }
}

export function getAuthToken(event: H3Event): string | null {
  const header = getHeader(event, 'authorization')
  if (header && header.startsWith('Bearer ')) {
    return header.slice(7)
  }
  const query = getQuery(event)
  if (query.token && typeof query.token === 'string') {
    return query.token
  }
  const cookie = getCookie(event, 'auth_token')
  if (cookie) {
    return cookie
  }
  return null
}
