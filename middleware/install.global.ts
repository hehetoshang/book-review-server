export default defineNuxtRouteMiddleware(async (to) => {
  // Skip API routes and static files
  if (to.path.startsWith('/api/') || to.path.startsWith('/_nuxt/') || to.path.startsWith('/sdk.js')) {
    return
  }

  // Skip embed page (it has its own auth)
  if (to.path === '/embed') {
    return
  }

  // Determine installation status
  let isInstalled = false

  // Check localStorage cache first on client side to prevent unnecessary API calls
  if (import.meta.client) {
    const cachedStatus = localStorage.getItem('platform_installed')
    if (cachedStatus === 'true') {
      isInstalled = true
    }
  }

  if (!isInstalled) {
    try {
      const res: any = await $fetch('/api/install/status')
      isInstalled = res.err === 'ok' && res.data && (res.data.isInstalled || res.data.is_setup)
      
      if (isInstalled && import.meta.client) {
        localStorage.setItem('platform_installed', 'true')
      }
    } catch (err) {
      console.error('Install status check failed:', err)
      // On failure, assume it's installed to prevent infinite redirect loops,
      // but only if we are not already on the install page.
      isInstalled = true
    }
  }

  // Routing Logic
  if (to.path === '/install') {
    // If we are on the install page but the system is already installed, redirect to home
    if (isInstalled) {
      return navigateTo('/', { redirectCode: 302 })
    }
  } else {
    // If we are NOT on the install page but the system is NOT installed, redirect to install
    if (!isInstalled) {
      return navigateTo('/install', { redirectCode: 302 })
    }
  }
})