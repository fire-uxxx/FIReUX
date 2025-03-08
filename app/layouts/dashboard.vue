<template>
  <div class="layout-container">
    <LayoutsHeader :nav-links="dashboardNavLinks" />
    <div class="layout-content">
      <main class="layout-main-content">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
const dashboardNavLinks = ref([
  { label: "dashboard", to: "/dashboard" },
  { label: "my-purchases", to: "/dashboard/my-purchases" },
  { label: "subscriptions", to: "/dashboard/subscriptions" },
  { label: "settings", to: "/dashboard/settings" },
]);
</script>

<style lang="scss" scoped>
</style>