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
      //this.$forceUpdate();
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
        //this.updateDevicesStatuses();
        this.svgMounted = false;

        this.setSVGViewPortSize();
        //this.setPowerSwitchCursor(this.devicesMapSVGjsObject.powerSwitches.tellstick[0], "pointer")


        let t = this.getIdentifiedSVGNodeBy("A1");
        this.setPowerSwitchColor(t, "red")        
        this.setPowerSwitchText(t, "19")
        this.setPowerSwitchHoverText(t, "235235")        
        
        window.addEventListener('resize', this.setSVGViewPortSize);

    },
    getSVGReferences: function(refToSVGDiv) {
      let svgDOMX = Array.from(refToSVGDiv.childNodes).filter(curNode => curNode.nodeName === "svg")[0];        
      
      let gDOMX = Array.from(svgDOMX.childNodes).filter(curNode => curNode.nodeName === "g")[0];
      let gElements = Array.from(gDOMX.childNodes).filter(curNode => curNode.nodeName === "g" && /^shape.+/.test(curNode.id));
      let allInteractiveElements = gElements.map( node => ({               
          node: node,
          name: Array.from(node.children).filter(node => node.nodeName === "text")[0].textContent,
          path: Array.from(node.children).filter(node => node.nodeName === "path")[0],
          rect: Array.from(node.children).filter(node => node.nodeName === "rect")[0],
          text: Array.from(node.children).filter(node => node.nodeName === "text")[0],
          title: Array.from(node.children).filter(node => node.nodeName === "title")[0],
          type: ( function() {
            let name = Array.from(node.children).filter(node => node.nodeName === "text")[0].textContent;
            let title = Array.from(node.children).filter(node => node.nodeName === "title")[0];

              if (/^Circle.+/.test(title.innerHTML) && /^\d{1,}/.test(name)) {
                  return "tellstick";
              } else if (/^Sheet.+/.test(title.innerHTML) && /^[A-ZÅÄÖ]\d{1,}/.test(name)) {
                return "zWave";
              } else 
              return null;
          } )()
        })
      );
      return {
        interactiveElements: allInteractiveElements,
        svgDOMX: svgDOMX
      };
    },
    getIdentifiedSVGNodeBy: function(name) {
      //returns first found node based on name
      let found = false;

      if (!found) {
        var array = this.devicesMapSVGjsObject.powerSwitches.tellstick;
        var numberOfElements = array.length;

        for (let i = 0; i < numberOfElements; i++) {
          found = array[i].name === name;
          if (found) {
            return array[i];
          }
        }
      }
      
      if (!found) {
        var array = this.devicesMapSVGjsObject.powerSwitches.zWave;
        var numberOfElements = array.length;

        for (let i = 0; i < numberOfElements; i++) {
          found = array[i].name === name;
          if (found){
            return array[i];
          }
        }
      }

      return null;
    },

    setSVGViewPortSize: function() {
      
      let svgDivRef = this.$refs.powerSwitchesMapDiv;
      let svgOriginalBox = this.devicesMapSVGjsObject.svgDOMX.getBBox();

      let originalWidth = svgOriginalBox.width;
      let originalHeight = svgOriginalBox.height;

      let divWidth = svgDivRef.clientWidth;
      let divHeight = svgDivRef.clientHeight;

      let f = originalWidth > divWidth ? divWidth/originalWidth : 1;
      let width = originalWidth*f;
      let height = originalHeight*f;
      
      this.devicesMapSVGjsObject.svgDOMX.setAttribute("style", "height: 100%; width: 100%;");
      this.devicesMapSVGjsObject.svgDOMX.setAttribute("height", height);
      this.devicesMapSVGjsObject.svgDOMX.setAttribute("width", width);
      this.devicesMapSVGjsObject.svgDOMX.setAttribute("viewBox", "0 0 " + originalWidth + " " + originalHeight) ;
    },
    setSVGPreserveAspectRatio: function(value) {
      this.devicesMapSVGjsObject.svgDOMX.setAttribute("preserveAspectRatio", value);
    },
    setSVGDisplayStyle: function(displayStyle) {
      this.devicesMapSVGjsObject.svgDOMX.setAttribute("style", "display: " + displayStyle);
    },
    setPowerSwitchColor: function(svgNode, color) {
      svgNode.path.setAttribute("style","fill: " + color);
    },
    setPowerSwitchText: function(tellstickElement, text) {
      tellstickElement.text.textContent=text;
    },
    setPowerSwitchHoverText: function(tellstickElement, text) {
      tellstickElement.title.textContent=text;
    },    
    setPowerSwitchCursor: function(element, cursor) {
      debugger;
      element.node.setAttribute("cursor", cursor);
    },
    addPowerSwitchEventHandlers: function(tellstickElement) {
        tellstickElement.node.addEventListener("mouseup", () => {alert("Hello")});
    },
    updateDevicesStatuses : function() {
      let that = this;
      that.devicesMapSVGjsObject.tellstickElements.forEach(element => {
        var currentTellstickElement = that.getIdentifiedSVGNodeBy(element.textContentIdentifier);

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
