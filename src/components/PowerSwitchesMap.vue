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
        
        this.getMapReferences(svgDivRef)
        this.svgMounted = false;
        
        debugger;

      }
  },
  methods: {
    getMapReferences: function(refToSVGDiv) {
        var svgDOMX = Array.from(refToSVGDiv.childNodes).filter(curNode => curNode.nodeName === "svg")[0];
         
        var gDOMX = Array.from(svgDOMX.childNodes).filter(curNode => curNode.nodeName === "g")[0];
        var gElements = Array.from(gDOMX.childNodes).filter(curNode => curNode.nodeName === "g" && /^shape.+/.test(curNode.id));

        var tellstickElements = gElements.map( node => ({ 
               
            id: node.id,
            htmlNodes: {
                desc: Array.from(node.children).filter(node => node.nodeName === "desc")[0],
                text: Array.from(node.children).filter(node => node.nodeName === "text")[0]
             }
          })
        );
        debugger;
        gElements[11].addEventListener("mouseup", () => {alert("Hello")});
tellstickElements[5].htmlNodes.text.textContent="45654";
        gElements[4].children[5].setAttribute("style","fill: yellow")

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
