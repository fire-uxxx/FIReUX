<template>
  <div class="button-group">
    <UButton block @click="handleClick">
      {{ user ? 'Go to Dashboard' : 'Create FireUX User' }}
    </UButton>
    <UButton block @click="handleSignOut"> Sign Out </UButton>
  </div>
</template>

<script setup>


const router = useRouter()
const { user, createUser } = useUser()
const { signOutUser } = useAuth()

const handleClick = async () => {
  if (user.value) {
    router.push('/dashboard')
  } else {
    await createUser()
    router.push('/dashboard')
  }
}

const handleSignOut = async () => {
  await signOutUser()
  router.push('/auth')
}
</script>

<style scoped>
.button-group {
  flex-direction: column;
  margin: 0;
}
</style>
