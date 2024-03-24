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
          columnWidth: 250, 
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
  const mediaElements = container.querySelectorAll('.media');
  console.log(mediaElements)
  mediaElements.forEach(element => {
    if (element.tagName === 'IMG') {
      // Handle image loading with imagesLoaded
      imagesLoaded(element, () => {
        element.closest('.grid-item').classList.add('loaded');
        msnry.layout();
      });
    } else if (element.tagName === 'VIDEO' || element.tagName === 'AUDIO') {
      if (element.readyState > 3) {
        // Media is already loaded
        element.closest('.grid-item').classList.add('loaded');
        msnry.layout();
      } else {
        // Wait for the media to load
        element.addEventListener('loadedmetadata', () => {
          element.closest('.grid-item').classList.add('loaded');
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
          v-for="(file, index) in files"
      >
        <MediaCard :file=file :key="index"/>
      </div>
    </div>
  </div>
</template>

<style>

/* ---- grid ---- */

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
  visibility: hidden; /* The element is not visible, but still takes up space */
  width: 250px;
  margin-bottom: 10px;
  opacity: 0; /* Start fully transparent */
  transition: visibility 0s linear 0.5s, opacity 0.5s linear; /* Adjust transition for visibility */
}

.grid-item.loaded {
  visibility: visible; /* Make the element visible */
  opacity: 1; /* Fully visible */
  transition-delay: 0s; /* Apply delay to visibility transition when becoming visible */
}
</style>

