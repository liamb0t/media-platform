<script setup>

const props = defineProps(['src', 'title'])

// define refs
const audioElement = ref(null);


// functions
const play = () => {
    audioElement.value.play();
};

const pause = () => {
    audioElement.value.pause();
};

const startPreview = () => {
    setTimeout(() => {
        audioElement.value.currentTime = 0;
        audioElement.value.play();
    }, 1000);
  
};

const stopPreview = () => {
    audioElement.value.pause();
    audioElement.value.currentTime = 0;
};
</script>

<template>
    
<div @mouseover="startPreview()" @mouseleave="stopPreview()" >
    <div class="flex items-center">
        <img src="" alt="">
    </div>
    <div>
        <img src="~assets/thumbnails/audio-thumbnail.svg">
    </div>
    <audio ref="audioElement" :src="src" alt="image" class="w-full h-full object-cover" />
</div>

</template>