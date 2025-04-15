<template>
  <client-only>
    <pre>{{ usersCollection }}</pre>

    <div class="dashboard-page-grid">
      <!-- Subscription Metrics Card -->
      <div class="dashboard-grid-section">
        <UCard>
          <template #default>
            <h3>Subscription Metrics</h3>
            <div v-if="loading">Loading metrics...</div>
            <div v-else-if="error">
              <p>Error loading metrics: {{ error.message }}</p>
            </div>
            <div v-else>
              <p>Total Users: {{ totalUsers }}</p>
              <p>Standard Users: {{ standardCount }}</p>
              <p>Pro Users: {{ proCount }}</p>
              <p>No Subscription: {{ noSubscriptionCount }}</p>
            </div>
          </template>
        </UCard>
      </div>
    </div>
  </client-only>
</template>

<script setup lang="ts">
  // These functions/types are assumed to be auto-imported: 
  // useAdminMetrics, getRouteMetaForPath, definePageMeta, and User.
  const { totalUsers, standardCount, proCount, noSubscriptionCount, loading, error } = useAdminMetrics()

  // Retrieve the 'users' collection via the generic Firestore fetch function.
  const { collectionData: usersCollection } = useGenericFirestoreCollection<User>('users')

  const { label, icon } = getRouteMetaForPath('/dashboard/admin')

  definePageMeta({
    layout: 'dashboard',
    layoutProps: { dashboardType: 'admin-dashboard' },
    title: label,
    icon: icon
  })
</script>