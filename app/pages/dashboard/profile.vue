<template>
  <client-only>
    <div v-if="user" class="dashboard-page-grid">
      <div class="dashboard-grid-section">
        <UCard>
          <template #default>
            <OrganismsUserEdit />
          </template>
        </UCard>
      </div>

      <div class="dashboard-grid-section">
        <UCard>
          <template #default>
            <OrganismsUserCell :user="user" />
          </template>
        </UCard>
      </div>

      <div class="dashboard-grid-section">
        <UCard>
          <template #default>
            <OrganismsUserSummary :user="user" />
          </template>
        </UCard>
      </div>
      <div class="dashboard-grid-section">
        <UCard>
          <template #default>
            <OrganismsUserFollows :user="user" />
          </template>
        </UCard>
      </div>
      <div class="dashboard-grid-section">
        <UCard>
          <template #default>
            <OrganismsUserNotifications :notifications="user.notifications" />
          </template>
        </UCard>
      </div>
    </div>
  </client-only>
</template>

<script setup>
const { label, icon } = getRouteMetaForPath('/dashboard/profile')

definePageMeta({
  layout: 'dashboard',
  layoutProps: {
    dashboardType: 'user-dashboard'
  },
  title: label,
  icon: icon
})

const { user } = useAppUser()
</script>
