<template>
  <div>
    <div id="powerSwitchesMapDiv" ref="powerSwitchesMapDiv"
    v-html="devicesMapSVGjsMarkup"></div>
      <!--<div class="svg-image-container" >
        <div class="svg-image devices-map"></div>
      </div>-->
  </div>
</template>
<script>


export default {
  name: "PowerSwitchesMap",
  data: () => ({
    devicesMapSVGjsObject: {},
    domElement: {},
    svgMounted: false
  }),
  props: ['devicesMapSVGjsMarkup'],
  watch: {
    devicesMapSVGjsMarkup(newVal, oldVal) {
      
      this.svgMounted = true;
    }  
  },
  updated: function() {
    
      if (this.svgMounted) {
        var svgDivRef = this.$refs.powerSwitchesMapDiv;
        var svgDOMX = Array.from(svgDivRef.childNodes).filter(element => element.nodeName === "svg")[0];
        
        var gStyle = Array.from(svgDOMX.childNodes).filter(element => element.nodeName === "style")[0];
        var gDOMX = Array.from(svgDOMX.childNodes).filter(element => element.nodeName === "g")[0];
        var gElement = Array.from(gDOMX.childNodes).filter(element => element.nodeName === "g");
        this.svgMounted = false;
        
        debugger;

      }
  },
  methods: {
    
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
