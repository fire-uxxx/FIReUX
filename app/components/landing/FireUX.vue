<template>
  <section class="centered-section">
    <TransitionGroup tag="div" name="fade" class="features">
      <NuxtLink to="/templates" class="feature delay-1" key="templates">
        <UIcon name="i-lucide-square-dashed" class="size-8" />
        <div class="feature-content">
          <h3>Pre-Built Templates</h3>
          <p class="text">Customizable, low-code UI kits with built-in data integrations.</p>
        </div>
      </NuxtLink>

      <NuxtLink to="/saas" class="feature delay-2" key="saas">
        <UIcon name="i-lucide-cloud" class="size-8" />
        <div class="feature-content">
          <h3 class="title">SaaS Solutions</h3>
          <p class="text">Fully managed, subscription-based applications built for scale.</p>
        </div>
      </NuxtLink>

      <NuxtLink to="/whitelabel" class="feature delay-3" key="whitelabel">
        <UIcon name="i-lucide-layers-2" class="size-8" />
        <div class="feature-content">
          <h3 class="title">White-Label</h3>
          <p class="text">Your branded software bundles, ready for duplication and resale.</p>
        </div>
      </NuxtLink>
    </TransitionGroup>
  </section>
</template>

<style scoped>
.features {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-m);
  text-decoration: none;
  transition: background-color 0.2s;
  padding: var(--spacing-m);
  border-radius: var(--radius-m);
  max-width: 400px;
  width: 100%;
}

.feature-content {
  display: flex;
  flex-direction: column;
  text-align: left;
}
</style>