export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { title } = body

    if (!title || title.trim().length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Task title is required'
      })
    }

    const geminiApiKey = process.env.GEMINI_API_KEY
    if (!geminiApiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Gemini API key not configured'
      })
    }

    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate a detailed, professional task description for a project management system based on this task title: "${title}". 

The description should:
- Be 2-3 sentences long
- Include specific deliverables or outcomes
- Mention relevant technical aspects if applicable
- Be professional and clear
- Focus on what needs to be accomplished

Task title: ${title}`
          }]
        }],
      })
    })

    if (!response.ok) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to generate description'
      })
    }

    const data = await response.json()

    console.log(data.candidates[0].content)

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Invalid response from AI service'
      })
    }

    const description = data.candidates[0].content.parts[0].text.trim()

    return {
      success: true,
      description
    }

  } catch (error: any) {
    console.error('Gemini API error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to generate description'
    })
  }
})
