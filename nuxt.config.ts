export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@pinia/nuxt',
  ],

  css: [
    '~/assets/global.css',
  ],

  routeRules: {
    '/embed': {
      headers: {
        'Content-Security-Policy': "frame-ancestors *",
        'X-Frame-Options': 'ALLOWALL',
      },
    },
  },

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'your-jwt-secret-change-in-production',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    proxyTokenTtl: parseInt(process.env.PROXY_TOKEN_TTL || '300', 10),
    rateLimitPerMinute: parseInt(process.env.RATE_LIMIT_PER_MINUTE || '5', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  compatibilityDate: '2024-12-01',

  typescript: {
    strict: true,
  },

  content: {
    documentDriven: false,
    highlight: {
      theme: 'github-dark',
    },
  },

  vite: {
    optimizeDeps: {
      include: ['jsdom', 'dompurify'],
    },
    ssr: {
      noExternal: ['naive-ui'],
    },
  },
})
