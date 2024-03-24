<script setup>

const props = defineProps(['src'])
const isHovering = ref(false)
let playTimeout = null // Changed to let for reassignment

function handleMouseOver() {
    // Initialize the timeout to change isHovering to true after 1 second
    playTimeout = setTimeout(() => {
        isHovering.value = true
    }, 500)
}

function handleMouseLeave() {
    // Clear the timeout if the mouse leaves before 1 second
    clearTimeout(playTimeout)
    // Reset isHovering to false immediately on mouse leave
    isHovering.value = false
}
</script>

<template>
<div @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <img :src=src class="w-full h-full object-cover rounded-lg media transition-transform duration-100" :class="{'scale-[1.7] z-50': isHovering}"/>
</div>
</template>


