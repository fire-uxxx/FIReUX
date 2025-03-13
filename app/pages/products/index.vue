<!-- COMMENT: app/pages/products/index.vue -->
<!-- File: pages/products/index.vue -->
<template>
  <div class="page">
    <h1>🔥 FIReUX Products</h1>
    <p>
      Explore our powerful digital solutions designed to help businesses operate
      efficiently, scale quickly, and maximize revenue.
    </p>

    <!-- Product Categories -->
    <section>
      <h2>📦 Product Categories</h2>
      <ul>
        <li>
          <strong>SaaS (Subscription-Based Services)</strong> – Fully hosted
          software that runs on FIReUX’s cloud infrastructure.
        </li>
        <li>
          <strong>White-Label Solutions</strong> – Fully rebrandable software
          you can resell as your own.
        </li>
        <li>
          <strong>Templates</strong> – Pre-built app structures for developers
          to modify and deploy.
        </li>
      </ul>
    </section>

    <!-- Featured Products -->
    <section>
      <h2>🚀 Featured Products</h2>
      <ul>
        <li>
          <strong>FIRe-Tip</strong> – A digital tipping system for individuals
          and businesses.
        </li>
        <li>
          <strong>FIRe-Bookings</strong> – An intuitive booking system for
          service-based businesses.
        </li>
        <li><strong>FIRe-Shop</strong> – A no-code e-commerce platform.</li>
        <li>
          <strong>FIRe-Subs</strong> – Subscription billing management made
          simple.
        </li>
        <li>
          <strong>FIRe-Orders</strong> – A seamless ordering system for food,
          retail, and service businesses.
        </li>
      </ul>
    </section>

    <!-- Call to Action -->
    <section>
      <h2>🔥 Get Started with FIReUX</h2>
      <p>
        Choose the right solution for your business and start scaling today.
      </p>
      <UButton to="/pricing" variant="subtle">View Pricing</UButton>
    </section>
  </div>
</template>

<style scoped>
.page {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-4);
}
</style>
