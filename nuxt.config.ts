import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Inter: [300, 400, 500, 600, 700, 800, 900],
        },
        display: 'swap',
      },
    ],
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})