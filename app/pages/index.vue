<!-- app/pages/index.vue -->
<template>
  <div class="page">
    <EffectsStarfield />
    <LogoType size="hero" />
    <LandingHero />
    <LandingFireUX first />
    <LandingFuel />
    <LandingSkillsIcons />
    <LandingSolutions />
    <LandingFireUX second />
  </div>
</template>

<script setup>
</script>

<style scoped>

@media (min-width: 768px) {
  .page {
    gap: var(--space-20);
    max-width: 900px
  }
}
</style>