import fs from 'fs'
import path from 'path'
import { getPrisma } from '~/server/utils/db'

const SETUP_FLAG_FILE = path.resolve('.setup_complete')

export default defineEventHandler(async () => {
  // 优先检查安装标志文件
  if (fs.existsSync(SETUP_FLAG_FILE)) {
    return {
      err: 'ok',
      data: {
        isInstalled: true,
      },
    }
  }

  // 其次检查数据库中是否有管理员
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
    // DB 连接失败 = 未安装
    return {
      err: 'ok',
      data: {
        isInstalled: false,
      },
    }
  }
})