import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: true, // Ensure SSR is enabled for SEO & better caching

  nitro: {
    preset: 'firebase',
    firebase: {
      gen: 2 // Using Firebase Gen 2
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

  devtools: { enabled: true }, // Enable Nuxt DevTools

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    'nuxt-vuefire',
    '@vite-pwa/nuxt',
    '@nuxt/image'
  ],

  css: ['~/assets/css/main.css', '~/assets/design-system/main.scss'],

  plugins: ['./plugins/firebase.client.js'],

  vite: {
    build: {
      sourcemap: false // Disable all sourcemaps for performance
    }
  },

  runtimeConfig: {
    public: {
      // Firebase Credentials
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,

      // App & PWA Metadata
      DOMAIN: process.env.DOMAIN || 'https://fireux.app',
      PWA_APP_NAME: process.env.PWA_APP_NAME || 'FIReUX',
      PWA_APP_SHORT_NAME: process.env.PWA_APP_SHORT_NAME || 'FIReUX',
      PWA_THEME_COLOR: process.env.PWA_THEME_COLOR || '#FACC15',
      PWA_BACKGROUND_COLOR: process.env.PWA_BACKGROUND_COLOR || '#FAFAFA'
    },
    // Secret Keys (never exposed to the frontend)
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
  },

  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: '2024-11-27',

  vuefire: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID
    },
    auth: {
      enabled: true, // Enable Firebase Authentication
      sessionCookies: true
    }
  },

  imports: {
    dirs: ['composables/**', 'components/**'] // ✅ Auto-import composables & components
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

    injectManifest: {
      injectionPoint: undefined,
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },

    workbox: {
      navigateFallback: '/',
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true
    },

    devOptions: {
      enabled: process.env.NODE_ENV === 'development', // Only enable in dev mode
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  }
})
