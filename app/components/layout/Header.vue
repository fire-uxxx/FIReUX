<template>
  <client-only>
    <header class="header">
      <div class="header-content">
        <LayoutLogo size="small" />

        <UNavigationMenu v-if="!isMobile" orientation="horizontal" :items="navLinks" />

        <template v-if="user">
          <MoleculesProfileAvatar />
        </template>

        <UIcon v-if="isMobile && !mobileMenuOpen" name="lucide:menu" @click="toggleMobileNav" />
      </div>
    </header>

    <USlideover v-model:open="mobileMenuOpen" side="right" :ui="{ header: 'p-2 min-h-[60px]' }">
      <template #header>
        <div class="slideover-header">
          <h2>Navigation</h2>
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
import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize();
const isMobile = computed(() => width.value < 768);

const navLinks = ref([
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' }
]);

const mobileMenuOpen = ref(false);
const toggleMobileNav = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const user = ref(false);
</script>

<style scoped>
.header {
  width: 100%;
  height: 61px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-s) var(--spacing-m);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
}

.slideover-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>