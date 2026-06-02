import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('初始化平台数据...')

  // 检查管理员是否已存在（兼容原有数据）
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@example.com' },
  })

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10)
    const admin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        nickname: '管理员',
        password: hashedPassword,
        role: 'admin',
        isActive: true,
      },
    })
    console.log('管理员账号创建:', admin.email)
  } else {
    console.log('管理员账号已存在，跳过:', existingAdmin.email)
  }

  // 检查演示应用是否已存在
  const existingApp = await prisma.app.findFirst()
  if (!existingApp) {
    const appId = `app_${crypto.randomBytes(8).toString('hex')}`
    const secret = crypto.randomBytes(32).toString('hex')

    const app = await prisma.app.create({
      data: {
        appId,
        secret,
        name: '演示应用',
        domains: '',
        isActive: true,
      },
    })
    console.log('演示应用创建:', app.appId)
  } else {
    console.log('应用已存在，跳过:', existingApp.appId)
  }

  // 检查演示用户
  const existingUser = await prisma.user.findUnique({
    where: { email: 'user@example.com' },
  })
  if (!existingUser) {
    const demoPassword = await bcrypt.hash('user123', 10)
    await prisma.user.create({
      data: {
        email: 'user@example.com',
        nickname: '演示用户',
        password: demoPassword,
        role: 'user',
        isActive: true,
      },
    })
    console.log('演示用户创建: user@example.com')
  } else {
    console.log('演示用户已存在，跳过:', existingUser.email)
  }

  console.log('初始化完成！')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
