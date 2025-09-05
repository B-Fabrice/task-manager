<script lang="ts" setup>
import AI from './icons/AI.vue'

interface Props {
  id?: string
  placeholder?: string
  error?: string
  required?: boolean
  modelValue?: string
  label?: string
  rows?: number
  disabled?: boolean
  showAIGenerator?: boolean
  aiTitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  rows: 4,
  showAIGenerator: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'ai-generate': [title: string]
}>()

const { isGenerating, error: aiError, generateTaskDescription, clearError } = useAI()

const handleAIGenerate = async () => {
  if (!props.aiTitle || props.aiTitle.trim().length === 0) {
    return
  }

  clearError()
  const description = await generateTaskDescription(props.aiTitle)
  
  if (description) {
    emit('update:modelValue', description)
  }
}

// Clear AI error when component unmounts
onUnmounted(() => {
  clearError()
})
</script>

<template>
  <div>
    <label 
      v-if="label" 
      :for="id" 
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    >
      {{ label }}
    </label>
    
    <div class="relative">
      <textarea
        :id="id"
        :value="modelValue"
        :required="required"
        :placeholder="placeholder"
        :rows="rows"
        :disabled="disabled"
        class="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-200 resize-none"
        :class="{ 
          'border-red-500 focus:ring-red-500': error,
          'opacity-50 cursor-not-allowed': disabled
        }"
        @input="emit('update:modelValue', $event.target?.value || '')"
      />
      
      <!-- AI Generate Button -->
      <button
        v-if="aiTitle"
        type="button"
        :disabled="isGenerating || !aiTitle?.trim() || disabled"
        class="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        :title="isGenerating ? 'Generating description...' : 'Generate description with AI'"
        @click="handleAIGenerate"
      >
        <AI 
          :class="{ 
            'animate-spin': isGenerating,
            'text-blue-600 dark:text-blue-400': isGenerating
          }"
        />
      </button>
    </div>
    
    <!-- Error Messages -->
    <p v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">
      {{ error }}
    </p>
    
    <p v-if="aiError" class="mt-1 text-sm text-red-600 dark:text-red-400">
      {{ aiError }}
    </p>
    
    <!-- AI Generation Status -->
    <p v-if="isGenerating" class="mt-1 text-sm text-blue-600 dark:text-blue-400">
      Generating description with AI...
    </p>
  </div>
</template>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
