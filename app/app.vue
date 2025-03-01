<template>
  <UApp>
    <UButton>Firebase Works!</UButton>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <pre>{{ appsJSON }}</pre>
    </div>
  </UApp>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { collection, onSnapshot } from 'firebase/firestore'
import { useNuxtApp } from '#app'

const apps = ref([])
const loading = ref(true)

const appsJSON = computed(() => JSON.stringify(apps.value, null, 2))

onMounted(() => {
  const { $firebase } = useNuxtApp()
  if (!$firebase || !$firebase.db) {
    console.error("Firebase DB instance is not available!")
    loading.value = false
    return
  }
  const appsCollection = collection($firebase.db, 'apps')
  onSnapshot(
    appsCollection,
    (snapshot) => {
      apps.value = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
      loading.value = false
      console.log("Snapshot update:", apps.value)
    },
    (error) => {
      console.error("onSnapshot error:", error)
      loading.value = false
    }
  )
})
</script>