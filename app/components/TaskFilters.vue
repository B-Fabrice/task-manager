<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <!-- Search -->
      <div class="flex-1 max-w-md">
        <label for="search" class="sr-only">Search tasks</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            id="search"
            v-model="localFilters.search"
            type="text"
            placeholder="Search by title or description..."
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
        </div>
      </div>

      <!-- Filters Row -->
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Status Filter -->
        <div class="min-w-0 flex-1 sm:flex-none">
          <label for="status" class="sr-only">Filter by status</label>
          <select
            id="status"
            v-model="localFilters.status"
            class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <!-- Sort By -->
        <div class="min-w-0 flex-1 sm:flex-none">
          <label for="sortBy" class="sr-only">Sort by</label>
          <select
            id="sortBy"
            v-model="localFilters.sortBy"
            class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="createdAt">Created Date</option>
            <option value="updatedAt">Updated Date</option>
            <option value="deadline">Deadline</option>
            <option value="title">Title</option>
          </select>
        </div>

        <!-- Sort Order -->
        <div class="min-w-0 flex-1 sm:flex-none">
          <label for="sortOrder" class="sr-only">Sort order</label>
          <select
            id="sortOrder"
            v-model="localFilters.sortOrder"
            class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        <!-- Clear Filters -->
        <button
          class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          @click="clearFilters"
        >
          Clear
        </button>
      </div>
    </div>

    <!-- Active Filters Display -->
    <div v-if="hasActiveFilters" class="mt-4 flex flex-wrap gap-2">
      <span class="text-sm text-gray-500 dark:text-gray-400">Active filters:</span>
      
      <span
        v-if="localFilters.status"
        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      >
        Status: {{ localFilters.status }}
        <button
          class="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
          @click="localFilters.status = ''"
        >
          <svg class="w-2 h-2" fill="currentColor" viewBox="0 0 8 8">
            <path d="m0 0 2 2 2-2 1 1-2 2 2 2-1 1-2-2-2 2-1-1 2-2-2-2z"/>
          </svg>
        </button>
      </span>
      
      <span
        v-if="localFilters.search"
        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      >
        Search: "{{ localFilters.search }}"
        <button
          class="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-green-200 dark:hover:bg-green-800"
          @click="localFilters.search = ''"
        >
          <svg class="w-2 h-2" fill="currentColor" viewBox="0 0 8 8">
            <path d="m0 0 2 2 2-2 1 1-2 2 2 2-1 1-2-2-2 2-1-1 2-2-2-2z"/>
          </svg>
        </button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TaskFilters } from '../stores/tasks'
import { watch, computed, ref } from 'vue'

interface Props {
  filters: TaskFilters
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:filters': [filters: TaskFilters]
}>()

const localFilters = ref<TaskFilters>({ ...props.filters })

// Watch for changes and emit updates
watch(localFilters, (newFilters) => {
  emit('update:filters', { ...newFilters })
}, { deep: true })

// Watch for external changes
watch(() => props.filters, (newFilters) => {
  localFilters.value = { ...newFilters }
}, { deep: true })

const hasActiveFilters = computed(() => {
  return localFilters.value.status !== '' || localFilters.value.search !== ''
})

const clearFilters = () => {
  localFilters.value = {
    status: '',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  }
}
</script>
