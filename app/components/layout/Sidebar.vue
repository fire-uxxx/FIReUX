<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <div class="sidebar-logo">
        <Logo />
      </div>
    </nav>
  </aside>
</template>

<script setup>
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 250px;
  background-color: var(--bg);
  padding: var(--spacing-m);
  border-right: 1px solid var(--border);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-m);
}

.sidebar-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: var(--spacing-s);
}
</style>