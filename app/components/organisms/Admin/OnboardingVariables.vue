<template>
  <div class="form-field">
    <h3>Environment Check</h3>
    <ul v-if="envData">
      <li v-for="(entry, key) in envData" :key="key">
        <span :style="{ color: entry.present ? 'green' : 'red' }">
          {{ entry.present ? '✅' : '❌' }}
        </span>
        <strong>{{ key }}</strong>
        <p v-if="entry.docs" class="env-instructions">
          <a :href="entry.docs" target="_blank" rel="noopener noreferrer">
            👉 How to set this up
          </a>
        </p>
        <span v-if="!entry.present" class="hint"> – Please set this in your .env file.</span>
        <a
          v-if="entry.docs"
          :href="entry.docs"
          target="_blank"
          rel="noopener noreferrer"
          class="read-more"
        >
          Read more
        </a>
      </li>
    </ul>
    <p v-else class="error-message">⚠️ Failed to load environment variables.</p>
  </div>
</template>

<script setup>
const { data: envData, error } = await useFetch('/api/env-check', { server: false })

if (error.value) {
  console.error('❌ Error fetching /api/env:', error.value)
} else {
  console.log('✅ envData loaded:', envData.value)
}
</script>

<style scoped>
.env-instructions {
  text-align: left;
  margin-bottom: var(--space-4);
  font-size: 0.95em;
  color: var(--text-secondary);
}

.env-instructions ol {
  padding-left: 1.25em;
  margin-top: 0.5em;
}

.hint {
  font-size: 0.85em;
  color: var(--text-secondary);
  margin-left: 0.5em;
}

.read-more {
  margin-left: 0.75em;
  font-size: 0.85em;
  color: var(--text-secondary);
  text-decoration: underline;
}

.error-message {
  color: red;
  margin-top: 1rem;
  font-size: 0.95em;
}
</style>