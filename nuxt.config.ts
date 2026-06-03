export default defineNuxtConfig({
  devtools: { enabled: true },

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
          rounded: 'lg',
          variant: 'flat',
        },
        VCard: {
          rounded: 'lg',
        },
        VTextField: {
          variant: 'outlined',
          density: 'comfortable',
        },
        VPasswordField: {
          variant: 'outlined',
          density: 'comfortable',
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
  },
})
