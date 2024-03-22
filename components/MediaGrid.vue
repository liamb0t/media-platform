<script setup>

useHead({
  script: [
    {
      src: "https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.js",
      // valid options are: 'head' | 'bodyClose' | 'bodyOpen'
      tagPosition: 'bodyClose'
    }
  ]
})

// media files
const files = useAssets()

// handle modal and file previewer
const store = useModalStore()

const setFileName = (fileName) => {
  store.setFileName('_nuxt' + fileName)
};

</script>

<template>
  <div>
    <div class="grid" data-masonry='{ "columnWidth": 200, "itemSelector": ".grid-item", "fitWidth": "true", "gutter": 10}'>
        <div 
            class="grid-item" 
            v-for="file in files" 
            :key="file"
        >
          <MediaCard :src="'_nuxt' + file" @click="setFileName(file)"/>
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
