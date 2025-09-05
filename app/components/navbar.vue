<script setup>
import { Moon, Sun, System } from './icons/index.js'
const colorMode = useColorMode()
const authStore = useAuthStore()
const themeValue = computed(() => colorMode.value)
const toggleTheme = () => {
  if (colorMode.value === 'dark') {
    colorMode.value = 'light'
  } else if (colorMode.value === 'light') {
    colorMode.value = 'system'
  } else {
    colorMode.value = 'dark'
  }
}
</script>

<template>
  <nav
    class="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <NuxtLink to="/">
              <h1 class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                TaskFlow
              </h1>
            </NuxtLink>
          </div>
        </div>
        <div class="flex items-center space-x-4">

          <button
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
            :title="currentTheme"
            @click="toggleTheme()"
          >
            <Moon v-if="themeValue === 'dark'" />
            <Sun v-else-if="themeValue === 'light'" />
            <System v-else />
          </button>

          <NuxtLink :to="authStore.isAuthenticated ? authStore.isAdmin ? '/admin' : '/dashboard' : '/login'">
            <AppButton
              variant="primary"
            >
              {{ authStore.isAuthenticated ? 'Dashboard' : 'Login' }}
            </AppButton>
          </NuxtLink>
          <!-- logout button  -->
          <AppButton v-if="authStore.isAuthenticated" variant="outline" @click="authStore.logout()">
            Logout
          </AppButton>
        </div>
      </div>
    </div>
  </nav>
</template>