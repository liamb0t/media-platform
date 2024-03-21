<script setup>

const props = defineProps(['src'])

const fileType = props.src.split('.').pop()
const fileName = props.src.split('/').pop()

const isAudio = fileType === 'mp3' || fileType === 'wav' || fileType === 'ogg'
const isVideo = fileType === 'mp4' || fileType === 'webm' || fileType === 'ogg'
const isImage = fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png' || fileType === 'gif'
const is3DFile = fileType === 'glb' || fileType === 'gltf'

// handle modal and file previewer
const store = useModalStore()

const openModal = () => {
  store.openModal()
  store.setFileName(props.src)
};

</script>

<template>
    <div id="container" @click="openModal()">
        <TDFileThumbnail v-if="is3DFile" :src="src" :title="fileName"/>
        <ImageCard v-if="isImage" :src="src" :title="fileName"/>
        <AudioCard v-if="isAudio" :src="src" :title="fileName"/>
        <VideoCard v-if="isVideo" :src="src" :title="fileName"/>
    </div>
</template>

<style scoped>  
#container {
  transition: transform 0.3s ease;
  
}
#container:hover {
    transform: scale(1.025);
}
</style>