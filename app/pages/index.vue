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

<style>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 900px; /* ✅ Prevents excessive stretching */
  margin: 0 auto;
  gap: var(--space-12);
}

/* ✅ Section Structure */
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}

/* ✅ Standard CTA Buttons */
.cta-buttons {
  display: flex;
  flex-direction: row;
  justify-content: center; /* ✅ Centered on mobile */

  gap: var(--space-4);
  margin-top: var(--space-4);
  width: 100%;
}

/* ✅ Fade-In Animation */
.fade-in {
  opacity: 0;
  transform: translateY(10px);
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.highlight {
  color: var(--ui-primary);
}

/* ✅ Responsive Grid */
.grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
  width: 100%;
  max-width: 300px;
}

/* 🖥 Tablet: Two Columns */
@media (min-width: 600px) {
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    max-width: 900px;
  }
}

/* 🖥 Desktop: Three Columns */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    max-width: 1200px;
    align-items: flex-start;
  }
}
</style>
