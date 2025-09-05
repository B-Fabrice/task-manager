export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()
  
  // Check if user is authenticated
  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
  
  // Check if user is admin
  if (!authStore.isAdmin) {
    return navigateTo('/dashboard')
  }
})
