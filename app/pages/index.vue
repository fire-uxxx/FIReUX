<template>
  <UContainer v-if="currentUser" class="content-center">
    <img src="/img/logo.png" alt="FIReMVP Logo" class="logo" />

    <header>
      <UHeading level="1" class="content-center"
        >🔥 Support with a Tip</UHeading
      >
    </header>

    <section class="tip-section content-center">
      <UButton @click="tipUser" class="button"> Send a Tip 💸 1 USD </UButton>
    </section>

    <section class="ledger-section content-center">
      <UHeading level="2">📜 Ledger</UHeading>
      <div v-if="formattedLedger.length">
        <div
          v-for="(entry, index) in formattedLedger"
          :key="index"
          class="mb-4"
        >
          <UCard variant="outlined">
            <p><strong>Amount:</strong> ${{ entry.amt }}</p>
            <p><strong>Status:</strong> {{ entry.status }}</p>
            <p><strong>Date:</strong> {{ entry.timestamp }}</p>
          </UCard>
        </div>
      </div>
      <div v-else class="no-transactions">
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
      <div class="no-transactions-logos">
        <img src="/img/nuxt.png" alt="Nuxt Logo" class="logo" />
        <img src="/img/firebase.png" alt="Firebase Logo" class="logo" />
        <img src="/img/stripe.png" alt="Stripe Logo" class="logo" />
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

const formattedLedger = computed(() =>
  (ledger.value || []).map(entry => {
    const rawAmount = entry.amount ?? 0
    const amtDollars = (rawAmount / 100).toFixed(2)
    const rawStatus = entry.status || 'Unknown'
    const capitalizedStatus =
      rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1)
    let displayDate = 'N/A'
    if (entry.timestamp?.seconds) {
      displayDate = new Date(entry.timestamp.seconds * 1000).toLocaleDateString(
        'en-GB'
      )
    }
    return {
      amt: amtDollars,
      status: capitalizedStatus,
      timestamp: displayDate
    }
  })
)

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
  max-width: fit-content;
  gap: var(--spacing-l);
}

/* Style for the no-transactions section */
.no-transactions {
  padding: var(--spacing-m);
  border: 1px solid var(--border);
  border-radius: 8px;
  background-color: var(--bg);
  text-align: start;
  max-width: 600px;
}

/* Logos inside the no-transactions section arranged in a row */
.no-transactions-logos {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);
  justify-content: center;
  align-items: center;
  margin-top: var(--spacing-m);
}

.logo {
  max-height: 60px;
  width: auto;
  object-fit: contain;
}
</style>
