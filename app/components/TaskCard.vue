<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
    <div class="p-6">
      <!-- Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {{ task.title }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
            {{ task.description || 'No description provided' }}
          </p>
        </div>
        
        <!-- Status Badge -->
        <span
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-4 flex-shrink-0"
          :class="statusClasses"
        >
          {{ task.status }}
        </span>
      </div>

      <!-- Task Details -->
      <div class="space-y-3 mb-4">
        <!-- Assigned User -->
        <div v-if="task.assignedToUser" class="flex items-center">
          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
            <span class="text-sm font-medium text-blue-600 dark:text-blue-400">
              {{ task.assignedToUser.firstName[0] }}{{ task.assignedToUser.lastName[0] }}
            </span>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900 dark:text-white">
              {{ task.assignedToUser.firstName }} {{ task.assignedToUser.lastName }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ task.assignedToUser.email }}
            </p>
          </div>
        </div>
        
        <div v-else class="flex items-center text-gray-500 dark:text-gray-400 pb-5">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="text-sm">Unassigned</span>
        </div>

        <!-- Deadline -->
        <div v-if="task.deadline" class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span 
            class="text-sm"
            :class="deadlineClasses"
          >
            Due {{ formatDate(task.deadline) }}
          </span>
        </div>
        <div v-else class="flex items-center text-gray-500 dark:text-gray-400 pb-4"/>

        <!-- Created Info -->
        <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Created {{ formatDate(task.createdAt) }}</span>
          <span v-if="task.updatedAt !== task.createdAt" class="ml-2">
            • Updated {{ formatDate(task.updatedAt) }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div class="flex space-x-2 justify-end w-full">
          <AppButton
            variant="outline"
            size="sm"
            @click="$emit('edit', task)"
          >
            <span class="flex items-center gap-x-2">
              <Edit />
              <span>Edit</span>
            </span>
          </AppButton>
          
          <AppButton
            variant="outline"
            size="sm"
            class="text-red-600 hover:text-red-700 hover:border-red-300"
            @click="$emit('delete', task)"
          >
            <span class="flex items-center gap-x-2">
              <Delete />
              <span>Delete</span>
            </span>
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '../stores/tasks'
import Edit from './icons/Edit.vue'
import Delete from './icons/Delete.vue'
import { computed } from 'vue'

interface Props {
  task: Task
}

const props = defineProps<Props>()

defineEmits<{
  edit: [task: Task]
  delete: [task: Task]
  updateStatus: [task: Task, status: string]
}>()

const statusClasses = computed(() => {
  const status = props.task.status
  switch (status) {
  case 'To Do':
    return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  case 'In Progress':
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  case 'In Review':
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
  case 'Completed':
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  default:
    return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }
})

const deadlineClasses = computed(() => {
  if (!props.task.deadline) return 'text-gray-500 dark:text-gray-400'
  
  const deadline = new Date(props.task.deadline)
  const now = new Date()
  const diffTime = deadline.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'text-red-600 dark:text-red-400 font-medium'
  if (diffDays <= 3) return 'text-yellow-600 dark:text-yellow-400 font-medium'
  return 'text-gray-500 dark:text-gray-400'
})

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'today'
  if (diffDays === 1) return 'tomorrow'
  if (diffDays === -1) return 'yesterday'
  if (diffDays > 0) return `in ${diffDays} days`
  if (diffDays < 0) return `${Math.abs(diffDays)} days ago`
  
  return date.toLocaleDateString()
}
</script>
