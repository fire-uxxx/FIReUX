<!-- COMMENT: app/pages/pricing.vue -->
<!-- File: pages/pricing.vue -->
<template>
  <div class="page">
    <h1>💰 FIReUX Pricing</h1>
    <p>Find the perfect plan for your business, whether you're looking for a fully hosted SaaS solution, a white-label business opportunity, or a developer-friendly template.</p>

    <!-- Pricing Table -->
    <section>
      <h2>🔥 Pricing Plans</h2>
      <table class="pricing-table">
        <thead>
          <tr>
            <th>Model</th>
            <th>Who It’s For</th>
            <th>Hosting</th>
            <th>Branding</th>
            <th>Customization</th>
            <th>Pricing Model</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>SaaS</strong></td>
            <td>End Users</td>
            <td>FIReUX</td>
            <td>FIReUX Branding</td>
            <td>Minimal</td>
            <td>Subscription (Monthly/Yearly)</td>
          </tr>
          <tr>
            <td><strong>White-Label</strong></td>
            <td>Entrepreneurs & Agencies</td>
            <td>FIReUX</td>
            <td>Fully Branded</td>
            <td>Limited</td>
            <td>One-Time Purchase</td>
          </tr>
          <tr>
            <td><strong>Templates</strong></td>
            <td>Developers & Startups</td>
            <td>Buyer</td>
            <td>Fully Custom</td>
            <td>Full Code Access</td>
            <td>One-Time Purchase</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- SaaS Pricing -->
    <section>
      <h2>🔄 SaaS Pricing</h2>
      <p>Access fully hosted, scalable software solutions without technical setup.</p>
      <ul>
        <li><strong>Basic Plan</strong> – $10/month (Essential features, single user)</li>
        <li><strong>Pro Plan</strong> – $40/month (Expanded features, multiple users)</li>
        <li><strong>Enterprise Plan</strong> – Custom pricing (Advanced automation, integrations, priority support)</li>
      </ul>
    </section>

    <!-- White-Label Pricing -->
    <section>
      <h2>🚀 White-Label Pricing</h2>
      <p>Own your SaaS platform and resell under your brand.</p>
      <ul>
        <li><strong>Single License</strong> – $500 (One-time purchase, basic branding)</li>
        <li><strong>Extended License</strong> – $2,000 (Fully branded, resell rights)</li>
        <li><strong>Enterprise License</strong> – Custom pricing (Custom features, ongoing updates)</li>
      </ul>
    </section>

    <!-- Templates Pricing -->
    <section>
      <h2>📂 Templates Pricing</h2>
      <p>Get a pre-built codebase to customize and deploy your software.</p>
      <ul>
        <li><strong>Basic Template</strong> – $99 (One-time purchase, base template)</li>
        <li><strong>Advanced Template</strong> – $299 (Expanded features, API integrations)</li>
        <li><strong>Full Source Code</strong> – Custom pricing (Full ownership, priority support)</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.pricing-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.pricing-table th, .pricing-table td {
  border: 1px solid var(--border);
  padding: 0.75rem;
  text-align: left;
}
.pricing-table th {
  background-color: var(--background-2);
}
</style>
