import { defineStore } from 'pinia'

export interface Task {
  id: number
  title: string
  description: string
  status: 'To Do' | 'In Progress' | 'In Review' | 'Completed'
  assignedTo: number | null
  assignedToUser?: {
    id: number
    firstName: string
    lastName: string
    email: string
  }
  createdAt: string
  updatedAt: string
  deadline: string | null
  createdBy: number
  createdByUser?: {
    id: number
    firstName: string
    lastName: string
    email: string
  }
}

export interface TaskFilters {
  status: string
  search: string
  sortBy: 'createdAt' | 'updatedAt' | 'deadline' | 'title'
  sortOrder: 'asc' | 'desc'
}

export interface TasksState {
  tasks: Task[]
  users: Array<{
    id: number
    firstName: string
    lastName: string
    email: string
  }>
  filters: TaskFilters
  isLoading: boolean
  error: string | null
}

export const useTasksStore = defineStore('tasks', {
  state: (): TasksState => ({
    tasks: [],
    users: [],
    filters: {
      status: '',
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    },
    isLoading: false,
    error: null
  }),

  getters: {
    filteredTasks: (state) => {
      let filtered = [...state.tasks]

      // Filter by status
      if (state.filters.status) {
        filtered = filtered.filter(task => task.status === state.filters.status)
      }

      // Filter by search term
      if (state.filters.search) {
        const searchTerm = state.filters.search.toLowerCase()
        filtered = filtered.filter(task => 
          task.title.toLowerCase().includes(searchTerm) ||
          task.description.toLowerCase().includes(searchTerm)
        )
      }

      // Sort tasks
      filtered.sort((a, b) => {
        let aValue: any
        let bValue: any

        switch (state.filters.sortBy) {
          case 'title':
            aValue = a.title.toLowerCase()
            bValue = b.title.toLowerCase()
            break
          case 'createdAt':
            aValue = new Date(a.createdAt)
            bValue = new Date(b.createdAt)
            break
          case 'updatedAt':
            aValue = new Date(a.updatedAt)
            bValue = new Date(b.updatedAt)
            break
          case 'deadline':
            aValue = a.deadline ? new Date(a.deadline) : new Date(0)
            bValue = b.deadline ? new Date(b.deadline) : new Date(0)
            break
          default:
            return 0
        }

        if (aValue < bValue) return state.filters.sortOrder === 'asc' ? -1 : 1
        if (aValue > bValue) return state.filters.sortOrder === 'asc' ? 1 : -1
        return 0
      })

      return filtered
    },

    taskStats: (state) => {
      const total = state.tasks.length
      const completed = state.tasks.filter(task => task.status === 'Completed').length
      const inProgress = state.tasks.filter(task => task.status === 'In Progress').length
      const inReview = state.tasks.filter(task => task.status === 'In Review').length
      const toDo = state.tasks.filter(task => task.status === 'To Do').length

      return {
        total,
        completed,
        inProgress,
        inReview,
        toDo,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
      }
    }
  },

  actions: {
    async fetchTasks() {
      this.isLoading = true
      this.error = null
      try {
        const response = await $fetch('/api/tasks')
        if (response.success) {
          this.tasks = response.tasks
        }
      } catch (error: any) {
        this.error = error.data?.statusMessage || 'Failed to fetch tasks'
        console.error('Error fetching tasks:', error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchUsers() {
      try {
        const response = await $fetch('/api/users')
        if (response.success) {
          this.users = response.users
        }
      } catch (error: any) {
        console.error('Error fetching users:', error)
      }
    },

    async createTask(taskData: Partial<Task>) {
      this.isLoading = true
      this.error = null
      try {
        const response = await $fetch('/api/tasks', {
          method: 'POST',
          body: taskData
        })
        if (response.success) {
          this.tasks.unshift(response.task)
          return { success: true }
        }
      } catch (error: any) {
        this.error = error.data?.statusMessage || 'Failed to create task'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async updateTask(id: number, taskData: Partial<Task>) {
      this.isLoading = true
      this.error = null
      try {
        const response = await $fetch(`/api/tasks/${id}`, {
          method: 'PUT',
          body: taskData
        })
        if (response.success) {
          const index = this.tasks.findIndex(task => task.id === id)
          if (index !== -1) {
            this.tasks[index] = response.task
          }
          return { success: true }
        }
      } catch (error: any) {
        this.error = error.data?.statusMessage || 'Failed to update task'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async deleteTask(id: number) {
      this.isLoading = true
      this.error = null
      try {
        const response = await $fetch(`/api/tasks/${id}`, {
          method: 'DELETE'
        })
        if (response.success) {
          this.tasks = this.tasks.filter(task => task.id !== id)
          return { success: true }
        }
      } catch (error: any) {
        this.error = error.data?.statusMessage || 'Failed to delete task'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    setFilters(filters: Partial<TaskFilters>) {
      this.filters = { ...this.filters, ...filters }
    },

    clearError() {
      this.error = null
    }
  }
})
