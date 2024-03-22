<script setup>



const route = useRoute()
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
      <div class="arrow-container">
        <img class="" src="~assets/thumbnails/arrow.svg" alt="">
      </div>
    </div>
    <div v-show="showOptions" class="options">
      <ul>
        <li>
          <div class="container">
            <div class="container-inner">
                <img  alt="">
                <span>Video</span>
            </div>
          </div>
        </li>
        <li>
          <div class="container">
            <div class="container-inner">
                <img  alt="">
                <span>Audio</span>
            </div>
          </div>
        </li>
        <li>
          <div class="container">
            <div class="container-inner">
                <img  alt="">
                <span>Images</span>
            </div>
          </div>
        </li>
        <li>
          <div class="container">
            <div class="container-inner">
                <img  alt="">
                <span>3D Content</span>
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
    min-width: 11.5rem;
    max-width: 10rem;
    border: 1px solid var(--color-border);
    border-radius: 10px;
}

.container-active {
  margin-right: 1rem;
  border-radius: 0px;
  border-bottom: none;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
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
  background-color: var(--color-background);
  position: absolute;
  width: 101%;
  border: 1px solid var(--color-border-strong);
  border-top: none;
  z-index: 999;
  left: -1px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
:root.dark .options {
  background-color: var(--color-background-mute);
}
.legend {
    padding: 0.5rem 1rem;
    text-align: left;
}
.options span {
    color: var(--color-text);
    font-size: smaller;
    text-align: left;
}
ul {
list-style-type: none;
padding: 0;
}
img {
  height: 10px;
  width: 10px;;
}
@media (max-width: 385px) {
  .container-inner .flex img {
    display: none;
  }
}
</style>

