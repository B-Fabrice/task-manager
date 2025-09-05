import { defineStore } from 'pinia'
import type { Task } from './tasks'

export interface UserTasksState {
  tasks: Task[]
  isLoading: boolean
  error: string | null
}

export const useUserTasksStore = defineStore('userTasks', {
  state: (): UserTasksState => ({
    tasks: [],
    isLoading: false,
    error: null
  }),

  getters: {
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
    async fetchMyTasks() {
      this.isLoading = true
      this.error = null
      try {
        const response = await $fetch('/api/tasks/my-tasks')
        if (response.success) {
          this.tasks = response.tasks
        }
      } catch (error: any) {
        this.error = error.data?.statusMessage || 'Failed to fetch your tasks'
        console.error('Error fetching user tasks:', error)
      } finally {
        this.isLoading = false
      }
    },

    async updateTaskStatus(id: number, status: string) {
      this.isLoading = true
      this.error = null
      try {
        const response = await $fetch(`/api/tasks/${id}`, {
          method: 'PUT',
          body: { status }
        })
        if (response.success) {
          const index = this.tasks.findIndex(task => task.id === id)
          if (index !== -1) {
            this.tasks[index] = response.task
          }
          return { success: true }
        }
      } catch (error: any) {
        this.error = error.data?.statusMessage || 'Failed to update task status'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    clearError() {
      this.error = null
    }
  }
})
