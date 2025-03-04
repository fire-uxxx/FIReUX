<template>
  <UContainer v-if="currentUser" class="content-center">
    <!-- Main Logo -->
    <a href="https://fireux.app" target="_blank">
      <img src="/img/logo.png" alt="FIReMVP Logo" class="logo" >
    </a>

    <header>
      <h1 class="title">Support with a Tip</h1>
    </header>

    <section class="tip-section">
      <UButton class="button" @click="tipUser">Send a Tip 💸 1 USD</UButton>
    </section>

    <section class="ledger-section">
      <h1 class="sub-title">📜 Ledger</h1>
      <!-- Ledger Table using UTable -->
      <UTable :data="formattedLedger" :columns="columns" class="ledger-table" />

      <!-- No-Transactions info (always visible during development) -->
      <div class="no-transactions">
        <p>FIReMVP: A Low-Code Starter for Stripe & Firebase Integrations.</p>
        <p>
          FIReMVP is provided by FIReUX as a low-code solution for developers
          who want to integrate Stripe and Firebase quickly. By cloning the
          project from GitHub and updating your API keys and configuration
          details, you’ll have a fully functional tipping system that allows
          users to send a one-dollar tip directly into your Stripe account.
        </p>
        <p>
          This project is fully customizable and serves as the foundation for
          all our subsequent applications and tutorials. With FIReMVP, you learn
          how to manage transactions and maintain a database—skills that unlock
          the potential to build a wide range of online applications.
        </p>
        <p>
          Try it out, customize it, and if it works for you, feel free to send a
          tip as a thank-you! This message will disappear after your first
          transaction. Visit
          <a href="https://fireux.app" target="_blank">FIReUX</a> for full
          documentation, troubleshooting, and modules.
        </p>
      </div>

      <!-- Secondary Logos in a column -->
      <div class="no-transactions-logos">
        <a href="https://fireux.app" target="_blank">
          <img src="/img/logo.png" alt="FIReMVP Logo" class="logo" >
        </a>
        <a href="https://nuxt.com" target="_blank">
          <img src="/img/nuxt.png" alt="Nuxt Logo" class="logo" >
        </a>
        <a href="https://firebase.google.com" target="_blank">
          <img src="/img/firebase.png" alt="Firebase Logo" class="logo" >
        </a>
        <a href="https://stripe.com" target="_blank">
          <img src="/img/stripe.png" alt="Stripe Logo" class="logo" >
        </a>
      </div>
    </section>

    <section v-if="errorInfo">
      <UAlert type="error">
        <template #header>Error Details:</template>
        <pre>{{ errorInfo }}</pre>
      </UAlert>
    </section>
  </UContainer>
</template>

<script setup lang="ts">
const currentUser = useCurrentUser()
const ledger = useVuefireCollection('ledger')

// Map each ledger entry to a simple object with a raw amount and a formatted date (day/month)
const formattedLedger = computed(() =>
  (ledger.value || []).map(entry => ({
    amount: entry.amount, // keep the raw number
    timestamp: entry.timestamp?.seconds
      ? new Date(entry.timestamp.seconds * 1000).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit'
        })
      : 'N/A'
  }))
)

const columns = [
  { accessorKey: 'amount', header: 'Amount' },
  { accessorKey: 'timestamp', header: 'Date' }
]

async function tipUser() {
  if (!currentUser.value) {
    alert('You need to be logged in to send a tip!')
    return
  }
  try {
    const response = await useFetch('/api/create-stripe-checkout', {
      method: 'POST',
      body: {
        userId: currentUser.value.uid,
        collection: 'ledger',
        product: 'Tip Donation',
        amount: 100 // 100 cents = $1.00
      }
    })
    if (response.data.value?.url) {
      window.location.href = response.data.value.url
    } else {
      console.error('Stripe session creation failed:', response.data.value)
      alert('Failed to create checkout session.')
    }
  } catch (error) {
    console.error('Error sending tip:', error)
    alert('Something went wrong, please try again!')
  }
}
</script>

<style scoped>
.content-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  gap: var(--spacing-l);
  padding: var(--spacing-m);
  max-width: 600px;
}

.logo {
  max-height: 60px;
  width: auto;
  object-fit: contain;
}

.title {
  text-align: center;
  margin: var(--spacing-s) 0;
  font-size: 2rem;
}

.sub-title {
  text-align: center;
  margin: var(--spacing-s) 0;
  font-size: 1.5rem;
}

.no-transactions {
  padding: var(--spacing-m);
  border: 1px solid var(--border);
  border-radius: var(--spacing);
  background-color: var(--bg);
  text-align: center;
  max-width: 600px;
}

.no-transactions-logos {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
  justify-content: center;
  align-items: center;
}
</style>
