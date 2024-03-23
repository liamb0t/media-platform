<script setup>

import { nextTick } from 'vue';

useHead({
  script: [
    {
      src: "https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js",
      tagPosition: 'bodyClose',
    },
    {
      src: "https://unpkg.com/imagesloaded/imagesloaded.pkgd.min.js",
      tagPosition: 'bodyClose',
    }
  ]
});

let msnry = null;
let grid = null;
const files = ref(null)

onMounted(() => {
  (async () => {  
    files.value = await useAssets();
  })();
});

// Watch for changes in `files`
watch(files, (newFiles) => {
  // Ensure we have new files loaded
  if (newFiles && newFiles.length > 0) {
    nextTick(() => {
      // Proceed with Masonry grid setup or refresh
      grid = document.querySelector('.grid');
      if (!msnry) {
        // Initialize Masonry only if it hasn't been initialized yet
        msnry = new Masonry(grid, {
          itemSelector: '.grid-item',
          columnWidth: 200, 
          fitWidth: true,
          gutter: 10,
          transitionDuration: '0'
        });
      } else {
        // If Masonry has already been initialized, refresh items and layout
        msnry.reloadItems();
        msnry.layout();
      }
      
      // Handle media loading for newly added items
      handleMediaLoading(grid);
    });
  }
}, { immediate: true });


function handleMediaLoading(container) {
  const mediaElements = container.querySelectorAll('img, video, audio');

  mediaElements.forEach(element => {
    if (element.tagName === 'IMG') {
      // Handle image loading with imagesLoaded
      imagesLoaded(element, () => {
        msnry.layout();
      });
    } else if (element.tagName === 'VIDEO' || element.tagName === 'AUDIO') {
      if (element.readyState > 0) {
        // Media is already loaded
        msnry.layout();
      } else {
        // Wait for the media to load
        element.addEventListener('loadedmetadata', () => {
          msnry.layout();
        }, { once: true });
      }
    }
  });
}

// stores
const store = useModalStore()

const router = useRouter()

const filterMedia = (query) => {
  files.value = useAssets().filter((file) => file.includes(query))
}

watch(() => router.currentRoute.value.query, (newQuery) => {
  if (newQuery.query) {
    filterMedia(newQuery.query)
    nextTick(() => {
      
    });
  }
})
</script>

<template>
  <div>
    <div class="grid">
      <div 
          class="grid-item" 
          v-for="file in files"
          :key="file"
      >
        <MediaCard :file=file />
      </div>
    </div>
  </div>
</template>

<style>

.grid {
  /* center */
  margin: 0 auto;
}

/* clearfix */
.grid:after {
  content: '';
  display: block;
  clear: both;
}

/* ---- grid-item ---- */

.grid-item {
  width: 200px;
  margin-bottom: 10px;
}
</style>
