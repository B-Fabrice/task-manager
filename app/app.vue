<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <NuxtRouteAnnouncer />
    
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <h1 class="text-2xl font-bold text-blue-600 dark:text-blue-400">TaskFlow</h1>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Streamline Your Team's
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
              Task Management
            </span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-up">
            The modern task management platform that helps teams collaborate efficiently, 
            track progress seamlessly, and achieve their goals faster than ever before.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Get Started Free
            </button>
            <button class="border-2 border-primary-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need to Manage Tasks
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Powerful features designed to boost productivity and streamline collaboration
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-gradient-to-br from-white to-soft-gray dark:from-slate dark:to-graphite p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Smart Task Organization</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Organize tasks with custom categories, priorities, and due dates. Never miss a deadline again.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-gradient-to-br from-white to-soft-gray dark:from-slate dark:to-graphite p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Team Collaboration</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Assign tasks, share updates, and collaborate seamlessly with your team members in real-time.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-gradient-to-br from-white to-soft-gray dark:from-slate dark:to-graphite p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Progress Tracking</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Visualize your team's progress with intuitive dashboards and detailed analytics.
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="bg-gradient-to-br from-white to-soft-gray dark:from-slate dark:to-graphite p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Mobile Ready</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Access your tasks anywhere, anytime with our fully responsive mobile interface.
            </p>
          </div>

          <!-- Feature 5 -->
          <div class="bg-gradient-to-br from-white to-soft-gray dark:from-slate dark:to-graphite p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Secure & Reliable</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Enterprise-grade security with 99.9% uptime guarantee to keep your data safe.
            </p>
          </div>

          <!-- Feature 6 -->
          <div class="bg-gradient-to-br from-white to-soft-gray dark:from-slate dark:to-graphite p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-6">
              <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Lightning Fast</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Built with modern technology for blazing fast performance and instant updates.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-primary-700 dark:to-primary-900">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Team's Productivity?
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          Join thousands of teams already using TaskFlow to manage their projects more efficiently.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button class="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Start Free Trial
          </button>
          <button class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
            Contact Sales
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 dark:bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="col-span-1 md:col-span-2">
            <h3 class="text-2xl font-bold text-blue-400 mb-4">TaskFlow</h3>
            <p class="text-gray-400 mb-4">
              The modern task management platform that helps teams collaborate efficiently and achieve their goals.
            </p>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Product</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-semibold mb-4">Support</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TaskFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// SEO Meta tags
useHead({
  title: 'TaskFlow - Modern Task Management Platform',
  meta: [
    { name: 'description', content: 'Streamline your team\'s task management with TaskFlow. The modern platform that helps teams collaborate efficiently, track progress seamlessly, and achieve their goals faster.' },
    { name: 'keywords', content: 'task management, team collaboration, project management, productivity, workflow, team tasks' },
    { name: 'author', content: 'TaskFlow Team' },
    { name: 'robots', content: 'index, follow' },
    
    // Open Graph
    { property: 'og:title', content: 'TaskFlow - Modern Task Management Platform' },
    { property: 'og:description', content: 'Streamline your team\'s task management with TaskFlow. The modern platform that helps teams collaborate efficiently, track progress seamlessly, and achieve their goals faster.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://taskflow.com' },
    { property: 'og:image', content: 'https://taskflow.com/og-image.jpg' },
    { property: 'og:site_name', content: 'TaskFlow' },
    
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'TaskFlow - Modern Task Management Platform' },
    { name: 'twitter:description', content: 'Streamline your team\'s task management with TaskFlow. The modern platform that helps teams collaborate efficiently, track progress seamlessly, and achieve their goals faster.' },
    { name: 'twitter:image', content: 'https://taskflow.com/twitter-image.jpg' },
    
    // Additional SEO
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#3b82f6' },
    { name: 'msapplication-TileColor', content: '#3b82f6' },
  ],
  link: [
    { rel: 'canonical', href: 'https://taskflow.com' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'TaskFlow',
        'description': 'Modern task management platform for teams',
        'url': 'https://taskflow.com',
        'applicationCategory': 'BusinessApplication',
        'operatingSystem': 'Web',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.8',
          'ratingCount': '1250'
        }
      })
    }
  ],
  bodyAttrs: {
    class: 'bg-white-bg dark:bg-dark-bg font-sans',
  },
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

body {
  font-family: 'Inter', system-ui, sans-serif;
}

/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>


