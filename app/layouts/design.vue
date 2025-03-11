<template>
  <div class="design-layout">
    <!-- ✅ Pinstripe Background now correctly positioned behind everything -->
    <div class="pinstripe-background" />
    
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
/* Full Page Layout */
.design-layout {
  display: flex;
  height: 100vh;
  position: relative; /* Ensures pinstripe stays behind */
  background: var(--ui-bg); /* ✅ Set background here so pinstripe is visible */
}

/* ✅ Pinstripe Background */
.pinstripe-background {
  position: absolute; /* Ensures it fills the entire layout */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  background-image: 
    linear-gradient(var(--ui-primary) 1px, transparent 1px),
    linear-gradient(90deg, var(--ui-primary) 1px, transparent 1px);
  background-size: 64px 64px; /* ✅ Adjusted for better scaling */

  /* ✅ Make sure it's visible but subtle */
  opacity: 0.15; /* Lowered slightly for balance */
  pointer-events: none; /* Ensures it's non-interactive */
  z-index: 0; /* ✅ Keeps it behind content */
}

/* Content Area */
.content {
  flex-grow: 1;
  padding: 2rem;
  position: relative; /* Ensures slot content is above pinstripe */
  z-index: 1;
}
</style>