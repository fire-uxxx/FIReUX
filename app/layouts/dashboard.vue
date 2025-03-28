<template>
  <ClientOnly>
    <div class="layout-wrapper">
      <LayoutsHeader :app-links="appLinks" :mobile-links="mobileLinks" />
      <div class="layout-content">
        <main class="layout-main-content">
          <UNavigationMenu
            v-if="!isMobile"
            class="mt-[var(--header-height)] w-fit"
            orientation="vertical"
            :items="dashboardLinks"
          />
          <div class="main-section">
            <LayoutsSubHeader :icon="subHeaderIcon" :title="subHeaderTitle" />
            <LayoutsDashboardGuard>
              <NuxtPage />
            </LayoutsDashboardGuard>
          </div>
        </main>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core'

const route = useRoute()
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 1024)

const { user } = useUser()
const { appLinks, mobileLinks } = useRoutes()

const dashboardLinks = computed(() => {
  const roles = user.value?.roles
  const isAdmin = user.value?.isAdmin

  // ⚡ 1. If roles exist, use role-based system
  if (Array.isArray(roles) && roles.length) {
    const uniqueLinks = new Map()

    for (const role of roles) {
      const links = ROLE_LINKS[role] || []
      links.forEach(link => uniqueLinks.set(link.path, link))
    }

    return Array.from(uniqueLinks.values())
  }

  // 🔙 2. Fallback: use current isAdmin flag logic
  if (isAdmin) return [ROUTE_LINKS.user, ROUTE_LINKS.admin]
  return ROUTE_LINKS.user
})


const subHeaderTitle = computed(() => route.meta?.title || 'Dashboard')
const subHeaderIcon = computed(() => route.meta?.icon || 'i-lucide-layout-dashboard')
</script>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

}
.layout-content {
  display: flex;
  flex-direction: column;
  max-width: 1800px;
  width: 100%;
}
.layout-main-content {
  padding: var(--space-4);
  display: flex;
  flex-direction: row;
  align-items: start;
}
.access-denied {
  padding: var(--space-4);
  text-align: center;
  font-size: 1.2rem;
  color: red;
}
.main-section {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
