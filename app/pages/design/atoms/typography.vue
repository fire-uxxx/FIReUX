<template>
  <div class="design">
    <UTabs :items="items" class="custom-tabs">
      <template #fontSizes>
        <h2>Font Sizes</h2>
        <div class="grid">
          <div v-for="size in fontSizes" :key="size.class" class="typo-item" :class="size.class">
            <p>{{ size.label }}</p>
            <p class="class-name">{{ size.class }}</p>
          </div>
        </div>
      </template>

      <template #fontWeights>
        <h2>Font Weights</h2>
        <div class="grid">
          <div v-for="weight in fontWeights" :key="weight.class" class="typo-item" :class="weight.class">
            <p>{{ weight.label }}</p>
            <p class="class-name">{{ weight.class }}</p>
          </div>
        </div>
      </template>

      <template #lineHeights>
        <h2>Line Heights</h2>
        <div class="grid">
          <div v-for="line in lineHeights" :key="line.class" class="typo-item" :class="line.class">
            <p>{{ line.label }}</p>
            <p class="class-name">{{ line.class }}</p>
          </div>
        </div>
      </template>
    </UTabs>
  </div>
</template>

<script setup>
definePageMeta({ layout: "design" });

const items = [
  { icon: "i-lucide-type", slot: "fontSizes" },
  { icon: "i-lucide-bold", slot: "fontWeights" },
  { icon: "i-lucide-ruler", slot: "lineHeights" }
];

const fontSizes = [
  { label: "Text XS", class: "text-xs" },
  { label: "Text SM", class: "text-sm" },
  { label: "Text BASE", class: "text-base" },
  { label: "Text LG", class: "text-lg" },
  { label: "Text XL", class: "text-xl" },
  { label: "Text 2XL", class: "text-2xl" },
  { label: "Text 3XL", class: "text-3xl" },
  { label: "Text 4XL", class: "text-4xl" },
  { label: "Text 5XL", class: "text-5xl" }
];

const fontWeights = [
  { label: "Font Thin", class: "font-thin" },
  { label: "Font ExtraLight", class: "font-extralight" },
  { label: "Font Light", class: "font-light" },
  { label: "Font Normal", class: "font-normal" },
  { label: "Font Medium", class: "font-medium" },
  { label: "Font SemiBold", class: "font-semibold" },
  { label: "Font Bold", class: "font-bold" },
  { label: "Font ExtraBold", class: "font-extrabold" },
  { label: "Font Black", class: "font-black" }
];

const lineHeights = [
  { label: "Leading None", class: "leading-none" },
  { label: "Leading Tight", class: "leading-tight" },
  { label: "Leading Snug", class: "leading-snug" },
  { label: "Leading Normal", class: "leading-normal" },
  { label: "Leading Relaxed", class: "leading-relaxed" },
  { label: "Leading Loose", class: "leading-loose" }
];
</script>

<style scoped>
/* ✅ Center Everything */
.design {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* ✅ Center h2 Title */
h2 {
  text-align: center;
  width: 100%;
  margin-bottom: 1rem;
}

/* ✅ Mobile-Friendly Grid Layout */
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
}

/* ✅ Force a Single Column on Small Screens */
@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

/* ✅ Typography Item */
.typo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
  background: var(--ui-bg-elevated);
  border-radius: 0.5rem;
  width: 100%;
}

/* ✅ Class Name Labels */
.class-name {
  font-size: 0.75rem;
  color: gray;
  margin-top: 0.5rem;
}

/* ✅ Font Sizes */
.text-xs { font-size: 0.75rem; }
.text-sm { font-size: 0.875rem; }
.text-base { font-size: 1rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }
.text-3xl { font-size: 1.875rem; }
.text-4xl { font-size: 2.25rem; }
.text-5xl { font-size: 3rem; }

/* ✅ Font Weights */
.font-thin { font-weight: 100; }
.font-extralight { font-weight: 200; }
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }
.font-black { font-weight: 900; }

/* ✅ Line Heights */
.leading-none { line-height: 1; }
.leading-tight { line-height: 1.25; }
.leading-snug { line-height: 1.375; }
.leading-normal { line-height: 1.5; }
.leading-relaxed { line-height: 1.625; }
.leading-loose { line-height: 2; }
</style>