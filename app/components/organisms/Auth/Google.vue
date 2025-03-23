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
  await signInWithGoogle(); // ✅ Sign in first
  await onboardUser(); // ✅ Onboard the user immediately
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
