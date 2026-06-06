import fs from 'fs'
import path from 'path'

const SETUP_FLAG_FILE = path.resolve('.setup_complete')

export default defineEventHandler(async () => {
  // 仅检查安装标志文件，不调用 Prisma，避免在用户确认前意外创建 SQLite 数据库文件
  if (fs.existsSync(SETUP_FLAG_FILE)) {
    return {
      err: 'ok',
      data: {
        isInstalled: true,
      },
    }
  }

  return {
    err: 'ok',
    data: {
      isInstalled: false,
    },
  }
})