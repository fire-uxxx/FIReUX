<template>
  <div class="page">
    <h1>📂 FIReUX App Templates</h1>
    <p>
      FIReUX Templates provide a fast-track solution for developers and startups
      looking to build applications with minimal setup. These templates serve as
      pre-built foundations that you can customize, deploy, and scale for your
      own business or clients.
    </p>

    <!-- How Templates Work -->
    <section>
      <h2>🔥 How FIReUX Templates Work</h2>
      <ul>
        <li>
          <strong>Pre-Built Codebase</strong> – Structured front-end and
          back-end setup.
        </li>
        <li>
          <strong>Fully Customizable</strong> – Modify branding, UI, and
          features.
        </li>
        <li>
          <strong>Self-Hosted</strong> – Deploy the template on your own
          infrastructure.
        </li>
        <li>
          <strong>Full Source Code</strong> – Unlike SaaS, you own and control
          the code.
        </li>
        <li>
          <strong>Developer-Friendly</strong> – Scalable architecture with API
          integrations.
        </li>
      </ul>
    </section>

    <!-- Template Categories -->
    <section>
      <h2>📦 FIReUX Template Categories</h2>
      <ul>
        <li>
          <strong>FIRe-Tip</strong> – A fully customizable digital tipping
          system.
        </li>
        <li>
          <strong>FIRe-Shop</strong> – A foundation for launching an e-commerce
          platform.
        </li>
        <li><strong>FIRe-Bookings</strong> – An appointment booking system.</li>
        <li>
          <strong>FIRe-Subs</strong> – A subscription management framework.
        </li>
        <li>
          <strong>FIRe-Orders</strong> – A structured ordering and fulfillment
          system.
        </li>
      </ul>
    </section>

    <!-- FIReUX Template Pricing Models -->
    <section>
      <h2>💰 FIReUX Template Pricing</h2>

      <!-- Subscription Model -->
      <div class="pricing-block">
        <h3>1️⃣ FIRe-Templates Subscription ($20/month)</h3>
        <p>
          <strong>For developers & startups who want unlimited access.</strong>
        </p>
        <ul>
          <li>✅ Full access to all existing & future templates.</li>
          <li>✅ Early access to new releases.</li>
          <li>✅ Full source code ownership (modify, self-host, resell).</li>
          <li>✅ No extra charges for updates.</li>
        </ul>
        <p>
          <strong>Payment Model:</strong> $20/month – Access remains active
          while subscribed.
        </p>
      </div>

      <!-- One-Time Purchase -->
      <div class="pricing-block">
        <h3>2️⃣ Individual FIRe-Templates (One-Time Purchase)</h3>
        <p><strong>For developers who need a specific template.</strong></p>
        <ul>
          <li>✅ One-time purchase – no recurring fees.</li>
          <li>✅ Full source code – modify and self-host.</li>
          <li>✅ Can be used in multiple projects.</li>
        </ul>
        <p>
          <strong>Payment Model:</strong> Pay per template. No access to future
          releases.
        </p>
      </div>
    </section>

    <!-- Call to Action -->
    <section>
      <h2>🔥 Start Building with FIReUX Templates</h2>
      <p>Choose a template, customize it, and launch your product today.</p>
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

.pricing-block {
  background-color: var(--background-2);
  padding: var(--space-4);
  border-radius: var(--radius-m);
  margin-bottom: var(--space-4);
  box-shadow: var(--shadow-sm);
}
</style>
