<script lang="ts" setup>
defineProps<{
  feature: Feature;
}>();
</script>

<template>
  <div
    class="bg-gradient-to-br from-white to-soft-gray dark:from-slate dark:to-graphite p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
  >
    <div
      class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6"
    >
  <component :is="feature.icon" />
    </div>
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
      {{ feature.title }}
    </h3>
    <p class="text-gray-600 dark:text-gray-300">
      {{ feature.description }}
    </p>
  </div>
</template>