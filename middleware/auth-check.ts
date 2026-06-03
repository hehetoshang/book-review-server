export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  // Wait for token to be loaded from localStorage
  await nextTick()

  // Check if user is authenticated
  if (!authStore.token) {
    return navigateTo('/login')
  }

  // Verify token and get user info
  try {
    const res: any = await $fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    if (res.data) {
      authStore.setUser(res.data)
    } else {
      authStore.logout()
      return navigateTo('/login')
    }
  } catch {
    authStore.logout()
    return navigateTo('/login')
  }
})
