<script lang="ts" setup>
defineProps<{
  id?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  type?: string;
  modelValue?: string;
  label?: string;
}>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {{ label }}
    </label>
  <input
    :id="id"
    :value="modelValue"
    :type="type"
    :required="required"
    :placeholder="placeholder"
    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200"
    :class="{ 'border-red-500 focus:ring-red-500': error }"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
  >
  <p v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">
    {{ error }}
  </p>
  </div>
</template>