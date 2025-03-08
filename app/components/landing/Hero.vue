<template>
  <section class="centered-section">
    <LayoutsLogo class="hero-logo" size="large" />
    <h1>Ignite Projects with Powerful Applications</h1>
    <div class="cta-buttons">
      <UButton variant="solid" to="/getting-started">Get Started</UButton>
      <UButton
        variant="outline"
        to="/projects"
        class="custom-button"
        trailing-icon="i-heroicons-arrow-right"
      >
        Explore Projects
      </UButton>
    </div>
  </section>
</template>

<style scoped>
.hero-logo {
  margin-bottom: var(--spacing-m);
}

.cta-buttons {
  display: flex;
  gap: var(--spacing-m);
  justify-content: center;
  margin-top: var(--spacing-l);
}

.custom-button {
  background-color: var(--bg);
}

</style>