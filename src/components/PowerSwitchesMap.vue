<template>
  <div>
    <!--<div id="powerSwitchesMapDiv" ref="powerSwitchesMapDiv"
    v-html="devicesMapSVGjsMarkup"></div>-->
      <div class="svg-image-container" >
        <div class="svg-image"  id="powerSwitchesMapDiv" ref="powerSwitchesMapDiv"
    v-html="devicesMapSVGjsMarkup"></div>
      </div>
  </div>
</template>
<script>


export default {
  name: "PowerSwitchesMap",
  data: () => ({
    devicesMapSVGjsObject: {},
    domElement: {},
    svgMounted: false,
    tellstickElements: {}
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
        
        this.tellstickElements =  this.getMapReferences(svgDivRef)
        this.svgMounted = false;
        
        this.setPowerSwitchColor(this.tellstickElements[0], "red")
        
        this.setPowerSwitchText(this.tellstickElements[0], "sdfgsxdfg")
        
        this.addPowerSwitchEventHandlers(this.tellstickElements[0])
      }
  },
  methods: {
    getMapReferences: function(refToSVGDiv) {
        let svgDOMX = Array.from(refToSVGDiv.childNodes).filter(curNode => curNode.nodeName === "svg")[0];
         
        let gDOMX = Array.from(svgDOMX.childNodes).filter(curNode => curNode.nodeName === "g")[0];
        let gElements = Array.from(gDOMX.childNodes).filter(curNode => curNode.nodeName === "g" && /^shape.+/.test(curNode.id));

        let tellstickElements = gElements.map( node => ({               
            element: node,
            children: {
                path: Array.from(node.children).filter(node => node.nodeName === "path")[0],
                text: Array.from(node.children).filter(node => node.nodeName === "text")[0]
             }
          })
        );
        /**
         *         tellstickElements[0].element.addEventListener("mouseup", () => {alert("Hello")});
        tellstickElements[0].children.text.textContent="5";
        
        tellstickElements[0].children.path.setAttribute("style","fill: yellow");
         */
        return tellstickElements;
    },
    setPowerSwitchColor: function(tellstickElement, color) {
      tellstickElement.children.path.setAttribute("style","fill: " + color);
    },
    setPowerSwitchText: function(tellstickElement, text) {
      tellstickElement.children.text.textContent=text;
    },
    addPowerSwitchEventHandlers: function(tellstickElement) {
        tellstickElement.element.addEventListener("mouseup", () => {alert("Hello")});
    },
    removePowerSwitchEventHandlers: function(tellstickElement) {

    }
  }
}
</script>
<style scoped>
 .svg-image-container {
    width: 20rem;
  } 
  .svg-image {
    width: 100%;
    height: 0;
    padding: 0; /* reset */
    padding-bottom: 100%;
  }
  .devices-map {
    background-image: url("/static/devices-map.svg");
  }
</style>
