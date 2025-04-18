import { computed } from 'vue'

// Define a type for our route links.
interface RouteLink {
  label: string
  icon: string
  to?: string
  children?: RouteLink[]
}

// Explicitly type ROUTE_LINKS so that each key returns a defined array.
export const ROUTE_LINKS: {
  app: RouteLink[]
  dashboard: RouteLink[]
  admin: RouteLink[]
} = {
  app: [
    { label: 'Products', icon: 'i-lucide-box', to: '/products' },
    { label: 'Blog', icon: 'i-lucide-book', to: '/blog' }
  ],
  dashboard: [
    {
      label: 'User',
      icon: 'i-lucide-user-circle',
      children: [
        {
          label: 'Overview',
          icon: 'i-lucide-layout-dashboard',
          to: '/dashboard'
        },
        { label: 'Profile', icon: 'i-lucide-user', to: '/dashboard/profile' },
        {
          label: 'Account',
          icon: 'i-lucide-settings',
          to: '/dashboard/account'
        },
        {
          label: 'Orders',
          icon: 'i-lucide-shopping-cart',
          to: '/dashboard/orders'
        },
        {
          label: 'Subscriptions',
          icon: 'i-lucide-credit-card',
          to: '/dashboard/subscriptions'
        },
        {
          label: 'Favorites',
          icon: 'i-lucide-heart',
          to: '/dashboard/favorites'
        }
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

// Recursive function to search through route links.
function findLink(path: string, links: RouteLink[]): RouteLink | null {
  for (const link of links) {
    if (link.to === path) return link
    if (link.children) {
      const found = findLink(path, link.children)
      if (found) return found
    }
  }
  return null
}

// Returns route meta data (label and icon) for a given path.
export function getRouteMetaForPath(path: string): {
  label: string
  icon: string
} {
  const match =
    findLink(path, ROUTE_LINKS.admin) || findLink(path, ROUTE_LINKS.dashboard)
  if (!match) return { label: '', icon: '' }
  return { label: match.label, icon: match.icon }
}

/**
 * useRoutes
 *
 * Returns:
 * - appLinks: Public routes (e.g. Products, Blog).
 * - dashboardLinks: Flat array of dashboard routes; if isAdmin then also include admin routes.
 * - mobileLinks: Groups all links (app, dashboard, and admin if isAdmin) into nested arrays.
 */
export function useRoutes() {
  // Retrieve the isAdmin computed property from our user composable.
  // (Assume that useUser() returns { isAdmin } where isAdmin is a computed boolean.)
  const { isAdmin } = useUser()
  const route = useRoute()

  // Public app links.
  const appLinks = computed<RouteLink[]>(() => {
    return ROUTE_LINKS.app
  })

  // Dashboard routes for desktop navigation (combined if admin).
  const dashboardLinks = computed<RouteLink[]>(() => {
    // Check if dashboard array has a parent with children.
    const dashboardParent = ROUTE_LINKS.dashboard[0]
    const dashboardChildren: RouteLink[] =
      dashboardParent && dashboardParent.children
        ? dashboardParent.children
        : []
    if (isAdmin.value) {
      return [...dashboardChildren, ...ROUTE_LINKS.admin]
    }
    return dashboardChildren
  })

  // Mobile: group everything into nested arrays.
  const mobileLinks = computed<RouteLink[][]>(() => {
    const groups: RouteLink[][] = []
    groups.push(ROUTE_LINKS.app) // Public app routes
    groups.push(ROUTE_LINKS.dashboard) // Dashboard routes
    if (isAdmin.value) {
      groups.push(ROUTE_LINKS.admin) // Admin routes if admin
    }
    return groups
  })


 const subHeader = computed(() => {
   const title = route.meta?.title
   const icon = route.meta?.icon
   return {
     label: typeof title === 'string' ? title : 'Dashboard',
     icon: typeof icon === 'string' ? icon : 'i-lucide-layout-dashboard'
   }
 })
  return { appLinks, dashboardLinks, mobileLinks, subHeader }
}
