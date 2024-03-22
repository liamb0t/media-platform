<script setup>

// define props 
const props = defineProps(['src', 'title'])

// define refs
const videoElement = ref(null);

// functions
const play = () => {
    videoElement.value.play();
};

const pause = () => {
    videoElement.value.pause();
};

const startPreview = () => {
    setTimeout(() => {
        videoElement.value.currentTime = 0;
        play();
    }, 1000);
};

const stopPreview = () => {
    pause();
    videoElement.value.currentTime = 0;
};

</script>

<template>
<div @mouseover="startPreview" @mouseleave="stopPreview" class="relative">
    <div class="flex items-center absolute bottom-0 right-0">
        <img class="w-5 mr-1 mb-1" src="~assets/thumbnails/video-thumbnail.svg" alt="">
    </div>
    <video 
        class="w-full h-full object-cover"
        ref="videoElement" 
        :src="src" alt="image" 
        muted
    />
</div>
</template>