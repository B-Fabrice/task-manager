// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      indent: ['error', 2],
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'comma-dangle': ['error', 'never'],
      'jsx-quotes': ['error', 'prefer-single']
    }
  }
)
