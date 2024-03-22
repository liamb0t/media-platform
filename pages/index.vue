<script setup>
const store = useModalStore()

const { showModal } = storeToRefs(store)
</script>

<template>
    <div class="flex mt-10">
        <div class="flex flex-col mr-3 ml-4 w-1/6">
            <h1 class="text-indigo-300 text text-3xl">ZAUBAR</h1>
            <Sidebar class="mt-10"/>
        </div>
     
        <div class="w-9/12 bg-zinc-800 rounded-3xl p-4">
            <div id="toolbar" class="flex items-center justify-between mb-5">
                <SearchBar />
                <Filter />
            </div>
            <MediaGrid />
        </div>
    </div>
    <Modal v-show="showModal" />
</template>


