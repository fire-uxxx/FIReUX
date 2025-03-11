<template>
  <section class="section">
    <div class="solutions-grid">
      <UCard
        v-for="solution in solutions"
        :key="solution.title"
        :to="solution.link"
      >
        <template #header>
          <LogoFlame size="small" />
          <h3>{{ solution.title }}</h3>
        </template>

        <p>{{ solution.description }}</p>

        <template #footer>
          <UButton variant="soft">
            {{ solution.buttonText }}
          </UButton>
        </template>
      </UCard>
    </div>
  </section>
</template>

<script setup>
const solutions = [
  { title: "Products", description: "Instant business tools, fully hosted and ready to go.", link: "/products", buttonText: "Explore Products" },
  { title: "White-Label", description: "Rebrand and resell FIReUX products as your own.", link: "/whitelabel", buttonText: "Become a Partner" },
  { title: "SaaS", description: "Fully managed, subscription-based applications built for scale.", link: "/saas", buttonText: "See SaaS Solutions" },
  { title: "Templates", description: "Pre-built software frameworks for developers and startups.", link: "/templates", buttonText: "Browse Templates" },
  { title: "API-First", description: "Headless & modular, FIReUX integrates with any backend.", link: "/api", buttonText: "Explore APIs" },
  { title: "Automation", description: "No-code triggers & workflows for seamless business ops.", link: "/automation", buttonText: "Set Up Automations" }
];
</script>

<style scoped>
/* 🔥 Section Layout */
.solutions-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-8);
  padding: var(--space-8);
}

/* 🔥 Responsive Grid */
.solutions-grid {
  display: grid;
  gap: var(--space-6);
  width: 100%;
  max-width: 600px;
}

/* ✅ Mobile: 1 Column */
@media (min-width: 600px) {
  .solutions-grid {
    grid-template-columns: repeat(2, 1fr);
    max-width: 900px;
  }
}

/* ✅ Desktop: 3 Columns */
@media (min-width: 1024px) {
  .solutions-grid {
    grid-template-columns: repeat(3, 1fr);
    max-width: 1200px;
  }
}
</style>