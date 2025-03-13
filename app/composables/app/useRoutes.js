// COMMENT: app/composables/app/useRoutes.js
export function useRoutes() {
  return {
    home: { path: '/', template: 'default' },
    gettingStarted: { path: '/getting-started', template: 'article' },
    products: {
      index: { path: '/products', template: 'default' },
      booking: { path: '/products/booking', template: 'default' },
      cleaning: { path: '/products/cleaning', template: 'default' },
      fireux: { path: '/products/fireux', template: 'default' },
      tip: { path: '/products/tip', template: 'default' }
    },
    whiteLabel: { path: '/whitelabel', template: 'article' }, // 🔥 Now an article!
    saas: { path: '/saas', template: 'article' }, // 🔥 Now an article!
    templates: { path: '/templates', template: 'article' }, // 🔥 Now an article!
    pricing: { path: '/pricing', template: 'default' },
    dashboard: { path: '/dashboard', template: 'dashboard' }
  }
}
