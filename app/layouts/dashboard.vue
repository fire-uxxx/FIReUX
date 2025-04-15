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
            <pre>
User Data:
{{ userData }}
            </pre>
            <pre>
Users Collection:
{{ usersCollectionData }}
            </pre>
            <pre>
Fetched User (Test):
{{ fetchedUserData }}
            </pre>
          </div>
        </main>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

const route = useRoute()
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 1024)

const { appLinks, mobileLinks, dashboardLinks } = useRoutes()

const subHeaderTitle = computed(() => route.meta?.title || 'Dashboard')
const subHeaderIcon = computed(() => route.meta?.icon || 'i-lucide-layout-dashboard')

// Get user-related data from the useUser composable
const { user, fetchUser, usersCollection } = useUser()

// Debug outputs: stringify the reactive user data and collection
const userData = computed(() => JSON.stringify(user.value, null, 2))
const usersCollectionData = computed(() => JSON.stringify(usersCollection.value, null, 2))
// For testing, we now always fetch the user using the hard-coded id.
const fetchedUserData = computed(() => {
  const fetched = fetchUser('dUgYPUv4W9Q3vRWibEeFBraXXQB3')
  return JSON.stringify(fetched.value, null, 2)
})
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
.main-section {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>