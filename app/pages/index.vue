<template>
  <div class="home page">
    <!-- Hero Section -->
    <section class="hero">
      <h1 class="flame">🔥</h1>
      <LayoutLogo size="large" />
      <div class="hero-title">- Vision Fuel -</div>
      <p class="hero-subtitle">Apps and Interfaces for Enterprise</p>
      <UButton>Get Started</UButton>
    </section>

    <!-- What We Offer -->
    <section class="hero-left">
      <h2 class="section-title">Why FIReUX?</h2>
      <ul>
        <li>🚀 Rapid Deployment with modern frameworks</li>
        <li>🎨 Highly Customizable to match your business needs</li>
        <li>🤝 Personal Developer & Ongoing Support</li>
      </ul>
    </section>

    <!-- Technologies Section -->
    <section class="technologies">
      <h2 class="section-title">Powering Our Apps</h2>
      <div class="tech-grid">
        <div class="tech-item">
          <img src="/img/nuxt.png" alt="Nuxt Logo" />
          <p>Nuxt 3</p>
        </div>
        <div class="tech-item">
          <img src="/img/firebase.png" alt="Firebase Logo" />
          <p>Firebase</p>
        </div>
        <div class="tech-item">
          <img src="/img/stripe.png" alt="Stripe Logo" />
          <p>Stripe</p>
        </div>
      </div>
    </section>

    <!-- Killer Pitch Section -->
    <section class="killer-pitch">
      <h2>You're Not Just Buying a Website—You're Investing in a Business Tool</h2>
      <p>
        Unlike Wix and WordPress, FIReUX delivers <strong>custom business solutions</strong> that automate workflows,
        integrate APIs, and power your industry with real software.
      </p>
      <UButton>Learn More</UButton>
    </section>
  </div>
</template>

<style scoped>
/* General Page Layout */
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: var(--spacing-m);
  text-align: center;
  background-color: var(--bg);
  color: var(--text);
}

/* Hero Section */
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-l) 0;
  gap: var(--spacing-m);
}

.flame {
  font-size: var(--text-5xl);
}

.hero-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-bold);
}

.hero-subtitle {
  font-size: var(--text-lg);
  color: var(--text);
}

/* What We Offer */
.hero-left {
  text-align: left;
  max-width: 600px;
  width: 100%;
  padding: var(--spacing-m);
}

.hero-left ul {
  list-style: none;
  padding: 0;
}

.hero-left li {
  font-size: var(--text-base);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-s);
}

/* Section Titles */
.section-title {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-m);
}

/* Technologies Section */
.technologies {
  text-align: center;
  padding: var(--spacing-xl) 0;
}

.tech-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-m);
  max-width: 600px;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tech-item img {
  width: 50px;
  height: auto;
  margin-bottom: var(--spacing-xs);
}

.tech-item p {
  font-size: var(--text-sm);
}

/* Killer Pitch */
.killer-pitch {
  text-align: center;
  padding: var(--spacing-l);
}

.killer-pitch h2 {
  font-size: var(--text-2xl);
}

.killer-pitch p {
  font-size: var(--text-lg);
}
</style>