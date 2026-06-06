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

  // 避免在还没选择数据库或未安装时自动创建 SQLite 数据库文件
  // 如果没有安装标志，为了安全起见直接认为未安装
  return {
    err: 'ok',
    data: {
      isInstalled: false,
    },
  }
})