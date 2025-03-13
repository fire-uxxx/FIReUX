<!-- COMMENT: app/components/molecules/AuthForm.vue -->
<template>
  <UContainer class="auth-container">
    <ClientOnly>
      <template v-if="!isProcessing">
        <!-- ✅ Authenticated -->
        <div v-if="authState === 'AUTHENTICATED'" class="section">
          <UButton
            v-if="appUserState === 'EXISTS'"
            block
            @click="navigateToDashboard"
          >
            Go to Dashboard
          </UButton>
          <UButton
            v-else-if="appUserState === 'DOES_NOT_EXIST'"
            block
            @click="createUserAndRedirect"
          >
            Create App User
          </UButton>
          <div v-else class="auth-fallback">
            <UButton block @click="createUserAndRedirect">
              Retry Creating App User
            </UButton>
          </div>
        </div>

        <!-- ❌ Not Authenticated -->
        <div v-else class="section">
          <button class="google-btn" @click="handleAuth(signInWithGoogle)">
            <img
              :src="isDark ? googleLogos.dark : googleLogos.light"
              alt="Sign in with Google"
            />
          </button>

          <USeparator label="or" />

          <UForm :state="state" @submit="handleEmailAuth" class="auth-form">
            <UInput v-model="state.email" placeholder="Email" />
            <UInput
              v-model="state.password"
              type="password"
              placeholder="Password"
            />
            <div class="switch-container">
              <USwitch
                v-model="isSignUp"
                :label="isSignUp ? 'Signing Up' : 'Signing In'"
              />
            </div>
            <UButton type="submit" block>{{
              isSignUp ? 'Create Account' : 'Continue'
            }}</UButton>
          </UForm>
        </div>
      </template>

      <!-- ✅ Show loading state when processing authentication -->
      <MoleculesLoadingContainer v-else />
    </ClientOnly>
  </UContainer>
</template>

<script setup>
const currentUser = useCurrentUser()
const {
  authState,
  signInWithGoogle,
  signInWithEmailPassword,
  signUpWithEmailPassword
} = useAuth()
const { appUserState, createAppUser, onboardAppUser } = useAppUser()
const router = useRouter()

// ✅ Light/Dark Theme Mode
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

// ✅ Google Logos for Light/Dark Mode
const googleLogos = {
  light: '/img/sign-in-light.svg',
  dark: '/img/sign-in-dark.svg'
}

// ✅ Sign In / Sign Up Toggle (Defaults to Signing Up)
const isSignUp = ref(true)

// ✅ Reactive form state
const state = reactive({
  email: '',
  password: ''
})

// ✅ Track if authentication is in progress
const isProcessing = ref(false)

// ✅ Universal Authentication Handler
const handleAuth = async authMethod => {
  isProcessing.value = true

  const user = await authMethod()
  if (user) {
    if (authMethod === signInWithGoogle) return

    console.log('✅ User UID:', user.uid)
    await onboardAppUser(user.uid)
    router.push('/dashboard')
  } else {
    console.log('❌ Authentication failed - No user object returned')
    isProcessing.value = false
  }
}

// ✅ Handle Email Authentication (Sign In OR Sign Up)
const handleEmailAuth = async () => {
  const authMethod = isSignUp.value
    ? signUpWithEmailPassword
    : signInWithEmailPassword
  await handleAuth(() => authMethod(state.email, state.password))
}

// ✅ Create User & Redirect
const createUserAndRedirect = async () => {
  await createAppUser(currentUser.value?.uid)
  router.push('/dashboard')
}

// ✅ Navigate to Dashboard
const navigateToDashboard = () => {
  router.push('/dashboard')
}
</script>

<style scoped>
/* ✅ Locked-in container */
.auth-container {
  padding: var(--space-20);
  border: 1px solid var(--ui-primary);
  border-radius: var(--radius-xl);
  gap: var(--space-3);
}

/* ✅ Google Sign-In Button */
.google-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
  margin-bottom: var(--space-5);
}

.google-btn:hover {
  transform: scale(1.05);
}

/* ✅ Consistent alignment */
.authenticated,
.not-authenticated {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

/* ✅ Fallback */
.auth-fallback {
  margin-top: var(--space-5);
}

/* ✅ Form styling */
.auth-form {
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* ✅ Full-Width Switch */
.switch-container {
  width: 100%;
}
</style>