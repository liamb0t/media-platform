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
    <div class="flex items-center absolute">
        <img class="w-5" src="~assets/thumbnails/video-thumbnail.svg" alt="">
        <h1 class="text-sm font-bold underline">{{ title }}</h1>
    </div>
    <video 
        class="w-full h-full object-cover"
        ref="videoElement" 
        :src="src" alt="image" 
    />
</div>
</template>