<template>
  <ClientOnly>
    <div v-if="!isLoaded">
      <MoleculesLoading />
    </div>
    <div v-else>
      <template v-if="hasAccess">
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
                <NuxtPage />
              </div>
            </main>
          </div>
        </div>
      </template>
      <template v-else>
        <p class="access-denied">
          Access denied: Anonymous user or insufficient permissions.
        </p>
      </template>
    </div>
    <UModal
      v-model:open="blocked"
      prevent-close
      title="🚫 Blocked"
      description="This app needs to be initialized by an admin."
    >
      <template #body>
        <OrganismsAuthOnBoarding />
      </template>
    </UModal>
  </ClientOnly>
</template>

<script setup>
import { getCurrentUser } from 'vuefire'
import { useWindowSize } from '@vueuse/core'

const currentUserData = await getCurrentUser()
const isLoaded = computed(() => currentUserData !== null)
const route = useRoute()
const { user, useAdminPresence } = useUser()

const env = route.meta.layoutProps?.dashboardType || 'user-dashboard'

const hasAccess = computed(() => {
  if (currentUserData?.isAnonymous) return false
  if (env === 'admin-dashboard') {
    return user.value?.isAdmin === true
  }
  return true
})

const { width } = useWindowSize()
const isMobile = computed(() => width.value < 1024)
const { appLinks, mobileLinks } = useRoutes()
const dashboardLinks = computed(() => {
  if (!user.value?.isAdmin) return ROUTE_LINKS.user
  return [ROUTE_LINKS.user, ROUTE_LINKS.admin]
})
const hasAdmin = useAdminPresence()
const blocked = computed(() => !hasAdmin.value)

const subHeaderTitle = computed(() => route.meta?.title || 'Dashboard')
const subHeaderIcon = computed(
  () => route.meta?.icon || 'i-lucide-layout-dashboard'
)
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
