// nuxt.config.js
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: true, // Ensure SSR is enabled

  // Use the Firebase preset for hosting if deploying to Firebase
  nitro: {
    preset: 'firebase',
    firebase: {
      gen: 2 // Generation 2
    },
    // Disable caching in development mode (avoid stale content in dev)
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

  devtools: { enabled: true }, // Enable Nuxt devtools for debugging

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    'nuxt-vuefire',
    '@vite-pwa/nuxt' // PWA module
  ],

  css: ['~/assets/css/main.css', '~/assets/design-system/main.scss'],

  plugins: ['./plugins/firebase.client.js'],

  vite: {
    build: {
      sourcemap: false // Disable all sourcemaps
    }
  },

  runtimeConfig: {
    public: {
      // Firebase environment variables
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID
    }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-27',

  // Vuefire config for Firebase + Auth
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
      enabled: true, // Enable Firebase Auth
      sessionCookies: true
    }
  },

  // Auto-import composables from composables/
  imports: {
    dirs: ['~/composables/**']
  },

  // -----------------------------------------
  //       PWA Configuration
  // -----------------------------------------
  pwa: {
    registerType: 'autoUpdate',

    // Basic Manifest
    manifest: {
      name: 'Misebox',
      short_name: 'Misebox',
      start_url: '/',
      display: 'standalone',
      theme_color: '#6C5CE7',
      background_color: '#ffffff',
      icons: [
        { src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }
      ]
    },

    // Minimal Workbox config
    workbox: {
      navigateFallback: '/', // fallback route for unmatched requests
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true
      // No runtimeCaching → purely minimal
    },

    devOptions: {
      enabled: false // No SW in dev; build+preview to test
    }
  }
})
