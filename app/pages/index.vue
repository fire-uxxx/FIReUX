<template>
  <div v-if="currentUser" class="container">
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
import { computed } from 'vue'
import { useVuefireCollection } from '~/composables/useVuefireCollection.js'

// Fetch current user
const currentUser = useCurrentUser()

// Access the "ledger" collection from Firestore
const ledger = useVuefireCollection('ledger')

// Format the ledger data
const formattedLedger = computed(() => {
  return (ledger.value || []).map(entry => {
    // Use 'entry.amount' (not entry.amt) as that's what we write in Firestore
    const rawAmount = entry.amount ?? 0
    const amtDollars = (rawAmount / 100).toFixed(2)

    // Use fallback for status if missing
    const rawStatus = entry.status || 'Unknown'
    const capitalizedStatus = rawStatus.charAt(0).toUpperCase() + rawStatus.slice(1)

    // Format the timestamp from Firestore (if exists)
    let displayDate = 'N/A'
    if (entry.timestamp?.seconds) {
      displayDate = new Date(entry.timestamp.seconds * 1000)
        .toLocaleDateString('en-GB')
    }

    return {
      amt: amtDollars,
      status: capitalizedStatus,
      timestamp: displayDate
    }
  })
})

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