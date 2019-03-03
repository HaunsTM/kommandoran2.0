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

	/*https://www.npmjs.com/package/vue-simple-svg*/
	export default {
	name: "PowerSwitchesMap",
	data: () => ({
		devicesMapSVGjsObject: {},
		svgMounted: false
	}),
	props: ['devicesMapSVGjsMarkup',  
			'devices',
		'visibleItems'],
	watch: {
		devices( ) {
			if (this.svgMounted) {
				this.updateDevicesStatuses();
			}
		},

		visibleItems( ) {		
			if ( this.svgMounted ) {
				this.updateDevicesStatuses();
			}
		},
	},
	updated: function() {
		
		this.$nextTick(function () {
			this.initialize();
		})
	},

	methods: {
		initialize: function(){

			var svgDivRef = this.$refs.powerSwitchesMapDiv;
			
			this.devicesMapSVGjsObject =  this.getSVGReferences(svgDivRef)
			this.updateDevicesStatuses();
			this.svgMounted = true;

			this.setSVGViewPortSize();

			this.addPowerSwitchesEventHandlers();

			window.addEventListener('resize', this.setSVGViewPortSize);
			this.svgMounted = true;
		},
		getSVGReferences: function(refToSVGDiv) {
			let svgDOMX = Array.from(refToSVGDiv.childNodes).filter(curNode => curNode.nodeName === "svg")[0];        
			
			let gDOMX = Array.from(svgDOMX.childNodes).filter(curNode => curNode.nodeName === "g")[0];
			let gElements = Array.from(gDOMX.childNodes).filter(curNode => curNode.nodeName === "g" && /^shape.+/.test(curNode.id));
			let allInteractiveElements = 
			gElements.map( node => ({               
				node: node,
				name: Array.from(node.children).filter(node => node.nodeName === "text")[0].textContent,
				path: Array.from(node.children).filter(node => node.nodeName === "path")[0],
				rect: Array.from(node.children).filter(node => node.nodeName === "rect")[0],
				text: Array.from(node.children).filter(node => node.nodeName === "text")[0],
				title: Array.from(node.children).filter(node => node.nodeName === "title")[0],
				type: ( 
					function() {
						let name = Array.from(node.children).filter(node => node.nodeName === "text")[0].textContent;
						let title = Array.from(node.children).filter(node => node.nodeName === "title")[0];

						if (/^Circle.+/.test(title.innerHTML) && /^\d{1,}/.test(name)) {
							return "telldus433MHz";
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
			var array = this.devicesMapSVGjsObject.interactiveElements;
			var numberOfElements = array.length;
			for (let i = 0; i < numberOfElements; i++) {
			found = array[i].name === name;
			if (found) {
				return array[i];
			}
			}
		}
		return null;
		},
		setPowerswitchVisibility: function(svgNode, visible) {
			svgNode.node.removeAttribute("style");
			svgNode.node.style.visibility = visible ? "visible" : "hidden";

		},
		setSVGViewPortSize: function() {
		
			let svgDivRef = this.$refs.powerSwitchesMapDiv;
			let svgOriginalBox = this.devicesMapSVGjsObject.svgDOMX.getBBox();

			let originalWidth = svgOriginalBox.width;
			let originalHeight = svgOriginalBox.height;

			let divWidth = svgDivRef.clientWidth;
			// let divHeight = svgDivRef.clientHeight;

			let f = originalWidth > divWidth ? divWidth/originalWidth : 1;
			f *= 1.2;
			let width = originalWidth*f;
			let height = originalHeight*f;

			this.devicesMapSVGjsObject.svgDOMX.setAttribute("height", height);
			this.devicesMapSVGjsObject.svgDOMX.setAttribute("width", width);
			this.devicesMapSVGjsObject.svgDOMX.setAttribute("viewBox", "0 0 " + originalWidth + " " + originalHeight) ;
		
		},
		setSVGPreserveAspectRatio: function(value) {
			this.devicesMapSVGjsObject.svgDOMX.setAttribute("preserveAspectRatio", value);
		},
		setPowerSwitchColor: function(svgNode, color) {		
			switch (svgNode.type) {
				case "telldus433MHz":
					svgNode.path.setAttribute("style","fill: " + color);
					break;
				case "zWave":
					svgNode.rect.setAttribute("style","fill: " + color);
					break;
			}
		},
		setPowerSwitchText: function(telldusElement, text) {
			telldusElement.text.textContent = text;
		},
		setPowerSwitchHoverText: function(svgNode, text) {
			svgNode.title.textContent = text;
		},    
		setPowerSwitchCursor: function(element, cursor) {
			element.node.setAttribute("cursor", cursor);
		},
		addPowerSwitchesEventHandlers: function() {			
			let that = this;
			this.devicesMapSVGjsObject.interactiveElements.forEach(
				(telldusElement) => {
					telldusElement.node.addEventListener("mouseup", () => {that.$emit('powerSwitchClick', telldusElement)});
				}
			);
		},
		updateDevicesStatuses : function() {
			let that = this;
			if (this.devices.length)
			{
				this.devices.forEach(element => {          
					let svgNode = that.getIdentifiedSVGNodeBy(element.name);
					if (svgNode) {
						that.setPowerSwitchColor(svgNode, element.color);
						
						let visible = that.visibleItems.includes(svgNode.type);
						that.setPowerswitchVisibility(svgNode, visible);
						that.setPowerSwitchHoverText(svgNode, element.hoverText);
						that.setPowerSwitchCursor(svgNode, element.cursor);
					}
				});
			}
		},
		removePowerSwitchesEventHandlers: function() {
			let that = this;
			this.devicesMapSVGjsObject.interactiveElements.forEach(
				(telldusElement) => {
					telldusElement.node.removeEventListener("mouseup", () => {that.$emit('powerSwitchClick', telldusElement)});        
				}
			);
		}
	},  
	beforeDestroy() {
		this.removePowerSwitchesEventHandlers();
		window.removeEventListener('resize', this.setSVGViewPortSize);
	}
}
</script>
<style scoped>
	.super {
		max-width: 100%;
	}
	.svg-image-container {
		width: 100%;
	} 
	#powerSwitchesMapDiv{
    	display: block;
	}
</style>
