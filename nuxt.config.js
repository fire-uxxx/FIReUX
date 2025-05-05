import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // Treat the `app/` directory as the source root
  srcDir: 'app/',

  // ✅ Enable SSR for SEO & better caching
  ssr: true,

  nitro: {
    preset: 'firebase',
    firebase: {
      gen: 2 // ✅ Using Firebase Gen 2 Functions
    },
    prerender: {
      ignore: ['/']
    },
    devServer:
      process.env.NODE_ENV === 'development'
        ? {
            headers: {
              'Cache-Control':
                'no-store, no-cache, must-revalidate, proxy-revalidate',
              Pragma: 'no-cache',
              Expires: '0',
              'Surrogate-Control': 'no-store'
            }
          }
        : {}
  },

  // ✅ Enable Nuxt DevTools
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    'nuxt-vuefire',
    '@vite-pwa/nuxt',
    '@nuxt/image',
    '@nuxt/content'
  ],
  // Run ESLint at build time and fail on any errors or warnings
  eslint: {
    lintOnStart: true,
    failOnError: true,
    failOnWarning: true,
    fix: false
  },

  studio: { enabled: true },

  css: ['~/assets/css/main.css', '~/assets/design-system/main.scss'],

  // ✅ Shared Firebase plugin
  plugins: ['./plugins/firebase.client.js', './plugins/inject-tracer.ts'],

  vite: {
    build: {
      sourcemap: false // ✅ Disable sourcemaps for better performance
    }
  },

  runtimeConfig: {
    public: {
      // ✅ Firebase Credentials (Loaded from .env)
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,

      // ✅ PWA Metadata for FIReUX
      DOMAIN: process.env.DOMAIN || 'https://fireux.app',
      PWA_APP_NAME: process.env.PWA_APP_NAME,
      PWA_APP_SHORT_NAME: process.env.PWA_APP_SHORT_NAME,
      PWA_THEME_COLOR: process.env.PWA_THEME_COLOR || '#FACC15',
      PWA_BACKGROUND_COLOR: process.env.PWA_BACKGROUND_COLOR || '#FAFAFA',
      // ✅ Stripe Public Key (safe to expose)
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      PIN: process.env.PIN,
      APP_ID: process.env.APP_ID,
      PROJECT_NAME: process.env.PROJECT_NAME
    },
    // ✅ Stripe Secret Key (kept private)
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY
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
    dirs: ['composables/**/**', 'components/**/**', 'models/**/**']
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
      skipWaiting: true
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
    apiUrl: 'https://nuxt.studio' // The URL of the Nuxt Studio API
  },

  build: {
    transpile: ['reka-ui']
  }
})
