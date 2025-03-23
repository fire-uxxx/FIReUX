export const ROUTE_LINKS = {
  app: [
    { label: 'products', icon: 'i-lucide-box', to: '/products' },
    { label: 'blog', icon: 'i-lucide-book', to: '/blog' }
  ],
  user: [
    { label: 'Overview', icon: 'i-lucide-layout-dashboard', to: '/dashboard' },
    { label: 'Profile', icon: 'i-lucide-user', to: '/dashboard/profile' },
    { label: 'Account', icon: 'i-lucide-settings', to: '/dashboard/account' },
    {
      label: 'Subscriptions',
      icon: 'i-lucide-credit-card',
      to: '/dashboard/subscriptions'
    },
    {
      label: 'Orders',
      icon: 'i-lucide-shopping-cart',
      to: '/dashboard/orders'
    },
    { label: 'Favorites', icon: 'i-lucide-heart', to: '/dashboard/favorites' }
  ],
  admin: [
    {
      label: 'Admin Panel',
      icon: 'i-lucide-shield',
      to: '/admin',
      children: [
        { label: 'Overview', icon: 'i-lucide-layout-dashboard', to: '/admin' },
        { label: 'Settings', icon: 'i-lucide-sliders', to: '/admin/settings' },
        { label: 'Users', icon: 'i-lucide-users', to: '/admin/users' },
        { label: 'Blog', icon: 'i-lucide-book', to: '/admin/blog' },
        { label: 'Products', icon: 'i-lucide-box', to: '/admin/products' }
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
    findLink(path, ROUTE_LINKS.admin) || findLink(path, ROUTE_LINKS.user)

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
    const base = [ROUTE_LINKS.app, [ROUTE_LINKS.user[0]]]
    if (user.value?.isAdmin) {
      const adminEntry = { ...ROUTE_LINKS.admin[0] }
      delete adminEntry.children
      base.push([adminEntry])
    }
    return base
  })
  const dashboardLinks = computed(() => {
    if (!user.value?.isAdmin) return ROUTE_LINKS.user
    return [ROUTE_LINKS.user, ROUTE_LINKS.admin]
  })
  return { appLinks, mobileLinks, dashboardLinks }
}
