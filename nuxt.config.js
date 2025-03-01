import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@nuxt/eslint', 'nuxt-vuefire'],
  css: ['~/assets/css/main.css', '~/assets/design-system/main.scss'],

  // Plugins live in the root-level plugins folder
  plugins: ['./plugins/firebase.client.js'],

  runtimeConfig: {
    public: {
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

  vuefire: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID
    },
    init: true
  },

  // Auto-import composables from the "composables" folder including all children
  imports: {
    dirs: ['~/composables/**']
  }
})
