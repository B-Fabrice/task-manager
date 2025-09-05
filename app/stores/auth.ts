import { defineStore } from 'pinia'

export interface User {
  id: number
  email: string
  role: 'admin' | 'user'
  firstName: string
  lastName: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    isLoading: false
  }),

  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
    fullName: (state) => state.user ? `${state.user.firstName} ${state.user.lastName}` : '',
    initials: (state) => {
      if (!state.user) return ''
      return `${state.user.firstName?.[0] || ''}${state.user.lastName?.[0] || ''}`.toUpperCase()
    }
  },

  actions: {
    async login(email: string, password: string) {
      this.isLoading = true
      try {
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { email, password }
        })
        console.log('Login response:', response)
        if (response.success) {
          this.user = response.user as User
          this.isAuthenticated = true
          console.log('User:', this.user)
          return { success: true }
        }
      } catch (error: any) {
        return { 
          success: false, 
          error: error.data?.statusMessage || 'Login failed' 
        }
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      try {
        await $fetch('/api/auth/logout', {
          method: 'POST'
        })
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        this.user = null
        this.isAuthenticated = false
        await navigateTo('/login')
      }
    },

    async refreshToken() {
      try {
        const response = await $fetch('/api/auth/refresh', {
          method: 'POST'
        })

        if (response.success) {
          this.user = response.user as User
          this.isAuthenticated = true
          return true
        }
      } catch (error) {
        console.error('Token refresh failed:', error)
        this.user = null
        this.isAuthenticated = false
        return false
      }
    },

    async checkAuth() {
      this.isLoading = true
      try {
        const response = await $fetch('/api/auth/me')

        if (response.success) {
          this.user = response.user as User
          this.isAuthenticated = true
          return true
        }
      } catch (error: any) {
        console.error('Auth check error:', error)
        const refreshed = await this.refreshToken()
        if (!refreshed) {
          this.user = null
          this.isAuthenticated = false
        }
        return refreshed
      } finally {
        this.isLoading = false
      }
    },

    setUser(user: User) {
      this.user = user
      this.isAuthenticated = true
    },

    clearAuth() {
      this.user = null
      this.isAuthenticated = false
    }
  }
})
