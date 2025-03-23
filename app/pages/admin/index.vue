<template>
  <client-only>
    <div class="dashboard-page-grid">
      <div class="dashboard-grid-section">
        <UCard>
          <template #default>
            <OrganismsAdminMetricUsers />
          </template>
        </UCard>
      </div>
      <div class="dashboard-grid-section">
        <UCard>
          <template #default>
            <OrganismsAdminMetricProducts />
          </template>
        </UCard>
      </div>
      <div class="dashboard-grid-section">
        <UCard>
          <template #default>
            <OrganismsAdminMetricBlogs />
          </template>
        </UCard>
      </div>
      <div class="dashboard-grid-section">
        <UCard>
          <template #default>
            <OrganismsAdminMetricRevenue />
          </template>
        </UCard>
      </div>
      <div class="dashboard-grid-section">
        <UCard>
          <template #default>
            <OrganismsAdminMetricSessions />
          </template>
        </UCard>
      </div>
      <div class="dashboard-grid-section">
        <UCard>
          <template #default>
            <OrganismsAdminMetricReferrals />
          </template>
        </UCard>
      </div>
    </div>
  </client-only>
</template>

<script setup>
const { label, icon } = getRouteMetaForPath('/dashboard/admin')

definePageMeta({
  layout: 'dashboard',
  layoutProps: {
    dashboardType: 'admin-dashboard'
  },
  title: label,
  icon: icon
})
</script>