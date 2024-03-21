<script setup>

const props = defineProps(['src', 'title'])

</script>

<template>
<div>
    <div class="flex items-center">
        <img src="" alt="">
        <h1 class="text-sm font-bold underline">{{ title }}</h1>
    </div>
    <img :src="src" alt="image" class="w-full h-full object-cover rounded-lg"/>
</div>
</template>