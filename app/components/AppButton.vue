<script lang="ts" setup>
defineProps<{
    large?: boolean;
    variant: 'primary' | 'secondary' | 'outline' | 'white';
    disabled?: boolean;
    type?: 'submit' | 'button' | 'reset';
    full?: boolean;
    onClick?: () => void;
}>()
</script>

<template>
  <button
    :class="[
      'disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors duration-200',
      {
        'px-8 py-4 text-lg': large,
        'w-full': full,
        'bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 shadow-lg hover:shadow-xl': variant === 'primary',
        'bg-secondary-600 hover:bg-secondary-700 text-white px-6 py-2 shadow-lg hover:shadow-xl': variant === 'secondary',
        'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2': variant === 'outline',
        'bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1': variant === 'white',
      },
    ]"
    :disabled="disabled"
    :type="type"
    @click="onClick"
    >
    <slot />
  </button>
</template>