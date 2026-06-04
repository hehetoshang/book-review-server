export default defineNuxtRouteMiddleware(async (to) => {
  const { token, loadToken } = useAuthStore()

  if (to.path.startsWith('/admin') && to.path !== '/admin/login') {
    loadToken()

    if (!token.value) {
      return navigateTo('/admin/login')
    }

    try {
      const res: any = await $fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token.value}` },
      })
      if (res.data) {
        const { setUser } = useAuthStore()
        setUser(res.data)
      }
    } catch {
      return navigateTo('/admin/login')
    }
  }
})
