<script setup>

const props = defineProps({
  file: {
    type: Object,
    required: true
  }
})

// handle modal and file previewer
const store = useModalStore()

const openModal = () => {
  store.openModal()
  store.filePath = props.file.src
  store.fileType = props.file.fileType
};

</script>

<template>
    <div class="z-10" id="container" @click="openModal()">
      <ImageCard v-if="file.fileType==='image'" :src="file.src" />
      <VideoCard v-if="file.fileType==='video'" :src="file.src"/>
      <AudioCard v-if="file.fileType==='audio'" :src="file.src" :title="file.title"/>
      <TDFileThumbnail v-if="file.fileType==='3D'" :src="file.src" :title="file.title"/>
    </div>
</template>

<style scoped>  

</style>