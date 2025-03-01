<template>
  <UApp>
    <UButton>Firebase Works!</UButton>

    <div v-if="ledger">
      <pre>{{ ledger }}</pre>
    </div>

    <UButton @click="tipUser">💸 Send a Tip</UButton>
  </UApp>
</template>

<script setup>
import { useCurrentUser } from 'vuefire'
const ledger = useVuefireCollection('ledger')
const user = useCurrentUser()

const tipUser = async () => {
  if (!user.value) {
    console.error('User not signed in!')
    return
  }

  try {
    const response = await useFetch('/api/create-checkout-session', {
      method: 'POST',
      body: JSON.stringify({
        userId: user.value.uid,
        collection: 'ledger',
        product: 'Tip Donation',
        amount: 500, // Amount in cents ($5.00)
      }),
    })

    if (response.data.value?.id) {
      window.location.href = response.data.value.url // Redirect to Stripe Checkout
    } else {
      console.error('Failed to create checkout session:', response.data.value)
    }
  } catch (error) {
    console.error('Error sending tip:', error)
  }
}
</script>