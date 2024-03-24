<script setup>

const props = defineProps(['src', 'title'])

const videoElement = ref(null);
const playing = ref(true);
const currentTime = ref(0);
const duration = ref(0);
const progressbar = ref(null)
const bufferbar = ref(null);
const isBuffering = ref(null)
const videoContainer = ref(null)
const hover = ref(false)
const store = useModalStore()

const { showModal: isModalOpen} = storeToRefs(store)

watch(videoElement, (newVal) => {
  if (newVal) {
    newVal.onloadedmetadata = () => {
      duration.value = newVal.duration;
    };
  }
});

watch(isModalOpen, (newVal) => {
  if (newVal === false) {
    pause()
  }
});

const play = () => {
  videoElement.value.play();
  playing.value = true;
};

const pause = () => {
  videoElement.value.pause();
  playing.value = false;
};

const onTimeUpdate = () => {
  currentTime.value = videoElement.value.currentTime;

  const progress = ((currentTime.value / duration.value) * 100) || 0;

  if (progressbar.value) {
    progressbar.value.style.setProperty("width", `${progress}%`);
  } 
};

const onSliderInput = (event) => {
  const time = (event.target.value / 100) * duration.value;
  progressbar.value.style.setProperty("width", `${(time / duration.value) * 100}%`);
  videoElement.value.currentTime = time;
};

const onVolumeChange = (event) => {
  videoElement.value.volume = event.target.value / 100;
};

const getBufferedPercentage = () => {
  if (videoElement.value && videoElement.value.buffered.length > 0) {
    const bufferedEnd = videoElement.value.buffered.end(videoElement.value.buffered.length - 1);
    const duration = videoElement.value.duration;
    return (bufferedEnd / duration) * 100;
  }
  return 0;
};

const onProgress = () => {
  const bufferedPercentage = getBufferedPercentage();
  if (bufferbar.value) {
    bufferbar.value.style.setProperty("width", `${bufferedPercentage}%`);
  }
};

const exitFullscreen = () => {
emit('exitFullscreen')
}

const toggleInfo = () => {
hover.value = !hover.value
}

const toggleFullScreen = () => {
if (!document.fullscreenElement) {
  videoContainer.value.requestFullscreen().catch(err => {
    alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
  });
} else {
  document.exitFullscreen() 
}
};

const toggleMute = () => {
emit('toggleMute')
}


watch(() => props.mouseOver, (newValue, oldValue) => {
props.mouseOver === true ? play() : pause()
});

//computed properties

