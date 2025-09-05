<template>
  <div class="relative">
    <label v-if="label" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {{ label }}
    </label>
    
    <div class="relative">
              <select
          :value="modelValue"
          :disabled="disabled"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
          @change="$emit('update:modelValue', $event.target.value ? Number($event.target.value) : null)"
        >
        <option value="">Select a user...</option>
        <option
          v-for="user in users"
          :key="user.id"
          :value="user.id"
        >
          {{ user.firstName }} {{ user.lastName }} ({{ user.email }})
        </option>
      </select>
    </div>
    
    <p v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: number
  firstName: string
  lastName: string
  email: string
}

interface Props {
  modelValue: number | null
  users: User[]
  label?: string
  error?: string
  disabled?: boolean
}

defineProps<Props>()

defineEmits<{
  'update:modelValue': [value: number | null]
}>()
</script>
