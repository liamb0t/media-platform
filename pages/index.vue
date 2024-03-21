<script setup>
const store = useModalStore()

const { showModal } = storeToRefs(store)
</script>

<template>
    <MediaGrid />
    <Modal v-show="showModal" />
</template>


