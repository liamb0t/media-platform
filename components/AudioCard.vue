<script setup>

const props = defineProps(['src', 'title'])
const isHovering = ref(false)

// define refs
const audioElement = ref(null);
let playTimeout = null;

// Watch the isHovering reactive property for changes
watch(isHovering, (newValue) => {
  if (newValue) {
    // User started hovering, wait 2 seconds before playing
    playTimeout = setTimeout(() => {
      audioElement.value.play();
    }, 1000);
  } else {
    // User stopped hovering, stop playback immediately and clear the timeout
    clearTimeout(playTimeout);
    audioElement.value.pause();
    audioElement.value.currentTime = 0; // Optionally reset audio to start
  }
});

</script>

<template>
    
<div @mouseover="isHovering=true" @mouseleave="isHovering=false" class="flex items-center justify-center bg-indigo-400 p-5 rounded-lg">
    <div class="flex flex-col items-center justify-center">
        <span id="audio-wave" class="transition-opacity duration-150 ease-in-out" :class="{'opacity-100 delay-1000': isHovering, 'opacity-0': !isHovering}"></span>
        <img class="w-20 h-20 transition-opacity duration-250 ease-in-out" :class="{'opacity-0 delay-1000': isHovering, 'opacity-100': !isHovering}" src="~assets/thumbnails/audio-thumbnail.svg">
        <span class="text-xs w-full mt-2 text-center">{{ title }}</span>
    </div>
    <audio ref="audioElement" :src="src" alt="image" class="w-full h-full object-cover" />
</div>


</template>

<style scoped>

#audio-wave {
    position: absolute;
    margin-bottom: 20px;
    width: 75px;
    height: 40px;
    background-repeat: no-repeat;
    background-image: linear-gradient(#000000 50px, transparent 0),
                      linear-gradient(#000000 50px, transparent 0),
                      linear-gradient(#000000 50px, transparent 0),
                      linear-gradient(#000000 50px, transparent 0),
                      linear-gradient(#000000 50px, transparent 0),
                      linear-gradient(#000000 50px, transparent 0);
    background-position: 0px center, 15px center, 30px center, 45px center, 60px center, 75px center, 90px center;
    animation: rikSpikeRoll 0.65s linear infinite alternate;
  }
@keyframes rikSpikeRoll {
  0% { background-size: 10px 3px;}
  16% { background-size: 10px 50px, 10px 3px, 10px 3px, 10px 3px, 10px 3px, 10px 3px}
  33% { background-size: 10px 30px, 10px 50px, 10px 3px, 10px 3px, 10px 3px, 10px 3px}
  50% { background-size: 10px 10px, 10px 30px, 10px 50px, 10px 3px, 10px 3px, 10px 3px}
  66% { background-size: 10px 3px, 10px 10px, 10px 30px, 10px 50px, 10px 3px, 10px 3px}
  83% { background-size: 10px 3px, 10px 3px,  10px 10px, 10px 30px, 10px 50px, 10px 3px}
  100% { background-size: 10px 3px, 10px 3px, 10px 3px,  10px 10px, 10px 30px, 10px 50px}
}
    
</style>
