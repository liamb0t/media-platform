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
const progress = ref(0)

// listen for progress event

const onModelProgress = (event) => {
  progress.value = event.detail.totalProgress
  console.log(progress.value)
}

const progressWidth = computed(() => {
  return `${progress.value * 100}%`
})

</script>

<template>
  <div id="container" @mouseover="isHovering=true" @mouseleave="isHovering=false" class="flex items-center justify-center bg-indigo-500 p-5 rounded-lg">

    <div class="flex items-center justify-center flex-col transition-opacity duration-150 ease-in delay-100" :class="{'opacity-0': isHovering, 'opacity-100': !isHovering}">
        <img class="w-3/5 media" src="~assets/thumbnails/3d-thumbnail.svg" alt="">
        <span class="text-xs w-full mt-3 text-center">{{ title }}</span>
    </div>
    <div class="absolute top-0 left-0 flex items-center justify-center w-full h-full transition-opacity duration-500 ease-in-out delay-100" :class="{'opacity-0': !isHovering, 'opacity-100': isHovering}">
      <model-viewer @progress="onModelProgress" v-if="isHovering" id="transform" :src=src shadow-intensity="1" auto-rotate touch-action="pan-y">
        <div class="progress-bar-container" slot="progress-bar">
          <div v-if="!progress===1" class="progress-bar">
            <div class="progress-bar-inner" :style="{width: progressWidth}"></div>
          </div>
        </div>
        
      </model-viewer>
    </div>
  </div>
</template>

<style scoped>
.progress-bar-container {
  position: absolute;
  top: 0;
  left: 0%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.progress-bar {
  width: 75%;
  height: 4.8px;
  display: inline-block;
  position: relative;
  background: rgba(255, 255, 255, 0.15);
  overflow: hidden;
}

.progress-bar-inner {
  position: absolute;
  width: 0;
  height: 100%;
  background: white;
}

</style>