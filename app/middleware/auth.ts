export default defineNuxtRouteMiddleware(() => {
  const { $pinia } = useNuxtApp()
  const authStore = useAuthStore($pinia)

  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})
