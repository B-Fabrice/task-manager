export default defineNuxtPlugin(async () => {
  const { $pinia } = useNuxtApp()
  const authStore = useAuthStore($pinia)

  await authStore.checkAuth()
})
