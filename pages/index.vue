<script setup>
const store = useModalStore()
const openedSidebar = ref(true)

const handleSidebar = () => {
    openedSidebar.value = !openedSidebar.value
}

const { showModal } = storeToRefs(store)
</script>

<template>
    <div class="flex pt-5" id="container">
        <div id="navbar" class="hidden md:visible">
            <Navbar @open-sidebar="handleSidebar" />
        </div>
        
        <transition name="slide">
            <div class="relative flex flex-col mr-6 ml-4 w-1/6" id="sidebar" v-if="openedSidebar">
                <h1 class="text-indigo-400 text text-5xl font-thin">MOXY</h1>
                <Sidebar class="mt-10"/>
            </div>
        </transition>

        <transition name="slide">
            <div class="fixed h-full z-50 bg-zinc-900 hidden flex-col mr-6 pl-4 w-2/6" id="sidebar-secondary">
                <h1 class="text-indigo-500 text text-3xl">MOXY</h1>
                <Sidebar class="mt-10"/>
            </div>
        </transition>
      
        <div class="relative bg-zinc-800 rounded-3xl p-4 transition-all duration-500 ease-in-out min-h-screen" id="grid-container" :class="{'w-9/12': openedSidebar, 'w-full': !openedSidebar}">
            <div id="toolbar" class="flex items-center justify-between mb-5">
                <SearchBar />
                <Filter />
            </div>  

            <div id="panel-container" class="fixed h-4/6 w-full">
                <div id="panel-btn" @click="handleSidebar" class="absolute hover:cursor-pointer w-6 h-8 -left-4 top-1/2 bottom-0 p-2">
                    <div class="w-1 h-6 bg-white"></div>
                </div>
            </div>  
            <MediaGrid :sizeChange="openedSidebar" />
        </div>
    </div>
    <Modal v-show="showModal" />
</template>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

/* Initial state for the entering element */
.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}

/* Target state for the entering element */
.slide-enter-to, .slide-leave-from {
  transform: translateX(0);
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
#panel-container {
    display: none;
}
}
</style>
