<script setup>
useHead({
  script: [
    {
        type: "module",
        src: "https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js",
        // valid options are: 'head' | 'bodyClose' | 'bodyOpen'
        tagPosition: 'bodyClose',
    }
  ]
})

const modelViewerTransform = ref(null)

let roll = 0;
let pitch = 0;
let yaw = 0;

onMounted(() => {
  const modelViewerTransform = document.querySelector("model-viewer#transform");

  const updateOrientation = () => {
  modelViewerTransform.orientation = `${roll}deg ${pitch}deg ${yaw}deg`;
};


  setInterval(() => {
  yaw += 0.5
  updateOrientation();
}, 100);
})

</script>

<template>
  <model-viewer id="transform" orientation="0 0 0" src="_nuxt/assets/media/3d/3D_Isometric_BEDROOM.glb" ar ar-modes="webxr scene-viewer quick-look" tone-mapping="commerce" poster="poster.webp" shadow-intensity="1" autoplay>
</model-viewer>
</template>

