<template>
    <ul>
        <li>
            <a href="/">
                <div class="flex items-center rounded-lg hover:bg-indigo-600 p-3 hover:cursor-pointer">
                    <div class="flex items-center container-inner">
                        <img src="~assets/thumbnails/home-icon.svg" >
                        <span class="text-slate-300">Home</span>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <div class="flex items-center rounded-lg hover:bg-indigo-600 p-3 hover:cursor-pointer">
                <div class="flex items-center container-inner">
                    <img src="~assets/thumbnails/star-icon.svg" >
                     <span class="text-slate-300">Starred</span>
                </div>
            </div>
        </li>
        <li>
            <div class="flex items-center rounded-lg hover:bg-indigo-600 p-3 hover:cursor-pointer">
                <div class="flex items-center container-inner">
                    <img src="~assets/thumbnails/bin-icon.svg">
                     <span class="text-slate-300">Bin</span>
                </div>
            </div>
        </li>
        <li>
            <div class="flex items-center rounded-lg hover:bg-indigo-600 p-3 hover:cursor-pointer">
                <div class="flex items-center container-inner">
                    <img src="~assets/thumbnails/cloud-icon.svg">
                     <span class="text-slate-300">Storage</span>
                </div>
            </div>
        </li>
    </ul>
</template>
<style scoped>
img {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
}
</style>
