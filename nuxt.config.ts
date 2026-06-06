export default defineNuxtConfig({
  ssr: false,
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
    public: {
      apiBase: process.env.API_BASE || '/api',
    }
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
