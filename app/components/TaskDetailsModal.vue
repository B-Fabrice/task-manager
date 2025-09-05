<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black/60 overflow-y-auto h-full w-full z-50" @click="closeModal">
    <div class="relative p-6 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800" @click.stop>
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Task Details
          </h3>
          <button
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            @click="closeModal"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Task Content -->
        <div v-if="task" class="space-y-6">
          <!-- Title -->
          <div>
            <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {{ task.title }}
            </h4>
          </div>

          <!-- Description -->
          <div v-if="task.description">
            <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </h5>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <p class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {{ task.description }}
              </p>
            </div>
          </div>

          <!-- Task Info Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Status -->
            <div>
              <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </h5>
              <span 
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                :class="getStatusClasses(task.status)"
              >
                {{ task.status }}
              </span>
            </div>

            <!-- Deadline -->
            <div v-if="task.deadline">
              <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Deadline
              </h5>
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-sm text-gray-900 dark:text-white">
                  {{ formatDate(task.deadline) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Timestamps -->
          <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div>
                <span class="font-medium">Created:</span> {{ formatDate(task.createdAt) }}
              </div>
              <div>
                <span class="font-medium">Last Updated:</span> {{ formatDate(task.updatedAt) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
          <AppButton
            type="button"
            variant="outline"
            @click="closeModal"
          >
            Close
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Task {
  id: number
  title: string
  description: string
  status: string
  assignedTo: number | null
  assignedUser?: {
    firstName: string
    lastName: string
    email: string
  } | null
  createdBy: number
  createdByUser?: {
    firstName: string
    lastName: string
    email: string
  } | null
  deadline: string | null
  createdAt: string
  updatedAt: string
}

interface Props {
  isOpen: boolean
  task: Task | null
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const closeModal = () => {
  emit('close')
}

const getStatusClasses = (status: string) => {
  const statusClasses = {
    'To Do': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'In Review': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  }
  return statusClasses[status as keyof typeof statusClasses] || statusClasses['To Do']
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'Not set'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
