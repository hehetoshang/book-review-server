export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { type, host, port, user, password, database } = body

  const dbType = (type || '').trim().toLowerCase()

  if (dbType === 'sqlite') {
    return {
      err: 'ok',
      data: {
        message: 'SQLite 无需测试连接，将自动创建',
      },
    }
  }

  if (dbType === 'mysql' || dbType === 'postgresql') {
    // 对于 MySQL/PostgreSQL，当前 Prisma 仅支持 SQLite
    // 返回错误提示
    throw createError({
      statusCode: 400,
      statusMessage: '当前版本仅支持 SQLite 数据库，无需测试连接',
    })
  }

  throw createError({
    statusCode: 400,
    statusMessage: '不支持的数据库类型',
  })
})