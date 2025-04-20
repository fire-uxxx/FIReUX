
export function useUserMetrics() {
  const { userCollection } = useUser()

  return {
    totalUsers: computed(() => userCollection.value?.length ?? 0),
    activeUsers: computed(
      () => userCollection.value?.filter(user => user.is_active).length ?? 0
    ),
    adminUsers: computed(
      () =>
        userCollection.value?.filter(user => user.role === 'admin').length ?? 0
    ),
    standardSubscriptions: computed(
      () =>
        userCollection.value?.filter(
          user => user.subscription?.plan === 'standard'
        ).length ?? 0
    ),
    proSubscriptions: computed(
      () =>
        userCollection.value?.filter(user => user.subscription?.plan === 'pro')
          .length ?? 0
    ),
    averageProfileCompletion: computed(() => {
      const completions =
        userCollection.value?.map(user => user.profile_completion ?? 0) ?? []
      return completions.length > 0
        ? completions.reduce((a, b) => a + b, 0) / completions.length
        : 0
    })
  }
}
