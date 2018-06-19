<template>
  <div>
      <div class="svg-image-container" >
        <div id="powerSwitchesMapDiv"
             class="svg-image"  
             ref="powerSwitchesMapDiv"
             v-html="devicesMapSVGjsMarkup">
        </div>
      </div>
  </div>
</template>
<script>


export default {
  name: "PowerSwitchesMap",
  data: () => ({
    devicesMapSVGjsObject: {},
    svgMounted: false
  }),
  props: ['devicesMapSVGjsMarkup',  
          'devices'],
  watch: {
    devicesMapSVGjsMarkup(newVal, oldVal) {
      
      this.svgMounted = true;
    }  
  },
  updated: function() {
    console.log('Updated!  ')
      if (this.svgMounted) {
      }
      this.$nextTick(function () {
        this.initialize();
    })
  },
  methods: {
    initialize: function(){

        var svgDivRef = this.$refs.powerSwitchesMapDiv;
        
        this.devicesMapSVGjsObject =  this.getSVGReferences(svgDivRef)
        this.updateDevicesStatuses();
        this.svgMounted = false;

        this.setSVGViewPortSize();
        //this.setSVGPreserveAspectRatio("xMaxYMax");
        //this.setSVGDisplayStyle("inline");
        this.setPowerSwitchCursor(this.devicesMapSVGjsObject.tellstickElements[0], "pointer")


        let t = this.getTellstickElement("10");
        this.setPowerSwitchColor(this.devicesMapSVGjsObject.tellstickElements[0], "red")        
        this.setPowerSwitchText(this.devicesMapSVGjsObject.tellstickElements[0], "19")
        this.setPowerSwitchHoverText(this.devicesMapSVGjsObject.tellstickElements[0], "235235")        
        
        window.addEventListener('resize', this.setSVGViewPortSize);

    },
    getSVGReferences: function(refToSVGDiv) {
        let svgDOMX = Array.from(refToSVGDiv.childNodes).filter(curNode => curNode.nodeName === "svg")[0];
         
        let gDOMX = Array.from(svgDOMX.childNodes).filter(curNode => curNode.nodeName === "g")[0];
        let gElements = Array.from(gDOMX.childNodes).filter(curNode => curNode.nodeName === "g" && /^shape.+/.test(curNode.id));
        let tellstickElements = gElements.map( node => ({               
            node: node,
            textContent: Array.from(node.children).filter(node => node.nodeName === "text")[0].textContent,
            children: {
                path: Array.from(node.children).filter(node => node.nodeName === "path")[0],
                text: Array.from(node.children).filter(node => node.nodeName === "text")[0],
                title: Array.from(node.children).filter(node => node.nodeName === "title")[0]
             }
          })
        );
        svgDOMX.tellstickElements = tellstickElements;
        return svgDOMX;
    },
    getTellstickElement: function(textContent) {
      //returns first found element based on textContent 
      let foundTellstickElement = this.devicesMapSVGjsObject.tellstickElements.find(x => x.textContent === textContent);
      return foundTellstickElement;
    },

    setSVGViewPortSize: function() {
      
      let height = "100%";//document.documentElement.clientHeight;
      let width = "100%"; // document.documentElement.clientWidth;
      
      height = //height * 0.5;
      width = width * 0.5;
      
      this.devicesMapSVGjsObject.setAttribute("height", height);
      this.devicesMapSVGjsObject.setAttribute("width", width);
    },
    setSVGPreserveAspectRatio: function(value) {
      this.devicesMapSVGjsObject.setAttribute("preserveAspectRatio", value);
    },
    setSVGDisplayStyle: function(displayStyle) {
      this.devicesMapSVGjsObject.setAttribute("style", "display: " + displayStyle);
    },
    setPowerSwitchColor: function(tellstickElement, color) {
      tellstickElement.children.path.setAttribute("style","fill: " + color);
    },
    setPowerSwitchText: function(tellstickElement, text) {
      tellstickElement.children.text.textContent=text;
    },
    setPowerSwitchHoverText: function(tellstickElement, text) {
      tellstickElement.children.title.textContent=text;
    },    
    setPowerSwitchCursor: function(tellstickElement, cursor) {
      tellstickElement.node.setAttribute("cursor", cursor);
    },
    addPowerSwitchEventHandlers: function(tellstickElement) {
        tellstickElement.node.addEventListener("mouseup", () => {alert("Hello")});
    },
    updateDevicesStatuses : function() {
      let that = this;
      that.devices.tellstickElements.forEach(element => {
        var currentTellstickElement = that.getTellstickElement(element.textContentIdentifier);

        this.setPowerSwitchColor(currentTellstickElement, element.color);
        this.setPowerSwitchHoverText(currentTellstickElement, element.hoverText);
      });
    },
    removePowerSwitchEventHandlers: function(tellstickElement) {

    }
  },
  
  beforeDestroy() {
    window.removeEventListener('resize', this.setSVGViewPortSize);
  }
}
</script>
<style scoped>
 .svg-image-container {
    width: 24rem;
    border: 1px solid red;

  } 
  #powerSwitchesMapDiv{
    border: 1px solid blue;
  }
</style>
