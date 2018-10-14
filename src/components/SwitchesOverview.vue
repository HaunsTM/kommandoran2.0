<template>
    
    <v-layout column>
      
          <PowerSwitchesMap v-bind:devicesMapSVGjsMarkup = "devicesMapSVGjsMarkup" v-bind:devices="preparedCurrentDevicesData" v-on:powerSwitchClick="onPowerSwitchClick">
          </PowerSwitchesMap>
    </v-layout>
</template>

<script>

import Vue from 'vue';
import PowerSwitchesMap from "./PowerSwitchesMap.vue";
import { EventBus } from './event-bus.js';

export default {    
	name: "SwitchesOverview",
	components: {
		PowerSwitchesMap
	},
	data: () => ({
		baseUrl: process.env.BASE_URL,
		devicesMapSVGjsMarkup: "",
		unpreparedCurrentDevicesData: {}
	}),  
	created () {
		// fetch the data when the view is created and the data is
		// already being observed
		this.fetchData();
	},
	methods: {
		fetchData : function () {
        	this.setLoadingState(true);
			let that = this;
			const promises = [
         		Vue.axios.get(this.baseUrl + 'devices-map.svg'),          
				Vue.axios.get(this.$API_BASE_URL + '?telldusActionTypeActionTypeOption=listDevices')
			];
			Promise.all(promises)
			.then((response) => {
            	this.setLoadingState(false);
				that.devicesMapSVGjsMarkup = response[0].data;
				that.unpreparedCurrentDevicesData = response[1].data;
			})
			.catch((error) => {
            	this.setLoadingState(false, error);
				console.log(error);
			});
		},
		getDisplayColor : function (state){
			switch (state) {
				case 1 :
					return "yellow";
				case 2 :
					return "gray";
				default :
					return "red";
			}
		},
		getHoverText : function (state) {
			switch (state) {
				case 1 :
					return "on";
				case 2 :
					return "off";
				default :
					return "unknown state";
			}
		},
		onPowerSwitchClick : function (currentTellstickElement)  {
			let currentDevice = this.preparedCurrentDevicesData.find( (e) => {
				if (e.name === currentTellstickElement.name) {
					return e;
				}
			} )
			console.log('Clicked on ' + currentTellstickElement.name + ' (state: ' + currentDevice.state + ')');			
		},		
		setLoadingState: function (loading, error) {
			this.loading = loading;
			let payLoad =  { "isLoading" : loading, "error" : error };
			EventBus.$emit('loading', payLoad);
		}
  	},  
	computed: {
		preparedCurrentDevicesData : function() {
			if (this.unpreparedCurrentDevicesData.successResult)
			{
				let preparedCurrentDevicesData = this.unpreparedCurrentDevicesData.successResult.map( (e) => {
					//console.log("Name: " + e.name + "; State: "+ e.state + " (" + this.getDisplayColor(e.state) + ");")
					return {
						"id" : e.id,
						"methods" : e.methods,
						"name" : e.name,
						"state" : e.state,
						"statevalue" : e.statevalue,
						"type" : e.type,
						"color" : this.getDisplayColor(e.state), 
						"hoverText" : this.getHoverText(e.state)
					}
				});
				return preparedCurrentDevicesData;
			}
			return {};
		}
	}
}
</script>
<style scoped>

</style>
