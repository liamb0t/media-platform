<script setup>

import AudioPlayer from '~/components/AudioPlayer.vue'
import VideoPlayer from '~/components/VideoPlayer.vue'
import ImageViewer from '~/components/ImageViewer.vue'
import TDFileViewer from '~/components/TDFileViewer.vue'

const store = useModalStore()
const { filePath, fileType, isLoaded, showModal } = storeToRefs(store)

//methods and functions
function closeModal() {
  store.closeModal()
}

function download() {
  const url = filePath.value
  let filename = filePath.value
  // Current blob size limit is around 500MB for browsers
  if (!filename) filename = url.split('\\').pop().split('/').pop();
  fetch(url, {
      headers: new Headers({
        'Origin': location.origin
      }),
      mode: 'cors'
    })
    .then(response => response.blob())
    .then(blob => {
      let blobUrl = window.URL.createObjectURL(blob);
      let link = document.createElement('a');

      // Place the resource in the href of the link
      link.href = blobUrl;
      link.download = `${filename}`;
      document.body.appendChild(link);
      link.click()
      document.body.removeChild(link);
      // Revoke the Blob URL to free up resources
      URL.revokeObjectURL(blobUrl);
    })
    .catch(e => console.error(e));
}

// handle file previewer
const previewer = ref(null)
 
function updateFilePreviewer() {
   
  if (fileType.value === 'audio') {
    previewer.value = AudioPlayer;
  } else if (fileType.value === 'video') {
    previewer.value = VideoPlayer;
  } else if (fileType.value === '3D') {
    previewer.value = TDFileViewer;
  } else {
    previewer.value = ImageViewer;
  }
}

// WATCHERS 

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

//computed

const title = computed(() => {
  return filePath.value.split('/').pop()
})

</script>

<template>  
  <transition name="fade">
      <div id="modal-background" class="fixed inset-0 bg-black bg-opacity-80 ">
          <div id="modal" class="flex flex-col items-center justify-center w-screen h-screen shadow-md">
              <div id="header" class="absolute top-0 left-0 flex items-center justify-between w-full m-2 z-10">
                <div class="flex items-center">
                  <div @click="closeModal" class="flex items-center justify-center mr-2 w-10 h-10 rounded-full hover:bg-indigo-400 hover:bg-opacity-25 hover:cursor-pointer">
                    <img class="w-6" src="~assets/thumbnails/arrow.svg" alt="">
                  </div>
                  <div class="mw-5/8">
                    <span v-if="filePath" class="text-zinc-300">{{ title }}</span>
                  </div>
                 
                </div>
                <div @click="download" class="flex items-center justify-center mr-5 w-10 h-10 rounded-full hover:bg-indigo-400 hover:bg-opacity-25 hover:cursor-pointer">
                  <img class="w-6 hover:cursor-pointer" src="~assets/thumbnails/download-icon.svg" alt="">
                </div>
              </div>
              <div id="modal-content">
                  <component v-if="previewer" :src="filePath" :is="previewer" />
              </div>
          </div>
          <span v-if="!isLoaded" class="absolute inset-0 flex justify-center items-center">
            <div class="loader"></div>
          </span>
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

