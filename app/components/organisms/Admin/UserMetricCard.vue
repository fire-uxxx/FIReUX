<template>
  <div class="user-metrics-card">
    <h3>User Metrics</h3>
    <ul>
      <li>Total Users: {{ totalUsers }}</li>
      <li>Active Users: {{ activeUsers }}</li>
      <li>Premium Users: {{ premiumUsers }}</li>
      <li>Basic Users: {{ basicUsers }}</li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAdminMetrics } from '@/composables/admin/useAdminMetrics'

const { totalUsers, premiumUsers, basicUsers, activeUsers, fetchUserMetrics } = useAdminMetrics()

// Fetch metrics when the component mounts
onMounted(() => {
  fetchUserMetrics()
})
</script>

<style scoped>
.user-metrics-card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  max-width: 300px;
}
.user-metrics-card h3 {
  margin-bottom: 12px;
}
.user-metrics-card ul {
  list-style: none;
  padding: 0;
}
.user-metrics-card li {
  margin-bottom: 6px;
}
</style>