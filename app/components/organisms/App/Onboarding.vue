<template>
  <UContainer>
    <!-- Authentication & PIN Gate -->
    <div v-if="!isUnlocked">
      <OrganismsAuthSystem />

      <div v-if="showPin" class="pin-section">
        <p class="pin-instruction">🔒 Enter the developer PIN to continue.</p>
        <UPinInput
          v-model="pin"
          :length="4"
          type="number"
          placeholder="○"
          @complete="checkPin"
        />
      </div>
    </div>

    <!-- Onboarding Section -->
    <div v-else class="edit-component">
      <div class="logo-wrapper">
        <LogoType size="medium" />
      </div>
      <OrganismsAppOnboardingVariables />
      <div v-if="allEnvValid">
        <UButton block @click="createAppHandler">Create App</UButton>
      </div>
      <p v-else class="setup-reminder">
        ✅ All required environment variables must be set before you can create an app.<br />
        After updating your credentials, restart your server: 
        <code>npm run dev</code>.
      </p>
    </div>
  </UContainer>
</template>

<script setup>
const pin = ref([])
const isUnlocked = ref(false)

// Always show the PIN for now
const showPin = true

// Environment Check (true/false)
const { data: allEnvValid } = await useFetch('/api/env-check')

// PIN Logic
const {
  public: { PIN }
} = useRuntimeConfig()

function checkPin() {
  if (pin.value.join('') === PIN) {
    isUnlocked.value = true
  }
}

// Create App Handler
function createAppHandler() {
  const {
    public: { APP_ID, PWA_APP_NAME }
  } = useRuntimeConfig()

  const appId = APP_ID
  const appName = PWA_APP_NAME
  const { createApp } = useAppCreate(appId, appName)()

  createApp()
    .then(() => console.log('🎉 App created successfully!'))
    .catch(error => console.error('❌ Error creating app:', error))
}
</script>

<style scoped>
.pin-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 10vh;
  margin-top: var(--space-6);
}

.pin-instruction {
  text-align: center;
  margin-bottom: var(--space-4);
  color: var(--text-secondary);
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