export function useAppRead(app: Ref<App | null | undefined>) {
  const fullApp = computed(() => app.value)
  const hasAdmin = computed(
    () => Array.isArray(app.value?.admins) && app.value?.admins.length > 0
  )

  return {
    app: fullApp,
    hasAdmin
  }
}
