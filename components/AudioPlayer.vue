<script setup>

const props = defineProps(['src', 'title'])
const store = useModalStore()

</script>

<template>
    <div class="flex flex-col rounded-lg p-5 items-center justify-center bg-indigo-900">
        <img class="w-40 h-40 mb-5" src="~assets/thumbnails/audio-thumbnail.svg">
        <audio @loadedmetadata="store.setLoaded(true)" controls :src=src alt=""></audio>
    </div>
</template>