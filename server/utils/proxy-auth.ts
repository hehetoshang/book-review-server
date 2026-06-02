import crypto from 'crypto'

export function signProxyToken(appSecret: string, payload: Record<string, any>): string {
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = crypto
    .createHmac('sha256', appSecret)
    .update(encoded)
    .digest('hex')
  return `${encoded}.${signature}`
}

export function verifyProxyToken(appSecret: string, token: string): Record<string, any> | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 2) return null

    const [encoded, signature] = parts
    const expectedSignature = crypto
      .createHmac('sha256', appSecret)
      .update(encoded)
      .digest('hex')

    if (signature !== expectedSignature) {
      return null
    }

    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString())

    if (payload.exp && Date.now() > payload.exp) {
      return null
    }

    return payload
  } catch {
    return null
  }
}
