<!-- File: layouts/LayoutsHeader.vue -->
<template>
  <client-only>
    <header class="header">
      <div class="header-content">
        <!-- Left Section: Logo -->
        <div class="left-section">
          <LayoutsLogo size="small" />
        </div>

        <!-- Right Section: User Profile & Mobile Menu -->
        <div class="right-section">
          <MoleculesProfileAvatar v-if="user" />
          <UIcon v-if="isMobile && !mobileMenuOpen" name="lucide:menu" @click="toggleMobileNav" />
        </div>
      </div>
    </header>

    <!-- Mobile Navigation Menu -->
    <USlideover v-model:open="mobileMenuOpen" side="right" :ui="{ header: 'p-2 min-h-[60px]' }">
      <template #header>
        <div class="slideover-header">
          <UIcon name="lucide:x" @click="toggleMobileNav" />
        </div>
      </template>
      <template #body>
        <UNavigationMenu orientation="vertical" :items="navLinks" />
      </template>
    </USlideover>
  </client-only>
</template>

<script setup>
import { useWindowSize } from "@vueuse/core";

defineProps({
  navLinks: {
    type: Array,
    default: () => [], // Default to empty array if no links provided
  },
});

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 1024);

const mobileMenuOpen = ref(false);
const toggleMobileNav = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const user = ref(true); // Replace with actual user authentication logic
</script>
<style scoped>
.header {
  width: 100%;
  height: 61px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-s) var(--spacing-m);
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

/* Right Section (Avatar & Mobile Menu) */
.right-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-m); /* ✅ Ensures spacing between Avatar & Menu */
}

/* Mobile Menu */
.slideover-header {
  display: flex;
  justify-content: flex-end;
  padding-right: var(--spacing-s);
}
</style>