const formattedCurrentTime = computed(() => {
  const minutes = Math.floor(currentTime.value / 60)
  const seconds = Math.floor(currentTime.value % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
})

const formattedDuration = computed(() => {
  const minutes = Math.floor(duration.value / 60)
  const seconds = Math.floor(duration.value % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
})

</script>

<template>
  <div class="main-container">
    <div class="video-container" ref="videoContainer">
      <!-- Add event listeners for play, pause, and timeupdate -->
      <video
        ref="videoElement"
        :src=src
        @play="onTimeUpdate"
        @pause="onTimeUpdate"
        @timeupdate="onTimeUpdate"
        @progress="onProgress"
        @loadedmetadata="store.setLoaded(true)"
        :preload="preload"
        loop
      ></video>
      <transition name="fade">
        <div class="video-overlay" v-if="!isFullscreen || hover">
          <slot name="video-overlay"></slot> 
        </div>
      </transition>

      <div v-if="isFullscreen">
        <div class="icon-container">
          <img 
            class="fullscreen"
            :src="fullScreenIcon"  
            @click="exitFullscreen"
          >
          <img 
            class="fullscreen"
            :src="isMuted ? muteIcon : volumeIcon" 
            @click="toggleMute" alt=""
          >
        </div>
      </div>
     
      <div class="player-controls flex flex-row items-center justify-between">
        <div id="left-container" class="w-full">
          <div class="progress-bar" ref="progressbar"></div>
            <input 
              type="range" 
              min="0" max="100" 
              :value="(currentTime / duration) * 100 || 0" 
              @input="onSliderInput" 
              @mouseover="toggleInfo"
              @mouseleave="toggleInfo"
            />
          <div id="playback-controls" class="flex items-center p-4">
            <div class="mr-4 hover:cursor-pointer">
              <img v-if="playing===false" src="~assets/thumbnails/play-icon.svg" class="w-5" @click="play()"/>
              <img v-else src="~assets/thumbnails/pause-icon.svg" class="w-5" @click="pause()"/>
            </div>
            <div class="flex items-center mr-4">
              <img class="w-5" src="~assets/thumbnails/sound-icon.svg"/>
              <input 
                type="range" 
                min="0" max="100"
                name="" 
                @input="onVolumeChange"
                id="volume-slider">
            </div>
            <div>
              <span class="text-white text-sm">{{ formattedCurrentTime }} / {{ formattedDuration }}</span>
            </div>
          </div>
        </div>
        <div id="right-container">
          <div class="w-5 mr-5 hover:cursor-pointer">
            <img 
              src="~assets/thumbnails/fullscreen-icon.svg" 
              @click="toggleFullScreen"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
display: flex;
height: 80vh;
width: 100%;
}
.video-container {
position: relative;
display: flex;
flex: 1;
background-color: black;

}
video {
width: 100%;
height: 100%;
display: block; /* This ensures that there is no gap under the video */
}
.loader {
position: absolute;
width: 100%;
height: 100%;
z-index: 100;
display: flex;
justify-content: center;
align-items: center;
}
.player-controls {
position: absolute;
bottom: 0;
width: 100%;
display: flex;
background: rgba(105, 105, 105, 0); /* Slight background to make text visible on light videos */
z-index: 2;
}
.player-controls button {
border: none;
background-color: #39495c;
color: white;
cursor: pointer;
}

.player-controls button:hover {
background-color: #2e3b4e;
}

.player-controls input[type="range"] {
position: absolute;
-webkit-appearance: none;
appearance: none;
width: 100%;
background: transparent; /* Make the default background transparent */
opacity: 1; /* Initially hidden */
transition: opacity 0.1s ease; /* Smooth transition for opacity */
z-index: 5;
height: 6px;
}
.progress-bar {
  position: absolute;
  height: 4px;
  background-color: rgb(126, 14, 206);
  transition: height 0.2s ease;
  z-index: 5;
}
.player-controls:hover .progress-bar, .player-controls:hover .buffer  -bar {
height: 6px;
}
.buffer-bar {

height: 4px; /* Same height as progress bar */
background-color: grey; /* Different color for buffer */
z-index: 1; /* Ensure it's behind the progress bar */
transition: height 0.2s ease;
}
.player-controls input[type="range"]::-webkit-slider-thumb {
-webkit-appearance: none;
appearance: none;
width: 15px;
height: 15px;
background: rgb(126, 14, 206); /* Change thumb color */
cursor: pointer;
border-radius: 50%;
transform: scale(0);
transition: transform 0.2s ease-in-out; /* Smooth transition for opacity */
}

.player-controls:hover input[type="range"]::-webkit-slider-thumb {
transform: scale(1);
}
.player-controls input[type="range"]::-moz-range-thumb {
width: 15px;
height: 15px;
background: red; /* Change thumb color */
cursor: pointer;
border-radius: 50%;
}

.player-controls input[type="range"]::before {
content: '';
display: block;
position: absolute;
left: 0;
height: 4px; /* Height of the filled part */
background-color: rgb(20, 40, 170); /* Color of the filled part */
z-index: 1;
}

.player-controls input:hover {
cursor: pointer;
}

#volume-slider {
  position: relative;
  width: 5rem;
  color: white;
  background-color: white;
  height: 3px;
}

#volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  background: white;
  cursor: pointer;
  border-radius: 50%;
}

.video-overlay {
position: absolute;
bottom: 0;
display: flex;
align-items: center;
gap: 10px;
padding-bottom: 1rem;
padding-right: 6rem;
padding-left: 1rem;
}

.icon-container {
position: absolute;
top: 0;
right: 0;
background-color: rgba(0, 0, 0, 0.22);
margin: 1rem;
padding: 0.2rem 0.5rem;
display: flex;
align-items: center;
justify-content: center;
border-radius: 2px;
}

img.fullscreen {
width: 1.2rem;
height: 1.2rem;
filter: invert(100%);
}
img.gridview {
width: 1.2rem;
height: 1.2rem;
filter: invert(100%);
}
/* Fade Transition styles */
.fade-enter-active, .fade-leave-active {
transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
opacity: 0;
}
.fade-enter-to, .fade-leave-from {
opacity: 1;
}
@media (max-width: 534px) {
video {
  object-fit: cover;
}
}
</style>
