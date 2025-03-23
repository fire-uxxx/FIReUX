<template>
  <UContainer>
    <div v-if="currentUser?.isAnonymous" class="anon-warning">
      <p>You must create an account before creating an app.</p>
      <UButton to="/auth" color="primary" block>Create Account</UButton>
    </div>

    <div v-else-if="!isUnlocked" class="pin-section">
      <UPinInput v-model="pin" :length="4" type="number" placeholder="○" @complete="checkPin" />
    </div>

    <div v-else class="edit-component">
      <div class="logo-wrapper">
        <LogoType size="medium" />
      </div>
      <OrganismsAuthOnboardingVariables />
      <div v-if="allEnvValid">
        <UButton @click="saveAppDetails" color="primary" block>Create App</UButton>
      </div>
      <p v-else class="setup-reminder">✅ All required environment variables must be set before you can create an app.<br>After updating your credentials, restart your server: <code>npm run dev</code>.</p>
    </div>
  </UContainer>
</template>

<script setup>
const pin = ref([])
const isUnlocked = ref(false)
const { createApp } = useFirestoreManager()
const { updateUser } = useUserUpdate()
const currentUser = useCurrentUser()

const { data: envData } = await useFetch('/api/env-check')

const allEnvValid = computed(() => {
  if (!envData.value) return false
  return Object.values(envData.value).every(entry => entry.present)
})

function checkPin() {
  const input = pin.value.join('')
  if (input === useRuntimeConfig().public.PIN) {
    isUnlocked.value = true
  }
}

async function saveAppDetails() {
  try {
    await createApp(useRuntimeConfig().public.PWA_APP_NAME.toLowerCase().replace(/\s+/g, ''))
    if (currentUser.value) {
      await updateUser({ isAdmin: true })
      console.log('✅ User marked as admin.')
    }
    console.log('✅ App created successfully.')
  } catch (error) {
    console.error('❌ Failed to create app or assign admin:', error)
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