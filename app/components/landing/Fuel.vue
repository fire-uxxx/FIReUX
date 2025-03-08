<template>
  <section class="centered-section">
    <h2 class="flame">🔥</h2>
    <div class="grid-layout">
      <div class="fuel-item">
        <NuxtImg src="/img/nuxt.png" alt="Nuxt Logo" />
      </div>
      <div class="fuel-item">
        <NuxtImg src="/img/firebase.png" alt="Firebase Logo" />
      </div>
      <div class="fuel-item">
        <NuxtImg src="/img/stripe.png" alt="Stripe Logo" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.fuel-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-m);
  background-color: var(--bg);
  transition: transform 0.3s ease-out, box-shadow 0.3s ease-in-out;
}

.fuel-item img {
  max-width: 100px;
  filter: grayscale(50%);
  transition: filter 0.3s ease-out, transform 0.3s ease-in-out;
}

.fuel-item:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.fuel-item:hover img {
  filter: grayscale(0%);
}
</style>