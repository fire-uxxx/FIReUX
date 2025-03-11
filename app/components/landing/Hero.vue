<template>
  <section class="section">
    <div class="hero-text">
      <h1 class="hero-title"><strong>Ignite</strong> with</h1>
      <h1 class="hero-highlight">
        <span class="highlight fade-in">Powerful Applications</span>
      </h1>
    </div>

    <p class="hero-description">
      A low-code ecosystem for responsive, scalable, and data-driven
      applications built upon
      <span class="highlight">Nuxt3</span> &
      <span class="highlight">Firebase</span>.
    </p>

    <!-- ✅ Fuel Logos - No Wrapper -->
    <ClientOnly>
      <div class="fuel-logos">
        <div class="fuel-item" v-for="(logo, key) in logos" :key="key">
          <img :src="isDark ? logo.dark : logo.light" :alt="`${key} Logo`" />
        </div>
      </div>
      <template #fallback>
        <div class="loading-placeholder" />
      </template>
    </ClientOnly>

    <!-- ✅ CTA Buttons -->
    <div class="cta-buttons">
      <UButton variant="solid" to="/getting-started">Get Started</UButton>
      <UButton
        variant="outline"
        to="/projects"
        trailing-icon="i-heroicons-arrow-right"
      >
        Explore Projects
      </UButton>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const logos = {
  nuxt: { light: '/img/nuxt-black.png', dark: '/img/nuxt-white.png' },
  firebase: {
    light: '/img/firebase-black.png',
    dark: '/img/firebase-white.png'
  }
}
</script>

<style scoped>
.section {
  gap: var(--space-8);
  padding: var(--space-6);
}
/* ✅ Left-Aligned Hero Text */
.hero-text,
.hero-description {
  text-align: left;
  align-self: flex-start;
  max-width: 500px; /* ✅ Ensures text doesn’t stretch too wide */
}

/* ✅ Increased Font Size */
.hero-title,
.hero-highlight {
  font-size: var(--text-5xl);
  font-weight: bold;
  line-height: 1.2;
}

/* ✅ Fuel Logos - No Wrapper */
.fuel-logos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* ✅ Centered on mobile */
  align-items: center;
  gap: var(--space-6);
  margin-top: var(--space-6);
  width: 100%;
}

/* ✅ Fuel Items */
.fuel-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fuel-item img {
  max-width: 120px;
  filter: grayscale(50%);
  transition: filter 0.3s ease-out, transform 0.3s ease-in-out;
}

.fuel-item:hover img {
  filter: grayscale(0%);
}

/* ✅ Large Screen: Left Align */
@media (min-width: 1024px) {
  .hero-text,
  .hero-description {
    text-align: left;
    align-self: flex-start;
    max-width: 310px; /* ✅ Ensures text doesn’t stretch too wide */

  }

  .fuel-logos,
  .cta-buttons {
    justify-content: flex-start;
  }
}
</style>
