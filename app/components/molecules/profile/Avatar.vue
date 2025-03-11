<template>
  <UChip inset @click="navigate">
    <UAvatar :src="userAvatar" :alt="userAlt" size="lg" />
  </UChip>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCurrentUser } from 'vuefire'

const router = useRouter()
const currentUser = useCurrentUser()

const userAvatar = computed(() => {
  if (!currentUser.value) return 'img/default-avatar.png'
  return currentUser.value.photoURL || 'img/default-avatar.png'
})

const userAlt = computed(() => currentUser.value?.displayName || 'Guest')

const navigate = () => {
  if (currentUser.value?.isAnonymous) {
    router.push('/auth')
  } else {
    router.push('/dashboard')
  }
}
</script>