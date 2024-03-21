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
        <div class="grid" data-masonry='{ "columnWidth": 220, "itemSelector": ".grid-item" }'>
            <div class="grid-sizer"></div>
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
img {
    width: 100%;
    height: 100%;
}
.grid {
    max-width: 1000px;
    
}
/* fluid 5 columns */
.grid-sizer,
.grid-item { width: 20%; margin-bottom: 10px}
/* 2 columns */
.grid-item--width2 { width: 40%; }
.grid-item--width3 { width: 60%; }
</style>
