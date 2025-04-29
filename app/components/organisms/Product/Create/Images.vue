<!-- app/components/organisms/Product/Create/Images.vue -->
<template>
  <div class="images-system">
    <!-- Main Product Image -->
    <div class="image-wrapper main">
      <MoleculesFormsStateImagePicker
        label="Main Product Image"
        :state-key="MAIN_IMAGE_KEY"
      />
    </div>

    <!-- Gallery Images -->
    <div class="image-wrapper gallery">
      <MoleculesFormsStateImagePicker
        label="Gallery Image #1"
        :state-key="GALLERY_IMAGE_KEY_1"
      />
    </div>
    <div class="image-wrapper gallery">
      <MoleculesFormsStateImagePicker
        label="Gallery Image #2"
        :state-key="GALLERY_IMAGE_KEY_2"
      />
    </div>
    <div class="image-wrapper gallery">
      <MoleculesFormsStateImagePicker
        label="Gallery Image #3"
        :state-key="GALLERY_IMAGE_KEY_3"
      />
    </div>
    <div class="image-wrapper gallery">
      <MoleculesFormsStateImagePicker
        label="Gallery Image #4"
        :state-key="GALLERY_IMAGE_KEY_4"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const MAIN_IMAGE_KEY = 'createProductMainImageFile'
const GALLERY_IMAGE_KEY_1 = 'createProductGallery1File'
const GALLERY_IMAGE_KEY_2 = 'createProductGallery2File'
const GALLERY_IMAGE_KEY_3 = 'createProductGallery3File'
const GALLERY_IMAGE_KEY_4 = 'createProductGallery4File'
</script>

<style scoped>
.images-system {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.image-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: var(--ui-bg-elevated);
  border-radius: var(--radius-md);
  border: 1px solid var(--ui-border);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Main = square */
.image-wrapper.main {
  aspect-ratio: 1 / 1;
  max-width: 400px;
}

/* Gallery = square thumbnails */
.image-wrapper.gallery {
  aspect-ratio: 1 / 1;
  max-width: 200px;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
}
</style>
