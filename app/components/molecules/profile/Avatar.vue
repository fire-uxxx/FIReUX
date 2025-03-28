<template>
  <UChip inset @click="navigate">
    <UAvatar :src="userAvatar" :alt="userAlt" size="lg" />
  </UChip>
</template>

<script setup>
const router = useRouter()
const currentUser = useCurrentUser()
const { user } = useUser()

const userAvatar = computed(() => {
  return (
    user.value?.avatar || currentUser.value?.avatar || 'img/default-avatar.png'
  )
})

const userAlt = computed(
  () => user.value?.display_name || currentUser.value?.displayName || 'Guest'
)

const navigate = () => {
  if (currentUser.value?.isAnonymous) {
    router.push('/auth')
  } else {
    router.push('/dashboard')
  }
}
</script>
