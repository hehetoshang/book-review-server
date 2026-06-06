import fs from 'fs'
import path from 'path'

const SETUP_FLAG_FILE = path.resolve('.setup_complete')

export default defineEventHandler((event) => {
  const url = event.node.req.url || ''

  // Only intercept API requests
  if (!url.startsWith('/api/')) {
    return
  }

  // Allow install endpoints
  if (url.startsWith('/api/install/')) {
    return
  }

  // Check if system is installed
  if (!fs.existsSync(SETUP_FLAG_FILE)) {
    throw createError({ statusCode: 403, statusMessage: 'System not installed' })
  }
})