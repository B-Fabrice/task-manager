<script lang="ts" setup>
defineProps<{
    large?: boolean;
    variant: 'primary' | 'secondary' | 'outline' | 'white';
    disabled?: boolean;
    onClick?: () => void;
}>()
</script>

<template>
  <button
    :class="[
      {
        'px-8 py-4 text-lg': large,
      },
      {
        'bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl': variant === 'primary',
        'bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl': variant === 'secondary',
        'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200': variant === 'outline',
        'bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1': variant === 'white',
      }
    ]"
    :disabled="disabled"
    @click="onClick"
    >
    <slot />
  </button>
</template>