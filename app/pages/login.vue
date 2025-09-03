<script lang="ts" setup>
import { ref } from 'vue'
import { Loading } from '../components/icons/index.js'

// Form data
const email = ref('')
const password = ref('')
const isLoading = ref(false)

// Form validation
const emailError = ref('')
const passwordError = ref('')
const formError = ref('')

// Validation functions
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateForm = () => {
  emailError.value = ''
  passwordError.value = ''
  formError.value = ''
  
  let isValid = true
  
  if (!email.value) {
    emailError.value = 'Email is required'
    isValid = false
  } else if (!validateEmail(email.value)) {
    emailError.value = 'Please enter a valid email address'
    isValid = false
  }
  
  if (!password.value) {
    passwordError.value = 'Password is required'
    isValid = false
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters'
    isValid = false
  }
  
  return isValid
}

// Handle form submission
const handleLogin = async () => {
  if (!validateForm()) return
  
  isLoading.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Here you would typically make an API call to authenticate
    console.log('Login attempt:', { email: email.value, password: password.value })
    
    // Redirect to dashboard or show success message
    // await navigateTo('/dashboard')
    
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}

// SEO Meta tags
useHead({
  title: 'Login - TaskFlow',
  meta: [
    { name: 'description', content: 'Sign in to your TaskFlow account to manage your team\'s tasks efficiently.' },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
    <!-- Navigation -->
    <NavBar />

    <!-- Login Form Section -->
    <div class="flex items-center justify-center min-h-screen pt-16">
      <div class="max-w-md w-full mx-4">
        <div class="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <!-- Header -->
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h2>
            <p class="text-gray-600 dark:text-gray-300">
              Sign in to your TaskFlow account
            </p>
          </div>

          <!-- Login Form -->
          <form class="space-y-6" @submit.prevent="handleLogin">
            <!-- Email Input -->
            <AppInput
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              required
              :error="emailError"
              placeholder="Enter your email"
              label="Email Address"
            />

            <!-- Password Input -->
            <AppInput
              id="password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              required
              :error="passwordError"
              placeholder="Enter your password"
              label="Password"
            />

            <!-- Login Button -->
            <AppButton
              type="submit"
              :disabled="isLoading"
              variant="primary"
              large
              full
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <Loading />
                Signing In...
              </span>
              <span v-else>Sign In</span>
            </AppButton>
            <p v-if="formError" class="mt-1 text-sm text-red-600 dark:text-red-400 text-center">
                {{ formError }}
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
