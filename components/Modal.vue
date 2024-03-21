<script setup>

import AudioPlayer from '~/components/AudioPlayer.vue'
import VideoPlayer from '~/components/VideoPlayer.vue'
import ImageViewer from '~/components/ImageViewer.vue'
import TDFileViewer from '~/components/TDFileViewer.vue'

const store = useModalStore()
const { filePath, isLoaded, showModal } = storeToRefs(store)


function closeModal() {
  store.closeModal()
}


// handle file previewer
const previewer = ref(null)
 
function updateFilePreviewer() {
  const extension = filePath.value?.split('.').pop();
   
  if (['mp3', 'wav', 'ogg'].includes(extension)) {
    previewer.value = AudioPlayer;
  } else if (['mp4', 'webm', 'ogg'].includes(extension)) {
    previewer.value = VideoPlayer;
  } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
    previewer.value = ImageViewer;
  } else {
    previewer.value = TDFileViewer;
  }
}
// watch for changes in selected file and toggle appropriate previewer
watch(() => filePath.value, (newFilePath, oldPrice) => {
    updateFilePreviewer()
});

// Function to disable scrolling
function disableScroll() {
  document.body.style.overflow = 'hidden';
}

// Function to enable scrolling
function enableScroll() {
  document.body.style.overflow = '';
}

watch(() => showModal.value, (newVal, oldVal) => {
    if (showModal.value === true) {
        disableScroll()
    } else {
        enableScroll()
    }
});

</script>

<template>  
    <transition name="fade">
        <div id="modal-background" class="fixed inset-0 bg-black bg-opacity-50 " @click="closeModal">
            <div id="modal" class="flex flex-col items-center justify-center w-screen h-screen shadow-md">
                <div id="header" class="absolute top-0 left-0 flex items-center w-full m-2">
                    <div class="flex items-center justify-center mr-2 w-10 h-10 rounded-full hover:bg-indigo-400 hover:cursor-pointer">
                        <img class="w-6" src="~assets/thumbnails/arrow.svg" alt="">
                    </div>
                    <span class="text-white">{{ filePath }}</span>
                </div>
                <div id="modal-content">
                    <span v-if="!isLoaded" class="loader"></span>
                    <component v-if="previewer" :src="filePath" :is="previewer" />
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
.fade-enter-to, .fade-leave-from {
    opacity: 1;
}
</style>

