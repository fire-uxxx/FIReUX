<template>
  <UContainer>
    <div v-if="step === 'anon'" class="anon-warning">
      <p>You must create an account before becoming an admin.</p>
      <OrganismsAuthGoogle />
      <OrganismsAuthEmail />
    </div>

    <div v-else-if="step === 'missingUser'" class="anon-warning">
      <OrganismsAuthAuthenticated />
    </div>

    <div v-else-if="step === 'pin'" class="pin-section">
      <UPinInput
        v-model="pin"
        :length="4"
        type="number"
        placeholder="○"
        @complete="checkPin"
      />
    </div>

    <div v-else class="edit-component">
      <div class="logo-wrapper">
        <LogoType size="medium" />
      </div>
      <OrganismsAdminOnboardingVariables />
      <div v-if="allEnvValid">
        <UButton block @click="createApp">Create App</UButton>
      </div>
      <p v-else class="setup-reminder">
        ✅ All required environment variables must be set before you can create
        an app.<br />
        After updating your credentials, restart your server:
        <code>npm run dev</code>.
      </p>
    </div>
  </UContainer>
</template>

<script setup>
// Refs
const pin = ref([])
const isUnlocked = ref(false)
const currentUser = useCurrentUser()
const { user } = useUser()

// Environment check
const { data: envData } = await useFetch('/api/env-check')

const allEnvValid = computed(() => {
  if (!envData.value) return false
  return Object.values(envData.value).every(entry => entry.present)
})

// Step computation
const step = computed(() => {
  if (currentUser.value?.isAnonymous) return 'anon'
  if (!user.value) return 'missingUser'
  if (!isUnlocked.value) return 'pin'
  return 'onboard'
})

// PIN logic
function checkPin() {
  const input = pin.value.join('')
  if (input === useRuntimeConfig().public.PIN) {
    isUnlocked.value = true
  }
}
</script>

<style scoped>
.anon-warning {
  text-align: center;
  padding: var(--space-4);
}

.pin-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10vh;
}

.edit-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-4);
}

.logo-wrapper {
  margin-bottom: var(--space-4);
}

.setup-reminder {
  margin-top: var(--space-4);
  font-size: 0.95em;
  color: var(--text-secondary);
  text-align: center;
}
</style>
