<script setup>

const searchQuery = ref('')
const router = useRouter()

const handleEnterPress = () => {
  if (searchQuery.value === '') return
  router.push({ query: { query: searchQuery.value } })
}

</script>

<template>
  <div class="main-container">
    <div id="search-bar-container" class="relative p-2 w-3/8 rounded-xl bg-zinc-900 border-2 border-slate-100 border-opacity-35">
      <div class="search-bar-container-inner">
        <img class="search-icon" src="~assets/thumbnails/search-icon.svg" alt="">
        <img class="back-icon" :src="backIcon" alt="">
        <input
        ref="input"
        type="text"
        v-model="searchQuery"
        placeholder="Search media"
        @focus="handleInputFocus"
        @keyup.enter="handleEnterPress"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex {
  display: flex;
  align-items: center;
}
.main-container {
  width: 50%;
}

.search-bar-container-inner {
display: flex;
align-items: center;
z-index: 990;
}
.search-icon, .back-icon {
  height: 20px;
  width: 20px;
  margin-right: 0.4rem;
}
.back-icon {
  display: none;
}
.query {
  margin-right: 0.5rem;
}
input {
  background-color: var(--color-background);
  width: 100%;
  border: none;
  outline: none;
}
input::placeholder {
  font-weight: 100; 
}
input[type="text"] {
  color: #9ca3b0;
  font-weight: 100;
}
.filter-icon {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}
.filter-container {
  border-radius: 10px;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  padding: 0.2rem;
}
.filter-container span {
  font-weight: 600;
  margin-right: 0.1rem;
  
}
.filter-container:hover {
  background-color: var(--color-background-mute);
}
.filter-icon:hover {
  cursor: pointer;
}
.filter-legend {
  display: flex;
  padding-left: 1.5rem;
}
#filter-dropdown {
  z-index: -999;
}
.filter-dropdown-inner {
  display: flex;
}
.filter-dropdown-inner span {
  font-size: smaller;
  font-weight: 600;
}
li {
  text-align: left;
  font-weight: 500;
}
li span {
  cursor: pointer;
}
.dropdown {
position: absolute;
width: 100%;
background-color: var(--color-background);
z-index: 990;
margin-top: 1rem;
max-height: 55vh;
overflow-y: scroll;
border-radius: 10px;
/* Box shadow styling */
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); /* horizontal offset, vertical offset, blur radius, spread radius, color */
-webkit-box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); /* For Safari */
-moz-box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); /* For old Firefox versions */
}
:root.dark .dropdown {
  background-color: var(--color-background-soft);
}
.loading-dropdown {
  padding: 1rem;
}
ul {
padding: 0;
list-style-type: none;
}
.filter-dropdown-inner ul {
  padding: 0.5rem 1.75rem;
}
.filter-dropdown-inner li {
  display: flex;
}

.filter-dropdown-inner img {
  width: 15px;
  height: 15px;
}
.loading-container {
display: flex;
flex: 1;
justify-content: flex-start;
align-items: center;
}
/* Transitions styling */
.loading-enter-active, .loading-leave-active {
  transition: opacity 0.3s;
}
.loading-enter-from, .loading-leave-to {
  opacity: 0;
}
.loading-enter-to, .loading-leave-from {
  opacity: 1;
 
}
.bold {
  color: var(--color-heading);
  font-weight: 600;
}
.search-tag-container {
  display: flex;
  align-items: center;
  background-color: var(--color-background-mute);
  border-radius: 20px;
  padding: 0.1rem 0.45rem;
}
.search-tag-inner {
  display: flex;
  align-items: center;
}
.search-tag-container span{
  font-size: smaller;
  margin-right: 0.4rem;
}


.search-tag-container img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 4px;
}

.search-bar-container .cross-icon {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 4px;
  border: 1px solid grey;
  padding: 0.01rem;
}
.search-bar-container .cross-icon:hover {
 cursor: pointer;
}
.see-all-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.see-all {
  font-weight: 500;
  text-align: center;
  color: cornflowerblue;
  margin: 0.5rem 0
}
.see-all:hover {
  cursor: pointer;
  
}
@media (max-width: 385px) {
  .container-inner .flex img {
    display: none;
  }
}
</style>
