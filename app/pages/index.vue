<script lang="tsx" setup>
import Navbar from "../components/navbar.vue";
import Footer from "../components/footer.vue";
import FeatureCard from "../components/feature-card.vue";

import {
  Past,
  Team,
  Progress,
  Mobile,
  Security,
  Flash,
} from "../components/icons/index.ts";

const features = [
  {
    title: "Smart Task Organization",
    description:
      "Organize tasks with custom categories, priorities, and due dates. Never miss a deadline again.",
    icon: <Past />,
  },
  {
    title: "Team Collaboration",
    description:
      "Assign tasks, share updates, and collaborate seamlessly with your team members in real-time.",
    icon: Team,
  },
  {
    title: "Progress Tracking",
    description:
      "Visualize your team's progress with intuitive dashboards and detailed analytics.",
    icon: Progress,
  },
  {
    title: "Mobile Ready",
    description:
      "Access your tasks anywhere, anytime with our fully responsive mobile interface.",
    icon: Mobile,
  },
  {
    title: "Secure & Reliable",
    description:
      "Enterprise-grade security with 99.9% uptime guarantee to keep your data safe.",
    icon: Security,
  },
  {
    title: "Lightning Fast",
    description:
      "Built with modern technology for blazing fast performance and instant updates.",
    icon: Flash,
  },
];
useHead({
  title: "TaskFlow - Modern Task Management Platform",
  meta: [
    {
      name: "description",
      content:
        "Streamline your team's task management with TaskFlow. The modern platform that helps teams collaborate efficiently, track progress seamlessly, and achieve their goals faster.",
    },
    {
      name: "keywords",
      content:
        "task management, team collaboration, project management, productivity, workflow, team tasks",
    },
    { name: "author", content: "TaskFlow Team" },
    { name: "robots", content: "index, follow" },

    // Open Graph
    {
      property: "og:title",
      content: "TaskFlow - Modern Task Management Platform",
    },
    {
      property: "og:description",
      content:
        "Streamline your team's task management with TaskFlow. The modern platform that helps teams collaborate efficiently, track progress seamlessly, and achieve their goals faster.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://taskflow.com" },
    { property: "og:image", content: "https://taskflow.com/og-image.jpg" },
    { property: "og:site_name", content: "TaskFlow" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "TaskFlow - Modern Task Management Platform",
    },
    {
      name: "twitter:description",
      content:
        "Streamline your team's task management with TaskFlow. The modern platform that helps teams collaborate efficiently, track progress seamlessly, and achieve their goals faster.",
    },
    {
      name: "twitter:image",
      content: "https://taskflow.com/twitter-image.jpg",
    },

    // Additional SEO
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "theme-color", content: "#3b82f6" },
    { name: "msapplication-TileColor", content: "#3b82f6" },
  ],
  link: [
    { rel: "canonical", href: "https://taskflow.com" },
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "TaskFlow",
        description: "Modern task management platform for teams",
        url: "https://taskflow.com",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          ratingCount: "1250",
        },
      }),
    },
  ],
  bodyAttrs: {
    class: "bg-white-bg dark:bg-dark-bg font-sans",
  },
});
</script>


<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300"
  >
    <!-- Navigation -->
    <Navbar />

    <!-- Hero Section -->
    <section class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center">
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in"
          >
            Streamline Your Team's
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600"
            >
              Task Management
            </span>
          </h1>
          <p
            class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-up"
          >
            The modern task management platform that helps teams collaborate
            efficiently, track progress seamlessly, and achieve their goals
            faster than ever before.
          </p>
          <div
            class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up"
          >
            <button
              class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started Free
            </button>
            <button
              class="border-2 border-primary-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
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
          <h2
            class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Everything You Need to Manage Tasks
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Powerful features designed to boost productivity and streamline
            collaboration
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            v-for="feature in features"
            :key="feature.title"
            :feature="feature"
          />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-primary-700 dark:to-primary-900"
    >
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Team's Productivity?
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          Join thousands of teams already using TaskFlow to manage their
          projects more efficiently.
        </p>
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            class="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Free Trial
          </button>
          <button
            class="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
          >
            Contact Sales
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>



