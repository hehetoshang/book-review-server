export default defineEventHandler(async (event) => {
  deleteCookie(event, 'auth_token')
  return { err: 'ok', msg: '已退出登录' }
})
