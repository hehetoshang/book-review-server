const { PrismaClient } = require('@prisma/client')
const fs = require('fs')

fs.writeFileSync('.env', 'DATABASE_URL="sqlite+aiosqlite:///./data/chapter_comments.db"\n')

try {
  const prisma = new PrismaClient()
  console.log("Prisma initialized successfully")
} catch (e) {
  console.error("Prisma error:", e.message)
}
