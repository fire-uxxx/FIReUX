<template>
  <UChip inset @click="navigate">
    <UAvatar :src="userAvatar" :alt="userAlt" size="lg" />
  </UChip>
</template>

<script setup>
const router = useRouter()
const currentUser = useCurrentUser()
const { appUser } = useAppUser()

const userAvatar = computed(() => {
  console.log('App User Avatar:', appUser.value?.avatar)
  return appUser.value?.avatar
})

const userAlt = computed(() => {
  console.log('App User Display Name:', appUser.value?.display_name)
  return appUser.value?.display_name
})

const navigate = () => {
  console.log('Navigate triggered. Current User:', currentUser.value)
  if (currentUser.value?.isAnonymous) {
    router.push('/auth')
  } else {
    router.push('/dashboard')
  }
}
</script>
