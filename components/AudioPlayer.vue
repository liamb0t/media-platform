<script setup>

const props = defineProps(['src', 'title'])
const store = useModalStore()

</script>

<template>
    <audio @loadedmetadata="store.setLoaded(true)" controls :src=src alt=""></audio>
</template>