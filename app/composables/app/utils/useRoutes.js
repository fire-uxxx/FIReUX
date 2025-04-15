export const ROUTE_LINKS = {
  app: [
    { label: 'Products', icon: 'i-lucide-box', to: '/products' },
    { label: 'Blog', icon: 'i-lucide-book', to: '/blog' }
  ],
  dashboard: [
    {
      label: 'User',
      icon: 'i-lucide-user-circle',
      children: [
        { label: 'Overview', icon: 'i-lucide-layout-dashboard', to: '/dashboard' },
        { label: 'Profile', icon: 'i-lucide-user', to: '/dashboard/profile' },
        { label: 'Account', icon: 'i-lucide-settings', to: '/dashboard/account' },
        { label: 'Orders', icon: 'i-lucide-shopping-cart', to: '/dashboard/orders' },
        { label: 'Subscriptions', icon: 'i-lucide-credit-card', to: '/dashboard/subscriptions' },
        { label: 'Favorites', icon: 'i-lucide-heart', to: '/dashboard/favorites' }
      ]
    }
  ],
  admin: [
    {
      label: 'Admin',
      icon: 'i-lucide-shield-check',
      children: [
        { label: 'Overview', icon: 'i-lucide-layout-dashboard', to: '/admin' },
        { label: 'Users', icon: 'i-lucide-users', to: '/admin/users' },
        { label: 'Products', icon: 'i-lucide-box', to: '/admin/products' },
        { label: 'Blog', icon: 'i-lucide-book', to: '/admin/blog' },
        { label: 'Settings', icon: 'i-lucide-sliders', to: '/admin/settings' }
      ]
    }
  ]
}

function findLink(path, links) {
  for (const link of links) {
    if (link.to === path) return link
    if (link.children) {
      const found = findLink(path, link.children)
      if (found) return found
    }
  }
  return null
}

export function getRouteMetaForPath(path) {
  const match =
    findLink(path, ROUTE_LINKS.admin) || findLink(path, ROUTE_LINKS.dashboard)

  if (!match) return { label: '', icon: '' }

  return {
    label: match.label,
    icon: match.icon
  }
}

export function useRoutes() {
  const { user } = useUser()

  const appLinks = computed(() => ROUTE_LINKS.app)

  const mobileLinks = computed(() => {
    const base = [ROUTE_LINKS.app, [ROUTE_LINKS.dashboard[0]]]
    if (user.value?.isAdmin) {
      base.push([ROUTE_LINKS.admin[0]])
    }
    return base
  })
  const dashboardLinks = computed(() => {
    if (!user.value?.isAdmin) return ROUTE_LINKS.dashboard
    return [ROUTE_LINKS.dashboard, ROUTE_LINKS.admin]
  })
  return { appLinks, mobileLinks, dashboardLinks }
}
