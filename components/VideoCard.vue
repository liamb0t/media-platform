<script setup>

// define props 
const props = defineProps(['src', 'title'])


// define refs
const videoElement = ref(null);
const isHovering = ref(false);

//watchers 

let playTimeout = null;

watch(isHovering, (newValue) => {
  if (newValue) {
    // User started hovering, wait 2 seconds before playing
    playTimeout = setTimeout(() => {
      videoElement.value.play();
    }, 1000);
  } else {
    // User stopped hovering, stop playback immediately and clear the timeout
    clearTimeout(playTimeout);
    videoElement.value.pause();
    videoElement.value.currentTime = 0; 
  }
});
</script>

<template>
<div @mouseover="isHovering=true" @mouseleave="isHovering=false" class="relative">
    <div class="flex items-center absolute bottom-0 right-0">
        <img class="w-5 mr-1 mb-1" src="~assets/thumbnails/video-thumbnail.svg" alt="">
    </div>
    <video 
        class="w-full h-full object-cover rounded-lg media"
        ref="videoElement" 
        :src="src" 
        muted
    />
</div>
</template>