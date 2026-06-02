import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create admin user (admin@example.com / admin123)
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      nickname: '管理员',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    },
  })

  console.log('Admin user created:', admin.email)

  // Create demo app
  const demoAppId = `app_${crypto.randomBytes(8).toString('hex')}`
  const demoSecret = crypto.randomBytes(32).toString('hex')

  const app = await prisma.app.upsert({
    where: { appId: demoAppId },
    update: {},
    create: {
      appId: demoAppId,
      secret: demoSecret,
      name: '演示应用',
      domains: '',
      isActive: true,
    },
  })

  console.log('Demo app created:', app.appId)

  // Create demo regular user
  const demoPassword = await bcrypt.hash('user123', 10)
  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      nickname: '演示用户',
      password: demoPassword,
      role: 'user',
      isActive: true,
    },
  })

  console.log('Demo user created: user@example.com')
  console.log('Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
