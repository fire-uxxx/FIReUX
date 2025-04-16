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
            <NuxtPage />
          </div>
        </main>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useUserRead } from '@/composables/firestore/user/useUserRead'

const route = useRoute()
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 1024)

// Retrieve navigation links using our routes composable.
const { appLinks, mobileLinks, dashboardLinks } = useRoutes()

// Compute subheader title with a fallback.
const subHeaderTitle = computed<string>(() => {
  const title = route.meta?.title
  return typeof title === 'string' ? title : 'Dashboard'
})

// Compute subheader icon with a fallback.
const subHeaderIcon = computed<string>(() => {
  const icon = route.meta?.icon
  return typeof icon === 'string' ? icon : 'i-lucide-layout-dashboard'
})

// Use the new useUserRead composable to get current user info and admin status.
const { user, isAdmin } = useUserRead()

// For debugging purposes, log the current user and their admin status.
console.log('Current user:', user.value)
console.log('Is admin:', isAdmin.value)
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