<script setup>

const showOptions = ref(false)
const container = ref(null)

const toggleOptions = () => {
    showOptions.value = !showOptions.value
}

const handleClickOutside = (event) => {
  if (container.value && !container.value.contains(event.target)) {
    showOptions.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});

</script>

<template>
<div @click="toggleOptions" ref="container" :class="{ 'container-active': showOptions, 'container': !showOptions }">
    <div class="flex items-center p-2 bg-zinc-900 border-2 border-slate-100 border-opacity-35 rounded-lg">
      <div class="flex">
          <span class="text-slate-400 font-thin">Type</span>
      </div>
      <div class="arrow-container flex items-center justify-end w-full">
        <img class="w-5 ml-1" src="~assets/thumbnails/menu-arrow.svg" alt="">
      </div>
    </div>
    <div v-show="showOptions" class="options bg-zinc-900">
      <ul>
        <li class="hover:bg-indigo-300 hover:bg-opacity-25">
          <div class="container">
            <div class="container-inner">
                <span class="text-slate-400 font-light">Video</span>
            </div>
          </div>
        </li>
        <li class="hover:bg-indigo-300 hover:bg-opacity-25">
          <div class="container">
            <div class="container-inner">
                <span class="text-slate-400 font-light">Audio</span>
            </div>
          </div>
        </li>
        <li class="hover:bg-indigo-300 hover:bg-opacity-25">
          <div class="container">
            <div class="container-inner">
                <span class="text-slate-400 font-light">Images</span>
            </div>
          </div>
        </li>
        <li class="hover:bg-indigo-300 hover:bg-opacity-25">
          <div class="container">
            <div class="container-inner">
                <span class="text-slate-400 font-light">3D Content</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
</div>
</template>
<style scoped>
.container, .container-active {
    position: relative;
    width: 100%;
    max-width: 8rem;
    border: 1px solid var(--color-border);
    border-radius: 10px;
}

.container-active {
  border: 1px solid var(--color-border-strong);
}

.container, .container-active:hover {
  cursor: pointer;
}
.container:hover {
  border: 1px solid var(--color-border-strong);
}

.container-inner{ 
   display: flex;
   align-items: center;
   padding: 0.5rem 1rem;
   height: 100%;
}
.arrow-container {
  width: 100%;
  text-align: right;
}
.flex {
    display: flex;
    align-items: center;
}
.container-inner .flex img {
  height: 20px;
  width: 20px;
  margin-right: 0.5rem;
  object-fit: contain;
}
.options {
  position: absolute;
  width: 101%;
  border: 1px solid var(--color-border-strong);
  border-top: none;
  z-index: 999;
  left: -1px;
  border-radius: 10px;
}
.legend {
    padding: 0.5rem 1rem;
    text-align: left;
}
.options span {
  font-size: smaller;
  text-align: left;
}
ul {
list-style-type: none;
padding: 0;
}
@media (max-width: 385px) {
  .container-inner .flex img {
    display: none;
  }
}
li {
  border-radius: 10px;
}
</style>

