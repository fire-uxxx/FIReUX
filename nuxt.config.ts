// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxt/ui', '@nuxt/eslint'],

  css: ['~/assets/css/main.css', '~/assets/design-system/main.scss'],

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-27'
})
