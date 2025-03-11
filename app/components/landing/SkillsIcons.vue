<template>
  <div class="skills-icons">
    <Icon
      v-for="skill in skills"
      :key="skill.name"
      :icon="skill.icon"
      class="icon"
    />
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

// Define your skills here:
const skills = [
  { name: 'Nuxt.js', icon: 'skill-icons:nuxtjs-dark' },
  { name: 'Tailwind CSS', icon: 'skill-icons:tailwindcss-dark' },
  { name: 'SCSS', icon: 'skill-icons:sass' },
  { name: 'Firebase', icon: 'vscode-icons:file-type-firebase' },
//   { name: 'Node.js', icon: 'skill-icons:nodejs' },
//   { name: 'Stripe', icon: 'skill-icons:stripe' },
//   { name: 'Vue.js', icon: 'skill-icons:vuejs' },
  { name: 'pwa', icon: 'logos:pwa' }
]
</script>

<style scoped>
.skills-icons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 0;
}

.icon {
  width: 48px;
  height: 48px;
}
</style>
