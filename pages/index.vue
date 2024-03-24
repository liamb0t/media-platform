<script setup>
const store = useModalStore()
const openedSidebar = ref(true)

const handleSidebar = () => {
    openedSidebar.value = !openedSidebar.value
}

const { showModal } = storeToRefs(store)
</script>

<template>
    <div class="flex pt-10" id="container">
        <div id="navbar" class="hidden">
            <Navbar @open-sidebar="handleSidebar" />
        </div>
        
        <transition name="slide">
            <div class="relative flex flex-col mr-6 ml-4 w-1/6" id="sidebar" v-if="openedSidebar">
                <h1 class="text-indigo-500 text text-3xl">MOXY</h1>
                <Sidebar class="mt-10"/>
                <div class="absolute h-dvh w-full">
                    <div id="panel-btn" @click="handleSidebar" class="absolute hover:cursor-pointer bg-white w-1 h-5 right-0 top-1/2 bottom-0"></div>
                </div>
            </div>
        </transition>

        <transition name="slide">
            <div v-if="openedSidebar" class="fixed h-full z-50 bg-zinc-900 flex flex-col mr-6 pl-4 w-2/6 md:hidden" id="sidebar-secondary">
                <h1 class="text-indigo-500 text text-3xl">MOXY</h1>
                <Sidebar class="mt-10"/>
            </div>
        </transition>
      
        <div class="relative bg-zinc-800 rounded-3xl p-4 transition-all duration-500 ease-in-out" id="grid-container" :class="{'w-9/12': openedSidebar, 'w-full': !openedSidebar}">
            <div id="toolbar" class="flex items-center justify-between mb-5">
                <SearchBar />
                <Filter />
            </div>
            <MediaGrid />
        </div>
    </div>
    
    <Modal v-show="showModal" />
</template>

<style scoped>
/* Transition styles */
.slide-enter-active, .slide-leave-active {
  transition: all .2s;
}
.slide-enter, .slide-leave-to {
  transform: translateX(-100%);
}

@media (max-width: 768px) {
#sidebar {
    display: none;
}
#navbar {
    display: flex;
}
#container {
    flex-direction: column;
    padding-top: 4px;
}
#grid-container {
    width: 100%;
}
}
</style>
