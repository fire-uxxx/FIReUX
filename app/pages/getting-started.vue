<!-- COMMENT: app/pages/getting-started.vue -->
<template>
  <div>
    <h1>🔥 Get Started with FIReUX</h1>
    <p>
      Kickstart your journey with the free FIRe-Tip Template. Set up your
      digital tipping system and unlock the full potential of FIReUX.
    </p>

    <UAlert icon="i-heroicons-information-circle">
      This guide walks you through downloading **FIRe-Tip**, setting up
      **Firebase & Stripe**, and accessing developer tools.
    </UAlert>

    <!-- Step 1: Download Template -->
    <section id="download">
      <h2>📥 Step 1: Download FIRe-Tip</h2>
      <p>Get the fully customizable tipping template and start building.</p>
      <UButton to="/downloads/fire-tip" variant="solid"
        >Download Now (Free)</UButton
      >
    </section>

    <!-- Step 2: Setup Guide -->
    <section id="setup">
      <h2>⚙️ Step 2: Setup Guide</h2>
      <p>Follow our simple guide to connect Firebase & Stripe.</p>
      <UButton to="/docs/fire-tip" variant="outline">Read Setup Guide</UButton>
    </section>

    <!-- Step 3: Developer Dashboard -->
    <section id="dashboard">
      <h2>🛠️ Step 3: Developer Dashboard</h2>
      <p>Access documentation, tutorials, and community support.</p>
      <UButton to="/dashboard" variant="subtle">Go to Dashboard</UButton>
    </section>

    <!-- Step 4: What's Next? -->
    <section id="next">
      <h2>🚀 Step 4: What’s Next?</h2>
      <p>
        FIReUX is more than just a template. Explore powerful business tools.
      </p>
      <div class="grid">
        <UButton to="/saas" variant="subtle">Explore SaaS</UButton>
        <UButton to="/whitelabel" variant="subtle">Go White-Label</UButton>
        <UButton to="/templates" variant="subtle">Browse Templates</UButton>
      </div>
    </section>

    <USeperator />

    <!-- Help & Community -->
    <section id="help">
      <h2>💡 Need Help?</h2>
      <p>Have questions? Read our docs or join the FIReUX community.</p>
      <div class="grid">
        <UButton to="/docs" variant="subtle">Read Documentation</UButton>
        <UButton to="/community" variant="subtle">Join the Community</UButton>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'article'
})
</script>

<style scoped>
.grid {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

section {
  margin-bottom: var(--space-8);
}
</style>
