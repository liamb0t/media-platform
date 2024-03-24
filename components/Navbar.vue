


<template>
    <div class="flex items-center p-2">
        <div id="left-container" class="flex items-center">
            <img @click="$emit('openSidebar')" src="~assets/thumbnails/menu-icon.svg" alt="" class="w-6 hover:cursor-pointer mr-2 ml-2">
            <h1 class="text-indigo-500 text text-3xl">MOXY</h1>
        </div>
        <div id="right-container">
            
        </div>
    </div>
</template>