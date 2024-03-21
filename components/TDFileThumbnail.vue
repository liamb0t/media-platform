<script setup>
useHead({
  script: [
    {
        type: "module",
        src: "https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js",
        // valid options are: 'head' | 'bodyClose' | 'bodyOpen'
        tagPosition: 'bodyClose',
    }
  ]
})

const props = defineProps(['src', 'title'])
const isHovering = ref(false)

</script>

<template>
  <div id="container" @mouseover="isHovering=true" @mouseleave="isHovering=false" class="flex items-center justify-center">

    <div class="flex items-center justify-center transition-opacity duration-200 ease-in-out delay-100" :class="{'opacity-0': isHovering, 'opacity-100': !isHovering}">
        <img class="w-3/5" src="~assets/thumbnails/3d-thumbnail.svg" alt="">
    </div>

    <div class="absolute top-0 left-0 flex items-center justify-center w-full h-full transition-opacity duration-500 ease-in-out delay-100" :class="{'opacity-0': !isHovering, 'opacity-100': isHovering}">
      <model-viewer id="transform" :src=src shadow-intensity="1" auto-rotate touch-action="pan-y">
      </model-viewer>
    </div>
  </div>
</template>

<style scoped>
model-viewer {
  display: block;
  width: 100%;
}
</style>