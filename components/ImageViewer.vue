<script setup>

const props = defineProps(['src'])

const isLoaded = ref(false)

</script>

<template>
    <h1 class="text-white">{{ src }}sefijesfij</h1>
    <span class="loader" v-if="!isLoaded"></span>
    <img :src=src alt="" @load="isLoaded=true">
</template> 