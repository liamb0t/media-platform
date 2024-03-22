<script setup>
const store = useModalStore()
const props = defineProps(['src'])
const scale = ref(1)

const zoomIn = () => {
  scale.value += 0.5
}

const zoomOut = () => {
  scale.value = Math.max(1, scale.value - 0.5) // Prevent zooming out beyond the original size
}

</script>

<template>
    <div id="container" class="relative">
        <img class="h-full" :src=src alt="" @load="store.setLoaded(true)" :style="{ transform: `scale(${scale})` }">

        <div class="absolute w-full flex items-center justify-center mt-4">
            <div class="flex items-center rounded-3xl bg-violet-950 w-fit p-2">
                <div @click="zoomOut" id="zoom-out" class="hover:cursor-pointer hover:bg-indigo-200 hover:bg-opacity-25 rounded-full">
                    <img class="w-7" src="~assets/thumbnails/minus-icon.svg" alt="">
                </div>
                <div id="icon" class="mx-2">
                    <img class="w-6"  src="~assets/thumbnails/magnify-icon.svg" alt="">
                </div>
                <div @click="zoomIn" id="zoom-in" class="hover:cursor-pointer hover:bg-indigo-200 hover:bg-opacity-25 rounded-full">
                    <img class="w-7 " src="~assets/thumbnails/plus-icon.svg" alt="">
                </div>
            </div>
        </div>
    </div>
</template> 

<style scoped>
#container {
    height: 80vh;
}
</style>
