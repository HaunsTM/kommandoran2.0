<template>
  
      <div class="svg-image-container" >
        <div class="svg-image devices-map"></div>
      </div>
</template>
<script>
export default {
  name: "PowerSwitchesMap"
  
}
</script>
<style scoped>
 .svg-image-container {
    width: 20rem;
  } 
  .svg-image {
    background-size: cover;
    width: 100%;
    height: 0;
    padding: 0; /* reset */
    padding-bottom: 100%;
  }
  .devices-map {
    background-image: url("../assets/devices-map.svg");
  }
</style>
