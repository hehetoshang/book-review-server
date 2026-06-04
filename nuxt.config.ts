export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    '@nuxt/content',
    '@pinia/nuxt',
    'nuxt-vuetify',
  ],

  css: [
    '~/assets/global.css',
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
  ],

  vuetify: {
      moduleOptions: {},
      vuetifyOptions: {
        defaults: {
          VBtn: {
            rounded: 'xl',
            variant: 'flat',
            height: 48,
          },
          VCard: {
            rounded: 'xl',
            elevation: 2,
          },
          VTextField: {
            variant: 'outlined',
            density: 'comfortable',
            rounded: 'lg',
            hideDetails: 'auto',
          },
          VPasswordField: {
            variant: 'outlined',
            density: 'comfortable',
            rounded: 'lg',
            hideDetails: 'auto',
          },
          VSelect: {
            variant: 'outlined',
            density: 'comfortable',
            rounded: 'lg',
          },
          VTextarea: {
            variant: 'outlined',
            density: 'comfortable',
            rounded: 'lg',
          },
        },
      theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            colors: {
              primary: '#2080f0',
              secondary: '#63e2b7',
            },
          },
          dark: {
            colors: {
              primary: '#63e2b7',
              secondary: '#2080f0',
            },
          },
        },
      },
    },
  },

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
    // 避免在开发时使用 prerender 导致内存问题
    prerender: {
      concurrency: 1,
      failOnError: false,
    },
  },

  compatibilityDate: '2024-12-01',

  typescript: {
    strict: true,
  },

  content: {
    documentDriven: false,
    highlight: false, // 禁用代码高亮以避免 Node.js v24 崩溃问题
  },

  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
        },
      },
    },
  },
})
