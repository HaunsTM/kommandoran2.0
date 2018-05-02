<template>
  <div>
    <div id="drawing"></div>
      <div class="svg-image-container" >
        <div class="svg-image devices-map"></div>
      </div>
  </div>
</template>
<script>

import SVG from 'svg.js'
export default {
  name: "PowerSwitchesMap",
  mounted () {
		// fetch the data when the view is created and the data is
		// already being observed
    debugger;
    
// draw pink square// initialize SVG.js
var draw = SVG('drawing')
draw.rect(100, 100).move(100, 50).fill('#f06')
	},
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
