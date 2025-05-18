import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // Use app/ as the source directory
  srcDir: 'app/',

  // Enable SSR for SEO and caching
  ssr: true,

  nitro: {
    preset: 'firebase',
    firebase: {
      gen: 2 // Firebase Gen 2 Functions
    },
    devServer:
      process.env.NODE_ENV === 'development'
        ? {
            headers: {
              'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
              Pragma: 'no-cache',
              Expires: '0',
              'Surrogate-Control': 'no-store'
            }
          }
        : {}
  },

  // Enable Nuxt DevTools
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    'nuxt-vuefire',
    '@vite-pwa/nuxt',
    '@nuxt/image', // Correct Nuxt Image module
    '@nuxt/content' // Correct Nuxt Content module
  ],

  studio: { enabled: true },

  css: ['~/assets/css/main.css', '~/assets/design-system/main.scss'],

  plugins: ['./plugins/firebase.client.js', './plugins/inject-tracer.ts'],

  vite: {
    build: {
      sourcemap: false // Disable sourcemaps for performance
    }
  },

  runtimeConfig: {
    public: {
      // Firebase Credentials (from .env)
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
      domain: process.env.DOMAIN,
      pwaAppName: process.env.PWA_APP_NAME,
      pwaAppShortName: process.env.PWA_APP_SHORT_NAME,
      pwaThemeColor: process.env.PWA_THEME_COLOR,
      pwaBackgroundColor: process.env.PWA_BACKGROUND_COLOR,
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      pin: process.env.PIN,
      appId: process.env.APP_ID,
      projectName: process.env.PROJECT_NAME,
      authorName: process.env.AUTHOR_NAME,
      openaiApiKeyName: process.env.OPENAI_API_KEY_NAME,
      openaiApiKey: process.env.OPENAI_API_KEY,
      nodeEnv: process.env.NODE_ENV
    },
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET
  },

  vuefire: {
    ssr: true,
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID
    },
    auth: {
      enabled: true,
      sessionCookies: true
    }
  },

  imports: {
    dirs: ['composables/**/**', 'models/**/**', 'utils/**/**']
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: process.env.PWA_APP_NAME || 'FIReUX',
      short_name: process.env.PWA_APP_SHORT_NAME || 'FIReUX',
      start_url: '/',
      display: 'standalone',
      theme_color: process.env.PWA_THEME_COLOR || '#FACC15',
      background_color: process.env.PWA_BACKGROUND_COLOR || '#FAFAFA',
      icons: [
        { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }
      ]
    },
    workbox: {
      navigateFallback: '/',
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true,
      globPatterns: ['**/*.{js,css,html,png,svg,ico,json,txt,woff2}'] // Ensure all static assets are cached
    },
    devOptions: {
      enabled: process.env.NODE_ENV === 'development',
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2025-03-17',

  content: {
    documentDriven: true,
    apiUrl: 'https://nuxt.studio'
  },

  build: {
    transpile: ['reka-ui']
  }
})
