export default defineNuxtRouteMiddleware(async (to) => {
  // Skip install page itself
  if (to.path === '/install') {
    return
  }

  // Skip API routes and static files
  if (to.path.startsWith('/api/') || to.path.startsWith('/_nuxt/') || to.path.startsWith('/sdk.js')) {
    return
  }

  // Skip embed page (it has its own auth)
  if (to.path === '/embed') {
    return
  }

  // Check installation status (only on client side to avoid SSR issues)
  if (import.meta.client) {
    // Check localStorage cache first to prevent unnecessary API calls
    const cachedStatus = localStorage.getItem('platform_installed')
    if (cachedStatus === 'true') {
      return // Already installed, proceed normally
    }

    try {
      const res: any = await $fetch('/api/install/status')
      if (res.data && !res.data.isInstalled) {
        return navigateTo('/install')
      } else if (res.data?.isInstalled) {
        // Cache the installed status
        localStorage.setItem('platform_installed', 'true')
      }
    } catch {
      // If check fails, allow navigation
    }
  }
})
