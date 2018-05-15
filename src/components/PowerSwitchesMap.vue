<template>
  <div>
    <div id="svgimage"></div>
      <!--<div class="svg-image-container" >
        <div class="svg-image devices-map"></div>
      </div>-->
  </div>
</template>
<script>

import SVG from 'svg.js'

export default {
  name: "PowerSwitchesMap",
  data: () => ({
    devicesMapSVGjsObject: {},
    
  }),
  props: ['devicesMapSVGjsMarkup'],
  watch: {
    devicesMapSVGjsMarkup(newVal) {
      debugger;
      var draw = SVG('svgimage')
      draw.svg(newVal)
    }
  }
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
    background-image: url("/static/devices-map.svg");
  }
</style>
