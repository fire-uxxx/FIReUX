<template>
  <button class="google-btn" @click="handleGoogleSignIn">
    <img :src="logoSrc" alt="Sign in with Google" >
  </button>
</template>

<script setup>
const { signInWithGoogle } = useAuth()
const { onboardUser } = useUser()
const isDark = computed(() => useColorMode().value === 'dark')

const logoSrc = computed(() =>
  isDark.value ? '/img/sign-in-dark.svg' : '/img/sign-in-light.svg'
)

const handleGoogleSignIn = async () => {
  const user = await signInWithGoogle()
  if (user?.uid) {
    console.log('[handleGoogleSignIn] ✅ Got UID:', user.uid)
    await onboardUser(user.uid)
  } else {
    console.warn('[handleGoogleSignIn] ❌ No UID returned from Google sign-in')
  }
}
</script>

<style scoped>
.google-btn {
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
}
</style>
