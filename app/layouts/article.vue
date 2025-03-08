<template>
  <div class="layout-container">
    <LayoutsHeader :nav-links="articleNavLinks" />
    <div class="layout-content">
      <main class="layout-main-content">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
const articleNavLinks = ref([
  { label: "getting-started", to: "/getting-started" },
  { label: "products", to: "/products" },
  { label: "white-label", to: "/white-label" },
  { label: "saas", to: "/saas" },
  { label: "templates", to: "/templates" },
  { label: "pricing", to: "/pricing" },
]);
</script>

<style lang="scss" scoped>
</style>