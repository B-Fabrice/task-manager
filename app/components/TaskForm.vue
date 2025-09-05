<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black/60 overflow-y-auto h-full w-full z-50" @click="closeModal">
    <div class="relative p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white dark:bg-gray-800" @click.stop>
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ isEditing ? 'Edit Task' : 'Create New Task' }}
          </h3>
          <button
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            @click="closeModal"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Title -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter task title..."
            >
            <p v-if="errors.title" class="mt-1 text-sm text-red-600 dark:text-red-400">
              {{ errors.title }}
            </p>
          </div>

          <!-- Description -->
          <AppTextarea
            id="description"
            v-model="formData.description"
            label="Description"
            placeholder="Enter task description..."
            :rows="4"
            :show-ai-generator="!isEditing"
            :ai-title="formData.title"
          />

          <!-- Status and Assignment Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Status -->
            <div>
              <label for="status" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status *
              </label>
              <select
                id="status"
                v-model="formData.status"
                required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <!-- Assigned To -->
            <div>
              <UserSelector
                v-model="formData.assignedTo"
                :users="users"
                label="Assign To"
                :error="errors.assignedTo"
              />
            </div>
          </div>

          <!-- Deadline -->
          <div>
            <label for="deadline" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Deadline
            </label>
            <input
              id="deadline"
              v-model="formData.deadline"
              type="datetime-local"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div class="flex">
              <svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-sm text-red-700 dark:text-red-400">{{ error }}</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <AppButton
              type="button"
              variant="outline"
              :disabled="isLoading"
              @click="closeModal"
            >
              Cancel
            </AppButton>
            <AppButton
              type="submit"
              variant="primary"
              :disabled="isLoading"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              {{ isLoading ? 'Saving...' : (isEditing ? 'Update Task' : 'Create Task') }}
            </AppButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '../stores/tasks'
import { watch, computed, ref } from 'vue'

interface Props {
  isOpen: boolean
  task?: Task | null
  users: Array<{
    id: number
    firstName: string
    lastName: string
    email: string
  }>
  isLoading?: boolean
  error?: string | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  submit: [taskData: Partial<Task>]
}>()

const formData = ref({
  title: '',
  description: '',
  status: 'To Do' as 'To Do' | 'In Progress' | 'In Review' | 'Completed',
  assignedTo: null as number | null,
  deadline: ''
})

const errors = ref({
  title: '',
  assignedTo: ''
})

watch([() => props.isOpen, () => props.task], () => {
  if (props.isOpen) {
    if (props.task) {
      formData.value = {
        title: props.task.title,
        description: props.task.description,
        status: props.task.status,
        assignedTo: props.task.assignedTo,
        deadline: props.task.deadline ? new Date(props.task.deadline).toISOString().slice(0, 16) : ''
      }
    } else {
      formData.value = {
        title: '',
        description: '',
        status: 'To Do',
        assignedTo: null,
        deadline: ''
      }
    }
    errors.value = { title: '', assignedTo: '' }
  }
}, { immediate: true })

const isEditing = computed(() => !!props.task)

const closeModal = () => {
  emit('close')
}

const validateForm = () => {
  errors.value = { title: '', assignedTo: '' }
  let isValid = true

  if (!formData.value.title.trim()) {
    errors.value.title = 'Title is required'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) return

  let formattedDeadline = null
  if (formData.value.deadline) {
    
    const localDate = new Date(formData.value.deadline)
    formattedDeadline = localDate.toISOString()
  }

  const taskData: Partial<Task> = {
    title: formData.value.title.trim(),
    description: formData.value.description.trim(),
    status: formData.value.status,
    assignedTo: formData.value.assignedTo,
    deadline: formattedDeadline
  }

  console.log('TaskForm - deadline input:', formData.value.deadline)
  console.log('TaskForm - formatted deadline:', formattedDeadline)

  emit('submit', taskData)
}
</script>
