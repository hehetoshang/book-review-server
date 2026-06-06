import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { getPrisma } from '~/server/utils/db'

const SETUP_FLAG_FILE = path.resolve('.setup_complete')
const ENV_FILE = path.resolve('.env')

const ENV_TEMPLATE = `# 数据库配置
DATABASE_TYPE="sqlite"
DATABASE_URL="sqlite+aiosqlite:///./data/chapter_comments.db"

# JWT 配置
JWT_SECRET="{jwt_secret}"
JWT_EXPIRES_IN="7d"

# 服务器配置
NODE_ENV="production"
HOST="0.0.0.0"
PORT=8000

# CORS 配置（多个域名用逗号分隔）
CORS_ORIGINS="*"
`

export default defineEventHandler(async (event) => {
  // 检查是否已安装（文件标志优先）
  if (fs.existsSync(SETUP_FLAG_FILE)) {
    throw createError({ statusCode: 400, statusMessage: '系统已安装，无法重复安装' })
  }

  const prisma = getPrisma()

  // 检查数据库中是否已有管理员
  const adminCount = await prisma.user.count({
    where: { role: 'admin' },
  })

  if (adminCount > 0) {
    throw createError({ statusCode: 400, statusMessage: '系统已安装，无法重复安装' })
  }

  const body = await readBody(event)
  const { username, email, password, nickname, siteName, databaseType, databaseUrl } = body

  if (!username || !email || !password || !nickname) {
    throw createError({ statusCode: 400, statusMessage: '请填写完整信息' })
  }

  const usernameRegex = /^[a-zA-Z0-9_]{2,20}$/
  if (!usernameRegex.test(username.trim())) {
    throw createError({ statusCode: 400, statusMessage: '用户名只能包含字母、数字和下划线，长度2-20位' })
  }

  if (password.length < 6 || password.length > 50) {
    throw createError({ statusCode: 400, statusMessage: '密码长度需在6-50个字符之间' })
  }

  // 仅支持 SQLite（Prisma 配置为 SQLite）
  const dbType = (databaseType || 'sqlite').trim().toLowerCase()
  if (dbType !== 'sqlite') {
    throw createError({ statusCode: 400, statusMessage: '当前版本仅支持 SQLite 数据库' })
  }

  try {
    // 确保数据目录存在
    const dataDir = path.resolve('data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // 创建管理员账户
    const hashedPassword = await bcrypt.hash(password, 10)
    const admin = await prisma.user.create({
      data: {
        username: username.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        nickname,
        password: hashedPassword,
        role: 'admin',
        isActive: true,
      },
    })

    // 创建默认应用
    const appId = `app_${crypto.randomBytes(8).toString('hex')}`
    const secret = crypto.randomBytes(32).toString('hex')

    const app = await prisma.app.create({
      data: {
        appId,
        secret,
        name: siteName || '默认应用',
        domains: '',
        isActive: true,
      },
    })

    // 生成 JWT Secret
    const jwtSecret = crypto.randomBytes(32).toString('hex')

    // 写入 .env 文件
    const envContent = ENV_TEMPLATE.replace('{jwt_secret}', jwtSecret)
    fs.writeFileSync(ENV_FILE, envContent, 'utf-8')

    // 写入安装标志文件
    fs.writeFileSync(SETUP_FLAG_FILE, 'setup complete', 'utf-8')

    return {
      err: 'ok',
      data: {
        admin: {
          id: admin.id,
          email: admin.email,
          nickname: admin.nickname,
        },
        app: {
          appId: app.appId,
          name: app.name,
        },
      },
    }
  } catch (err: any) {
    // 如果出错，清理已写入的标志文件
    if (fs.existsSync(SETUP_FLAG_FILE)) {
      fs.unlinkSync(SETUP_FLAG_FILE)
    }
    throw createError({ statusCode: 500, statusMessage: err.message || '安装失败' })
  }
})