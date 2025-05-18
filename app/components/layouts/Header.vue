<template>
  <ClientOnly>
    <header class="header">
      <div class="header-content">
        <!-- Left Section: Logo -->
        <div class="left-section">
          <LogoType size="small" />
        </div>

        <!-- Desktop Navigation Menu -->
        <nav class="hidden md:block">
          <UNavigationMenu orientation="horizontal" :items="appLinks" />
        </nav>

        <!-- Right Section: User Profile / Sign-In & Mobile Menu -->
        <div class="right-section">
          <!-- Show avatar if App User exists -->
          <MoleculesProfileAvatar
            v-if="appUser"
            class="clickable-avatar"
            @click="navigateToDashboard"
          />
          <!-- Otherwise, show Sign In if no Core User -->
          <UButton v-else-if="!coreUser" size="sm" @click="navigateToAuth">
            Sign In
          </UButton>
          <!-- Show Join App if Core User exists but no App User -->
          <UButton v-else size="sm" @click="handleJoinApp">
            Join App
          </UButton>

          <UIcon
            v-if="isMobile && !mobileMenuOpen"
            name="lucide:menu"
            @click="toggleMobileNav"
          />
        </div>
      </div>
    </header>

    <!-- Mobile Navigation Menu -->
    <USlideover
      v-model:open="mobileMenuOpen"
      side="right"
      :ui="{ header: 'p-2 min-h-[60px]' }"
      :close="{
        color: 'primary',
        variant: 'outline',
        class: 'rounded-full'
      }"
    >
      <template #body>
        <div class="mobile-menu-wrapper">
          <UNavigationMenu
            orientation="vertical"
            :items="mobileLinks"
            class="w-full"
          />
        </div>
      </template>
    </USlideover>
  </ClientOnly>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const { coreUser } = useCoreUser()
const { appUser } = useAppUser()
const { ensureAppUser } = useAppUserEnsure()

// Navigation
const navigateToAuth = () => router.push('/auth')
const navigateToDashboard = () => router.push('/dashboard')

// Handle Join App Logic
const handleJoinApp = async () => {
  await ensureAppUser()
}

// Mobile Navigation
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 1024)
const mobileMenuOpen = ref(false)
const toggleMobileNav = () => (mobileMenuOpen.value = !mobileMenuOpen.value)

const route = useRoute()
watch(() => route.fullPath, () => (mobileMenuOpen.value = false))

defineProps({
  appLinks: { type: Array, default: () => [] },
  mobileLinks: { type: Array, default: () => [] }
})
</script>

<style scoped>
.header {
  width: 100%;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2) var(--space-4);
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
}

.left-section {
  display: flex;
  align-items: center;
}

.right-section {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.clickable-avatar {
  cursor: pointer;
  transition: transform 0.2s ease;
}
.clickable-avatar:hover {
  transform: scale(1.05);
}

.slideover-header {
  display: flex;
  justify-content: flex-end;
  padding-right: var(--space-2);
}

.route-title {
  margin: var(--space-2) 0;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
}

.mobile-menu-wrapper {
  display: flex;
  justify-content: flex-end;
  padding-right: var(--space-4);
}
</style>