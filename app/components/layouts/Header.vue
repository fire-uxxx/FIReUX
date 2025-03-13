<!-- COMMENT: app/components/layouts/Header.vue -->
<template>
  <ClientOnly>
    <header class="header">
      <div class="header-content">
        <!-- Left Section: Logo -->
        <div class="left-section">
          <LogoType size="small" />
        </div>

        <!-- Right Section: User Profile / Sign-In & Mobile Menu -->
        <div class="right-section">
          <MoleculesProfileAvatar v-if="appUser" @click="navigateToDashboard" class="clickable-avatar" />
          <UButton v-else @click="navigateToAuth" size="sm">Sign In</UButton>
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
    >
      <template #header>
        <div class="slideover-header">
          <UIcon name="lucide:x" @click="toggleMobileNav" />
        </div>
      </template>
      <template #body>
        <UNavigationMenu orientation="vertical" :items="navLinks" />
      </template>
    </USlideover>
  </ClientOnly>
</template>

<script setup>
import { useWindowSize } from '@vueuse/core'
import { useRouter } from 'vue-router'

// ✅ Fetch Firestore user data
const { appUser } = useAppUser()
const router = useRouter()

// ✅ Navigation Handlers
const navigateToAuth = () => {
  router.push('/auth')
}
const navigateToDashboard = () => {
  router.push('/dashboard')
}

// ✅ Mobile Menu Handling
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 1024)
const mobileMenuOpen = ref(false)
const toggleMobileNav = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

defineProps({
  navLinks: {
    type: Array,
    default: () => [] // Default to empty array if no links provided
  }
})
</script>

<style scoped>
.header {
  width: 100%;
  height: 61px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2) var(--space-4);
  background-color: var(--background);
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between; /* ✅ Ensures spacing between left and right sections */
  width: 100%;
  max-width: 1200px;
}

/* Left Section (Logo) */
.left-section {
  display: flex;
  align-items: center;
}

/* Right Section (Avatar, Sign-In Button & Mobile Menu) */
.right-section {
  display: flex;
  align-items: center;
  gap: var(--space-4); /* ✅ Ensures spacing between Avatar & Menu */
}

/* ✅ Clickable Avatar */
.clickable-avatar {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.clickable-avatar:hover {
  transform: scale(1.05);
}

/* Mobile Menu */
.slideover-header {
  display: flex;
  justify-content: flex-end;
  padding-right: var(--space-2);
}
</style>