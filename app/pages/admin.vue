<script setup>
import { Add, Info, List, Archive, Done, Process, Chatting } from '@/components/icons/index.js'
const authStore = useAuthStore()
const tasksStore = useTasksStore()

definePageMeta({
  middleware: ['auth', 'admin']
})

useHead({
  title: 'Admin Dashboard - TaskFlow',
  meta: [
    {
      name: 'description',
      content: 'TaskFlow admin dashboard - Manage users and tasks efficiently.'
    },
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// Check if user is admin
if (!authStore.isAdmin) {
  throw createError({
    statusCode: 403,
    statusMessage: 'Access denied. Admin privileges required.'
  })
}

// State
const showTaskForm = ref(false)
const editingTask = ref(null)
const deletingTask = ref(null)
const showDeleteConfirm = ref(false)

// Fetch data on mount
onMounted(async () => {
  await Promise.all([
    tasksStore.fetchTasks(),
    tasksStore.fetchUsers()
  ])
})

// Computed
const stats = computed(() => [
  {
    icon: List,
    title: 'Total Tasks',
    value: tasksStore.taskStats.total,
    color: 'blue'
  },
  {
    icon: Done,
    title: 'Completed',
    value: tasksStore.taskStats.completed,
    color: 'green'
  },
  {
    icon: Process,
    title: 'In Progress',
    value: tasksStore.taskStats.inProgress,
    color: 'yellow'
  },
  {
    icon: Chatting,
    title: 'In Review',
    value: tasksStore.taskStats.inReview,
    color: 'purple'
  },
  {
    icon: Archive,
    title: 'To Do',
    value: tasksStore.taskStats.toDo,
    color: 'gray'
  }
])
const filteredTasks = computed(() => tasksStore.filteredTasks)
const isLoading = computed(() => tasksStore.isLoading)
const error = computed(() => tasksStore.error)

// Methods
const openCreateTask = () => {
  editingTask.value = null
  showTaskForm.value = true
}

const openEditTask = (task) => {
  editingTask.value = task
  showTaskForm.value = true
}

const closeTaskForm = () => {
  showTaskForm.value = false
  editingTask.value = null
}

const handleTaskSubmit = async (taskData) => {
  try {
    if (editingTask.value) {
      await tasksStore.updateTask(editingTask.value.id, taskData)
    } else {
      await tasksStore.createTask(taskData)
    }
    closeTaskForm()
  } catch (error) {
    console.error('Error saving task:', error)
  }
}

const confirmDeleteTask = (task) => {
  deletingTask.value = task
  showDeleteConfirm.value = true
}

const handleDeleteTask = async () => {
  if (!deletingTask.value) return
  
  try {
    await tasksStore.deleteTask(deletingTask.value.id)
    showDeleteConfirm.value = false
    deletingTask.value = null
  } catch (error) {
    console.error('Error deleting task:', error)
  }
}

const handleUpdateStatus = async (task, newStatus) => {
  try {
    await tasksStore.updateTask(task.id, { status: newStatus })
  } catch (error) {
    console.error('Error updating task status:', error)
  }
}

const handleFiltersUpdate = (filters) => {
  tasksStore.setFilters(filters)
}

// Clear error when component unmounts
onUnmounted(() => {
  tasksStore.clearError()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
    <NavBar />

    <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Admin Dashboard
              </h1>
              <p class="text-lg text-gray-600 dark:text-gray-300">
                Manage users and tasks across your organization.
              </p>
            </div>
            <AppButton variant="primary" @click="openCreateTask">
              <span class="flex items-center space-x-2">
                <Add />
                <span>Create Task</span>
              </span>
            </AppButton>
          </div>
        </div>

        <!-- Error Alert -->
        <div v-if="error" class="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div class="flex">
            <Info />
            <p class="text-sm text-red-700 dark:text-red-400">{{ error }}</p>
            <button class="ml-auto text-red-400 hover:text-red-600" @click="tasksStore.clearError()">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div v-for="stat in stats" :key="stat.title" class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center">
              <div class="p-2 rounded-lg" :class="`bg-${stat.color} dark:bg-${stat.color} text-black dark:text-white`">
                <component :is="stat.icon" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600 dark:text-gray-300">{{ stat.title }}</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ stat.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <TaskFilters
          :filters="tasksStore.filters"
          @update:filters="handleFiltersUpdate"
        />

        <!-- Tasks Grid -->
        <div v-if="isLoading" class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <div v-else-if="filteredTasks.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No tasks found</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {{ tasksStore.filters.search || tasksStore.filters.status ? 'Try adjusting your filters.' : 'Get started by creating your first task.' }}
          </p>
          <div v-if="!tasksStore.filters.search && !tasksStore.filters.status" class="mt-6">
            <AppButton variant="primary" @click="openCreateTask">Create Task</AppButton>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <TaskCard
            v-for="task in filteredTasks"
            :key="task.id"
            :task="task"
            @edit="openEditTask"
            @delete="confirmDeleteTask"
            @update-status="handleUpdateStatus"
          />
        </div>
      </div>
    </div>

    <!-- Task Form Modal -->
    <TaskForm
      v-if="showTaskForm"
      :is-open="showTaskForm"
      :task="editingTask"
      :users="tasksStore.users"
      :is-loading="isLoading"
      :error="error"
      @close="closeTaskForm"
      @submit="handleTaskSubmit"
    />

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="showDeleteConfirm = false">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800" @click.stop>
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
            <svg class="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mt-4">Delete Task</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Are you sure you want to delete "{{ deletingTask?.title }}"? This action cannot be undone.
            </p>
          </div>
          <div class="flex items-center justify-center space-x-3 mt-4">
            <AppButton variant="outline" @click="showDeleteConfirm = false">
              Cancel
            </AppButton>
            <AppButton variant="primary" class="bg-red-600 hover:bg-red-700" @click="handleDeleteTask">
              Delete
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
