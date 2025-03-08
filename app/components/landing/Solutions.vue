<template>
  <section class="centered-section">
    <h2 class="title">Explore FIReUX Solutions</h2>
    <div class="grid-layout">
      <UCard v-for="solution in solutions" :key="solution.title" class="card">
        <template #header>
          <h3 class="title">{{ solution.title }}</h3>
        </template>
        <p class="text">{{ solution.description }}</p>
        <template #footer>
          <UButton variant="subtle" :to="solution.link" class="button-bottom">
            {{ solution.buttonText }}
          </UButton>
        </template>
      </UCard>
    </div>
  </section>
</template>

<script setup>
const solutions = [
  { title: 'Products', description: 'Instant business tools, fully hosted and ready to go.', link: '/products', buttonText: 'Explore Products' },
  { title: 'White-Label', description: 'Rebrand and resell FIReUX products as your own.', link: '/whitelabel', buttonText: 'Become a Partner' },
  { title: 'SaaS', description: 'Fully managed, subscription-based applications built for scale.', link: '/saas', buttonText: 'See SaaS Solutions' },
  { title: 'Templates', description: 'Pre-built software frameworks for developers and startups.', link: '/templates', buttonText: 'Browse Templates' }
];
</script>