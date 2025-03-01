<template>
  <div class="container">
    <h1 class="page-title">🔥 Support with a Tip</h1>

    <div class="tip-section">
      <UButton @click="tipUser" class="tip-button">
        💸 Send a Tip (100)
      </UButton>
    </div>

    <div class="ledger-section">
      <h2 class="ledger-title">📜 Ledger</h2>

      <table v-if="formattedLedger.length" class="ledger-table">
        <thead>
          <tr>
            <th>Amount ($)</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in formattedLedger" :key="index">
            <td>${{ entry.amt }}</td>
            <td>{{ entry.status }}</td>
            <td>{{ entry.timestamp }}</td>
          </tr>
        </tbody>
      </table>

      <p v-else class="no-transactions">No transactions yet.</p>
    </div>
  </div>
</template>

<script setup>
import { useCurrentUser } from 'vuefire'

// Fetch current user
const currentUser = useCurrentUser()
const ledger = useVuefireCollection('ledger')

// Format Ledger Data
const formattedLedger = computed(() =>
  (ledger.value || []).map(entry => ({
    amt: (entry.amt / 100).toFixed(2), // Convert cents to dollars
    status: entry.status.charAt(0).toUpperCase() + entry.status.slice(1), // Capitalize status
    timestamp: entry.timestamp?.seconds
      ? new Date(entry.timestamp.seconds * 1000).toLocaleDateString('en-GB') // DD/MM/YYYY format
      : 'N/A'
  }))
)

// Send a tip (Stripe checkout)
const tipUser = async () => {
  if (!currentUser.value) {
    alert('You need to be logged in to send a tip!')
    return
  }

  try {
    const response = await useFetch('/api/create-checkout-session', {
      method: 'POST',
      body: {
        userId: currentUser.value.uid,
        amount: 100, // 100 cents ($1.00)
        product: 'Tip Donation',
      },
    })

    if (response.data.value?.url) {
      window.location.href = response.data.value.url // Redirect to Stripe
    } else {
      console.error('Stripe session creation failed:', response.data.value)
      alert('Failed to create checkout session.')
    }
  } catch (error) {
    console.error('Error during Stripe checkout:', error)
    alert('Something went wrong, please try again!')
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: var(--spacing-m);
  text-align: center;
}

.page-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: var(--spacing-m);
}

.tip-button {
  margin-bottom: var(--spacing-l);
}

.ledger-section {
  margin-top: var(--spacing-xl);
}

.ledger-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: var(--spacing-m);
}

.no-transactions {
  color: var(--color-neutral-600);
}

.ledger-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--spacing-m);
}

.ledger-table th,
.ledger-table td {
  border: 1px solid var(--border);
  padding: var(--spacing-s);
  text-align: center;
}

.ledger-table th {
  background-color: var(--background-2);
}
</style>