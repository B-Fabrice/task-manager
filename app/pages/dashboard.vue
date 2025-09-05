<script setup>
import { List, Done, Process, Chatting, Archive, Info } from '@/components/icons/index.js'

const authStore = useAuthStore()
const userTasksStore = useUserTasksStore()

definePageMeta({
  middleware: 'auth'
})

useHead({
  title: 'Dashboard - TaskFlow',
  meta: [
    {
      name: 'description',
      content: 'TaskFlow dashboard - Manage your tasks efficiently.'
    },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// Fetch user tasks on mount
onMounted(async () => {
  await userTasksStore.fetchMyTasks()
})

// Computed
const stats = computed(() => [
  {
    icon: List,
    title: 'My Tasks',
    value: userTasksStore.taskStats.total,
    color: 'blue'
  },
  {
    icon: Done,
    title: 'Completed',
    value: userTasksStore.taskStats.completed,
    color: 'green'
  },
  {
    icon: Process,
    title: 'In Progress',
    value: userTasksStore.taskStats.inProgress,
    color: 'yellow'
  },
  {
    icon: Chatting,
    title: 'In Review',
    value: userTasksStore.taskStats.inReview,
    color: 'purple'
  },
  {
    icon: Archive,
    title: 'To Do',
    value: userTasksStore.taskStats.toDo,
    color: 'gray'
  }
])

const tasks = computed(() => userTasksStore.tasks)
const isLoading = computed(() => userTasksStore.isLoading)
const error = computed(() => userTasksStore.error)

// Methods
const handleUpdateStatus = async (task, newStatus) => {
  try {
    await userTasksStore.updateTaskStatus(task.id, newStatus)
  } catch (error) {
    console.error('Error updating task status:', error)
  }
}

// Clear error when component unmounts
onUnmounted(() => {
  userTasksStore.clearError()
})
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300"
  >
    <NavBar />

    <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <h1
            class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2"
          >
            Welcome back, {{ authStore.fullName }}!
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            Here are your assigned tasks and progress.
          </p>
        </div>

        <div
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div
                class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
              >
                <span
                  class="text-2xl font-bold text-blue-600 dark:text-blue-400"
                >
                  {{ authStore.initials }}
                </span>
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ authStore.fullName }}
                </h2>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ authStore.user?.email }}
                </p>
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1"
                  :class="
                    authStore.isAdmin
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  "
                >
                  {{ authStore.user?.role }}
                </span>
              </div>
            </div>
            <AppButton variant="outline" @click="authStore.logout()">
              Logout
            </AppButton>
          </div>
        </div>

        <!-- Error Alert -->
        <div v-if="error" class="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div class="flex">
            <Info />
            <p class="text-sm text-red-700 dark:text-red-400">{{ error }}</p>
            <button class="ml-auto text-red-400 hover:text-red-600" @click="userTasksStore.clearError()">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div v-for="stat in stats" :key="stat.title" class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center">
              <div class="p-2 rounded-lg" :class="`bg-${stat.color}-100 dark:bg-${stat.color}-900`">
                <component :is="stat.icon" class="w-6 h-6" :class="`text-${stat.color}-600 dark:text-${stat.color}-400`" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600 dark:text-gray-300">{{ stat.title }}</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ stat.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- My Tasks -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              My Assigned Tasks
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Tasks assigned to you. You can update the status but cannot complete tasks (admin only).
            </p>
          </div>
          
          <div v-if="isLoading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>

          <div v-else-if="tasks.length === 0" class="p-6">
            <div class="text-center py-12">
              <svg
                class="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                No tasks assigned
              </h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                You don't have any tasks assigned to you yet.
              </p>
            </div>
          </div>

          <div v-else class="p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <UserTaskCard
                v-for="task in tasks"
                :key="task.id"
                :task="task"
                @update-status="handleUpdateStatus"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
