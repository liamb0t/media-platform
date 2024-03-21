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
const store = useModalStore()

</script>

<template>
  <model-viewer @load="store.setLoaded(true)" :src=src ar shadow-intensity="1" camera-controls touch-action="pan-y"></model-viewer>
</template>
<style scoped>

</style>