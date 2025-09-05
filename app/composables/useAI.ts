export const useAI = () => {
  const isGenerating = ref(false)
  const error = ref('')

  const generateTaskDescription = async (title: string): Promise<string | null> => {
    if (!title || title.trim().length === 0) {
      error.value = 'Task title is required'
      return null
    }

    isGenerating.value = true
    error.value = ''

    try {
      const response = await $fetch('/api/ai/generate-description', {
        method: 'POST',
        body: { title: title.trim() }
      })

      if (response.success) {
        return response.description
      } else {
        error.value = 'Failed to generate description'
        return null
      }
    } catch (err: any) {
      console.error('AI generation error:', err)
      error.value = err.data?.statusMessage || 'Failed to generate description'
      return null
    } finally {
      isGenerating.value = false
    }
  }

  const clearError = () => {
    error.value = ''
  }

  return {
    isGenerating: readonly(isGenerating),
    error: readonly(error),
    generateTaskDescription,
    clearError
  }
}
