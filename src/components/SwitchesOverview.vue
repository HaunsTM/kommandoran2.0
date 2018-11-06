<template>
    
    <v-layout column>
      
          <PowerSwitchesMap v-bind:devicesMapSVGjsMarkup = "devicesMapSVGjsMarkup" v-bind:devices="devicesData" v-on:powerSwitchClick="onPowerSwitchClick">
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
		bufferDevicesData: {}
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
				Vue.axios.get(this.$TELLDUS_API_BASE_URL + '?telldusActionTypeActionTypeOption=listDevices')
			];
			Promise.all(promises)
			.then((response) => {
            	this.setLoadingState(false);
				that.devicesMapSVGjsMarkup = response[0].data;
				that.devicesData = response[1].data.successResult;
			})
			.catch((error) => {
            	this.setLoadingState(false, error);
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
			let currentDevice = this.devicesData.find( (e) => {
				if (e.name === currentTellstickElement.name) {
					return e;
				}
			});
			
			let toggledState = currentDevice.state === 2 ? 'on' : 'off';
			this.onOffDevice(currentDevice, toggledState);
		},	
		onOffDevice: function (currentDevice, setPointState) {
			let that = this;			
        	this.setLoadingState(true);

			const promises = [    
				Vue.axios.get(this.$TELLDUS_API_BASE_URL + '?telldusActionTypeActionTypeOption=onOffDevice&telldusUnitName=' + currentDevice.name + '&telldusActionValueTypeName=command&telldusActionValueActionValue=' + setPointState)
			];

			Promise.all(promises)
				.then((response) => {
					that.setLoadingState(false);
					let performedTelldusAction = response[0].data.TelldusAction;
					
					that.devicesData = that.devicesData.map( (d) => {
							if (d.name === performedTelldusAction.TelldusUnit.Name) {
								
								let curUTC = new Date().getTime();
								let state = performedTelldusAction.TelldusActionValue.ActionValue === 'on' ? 1 : 2;

								d.state = state;
								d.color = that.getDisplayColor(state);
								d.hoverText = that.getHoverText(state);
								d.updatedTime = new Date().getTime();

								return d;
							}
							return d;
						});
				})
				.catch((error) => {
					that.setLoadingState(false, error);
				});
		},
		setLoadingState: function (loading, error) {
			let payLoad =  { "isLoading" : loading, "error" : error };
			EventBus.$emit('loading', payLoad);
		},		
		setReceivedMQTTState: function (receiving, error) {
			let payLoad =  { "isReceiving" : receiving, "error" : error };
			EventBus.$emit('loading', payLoad);
		}
	},
	computed: {
		devicesData : {
			get : function ()  {
				return this.bufferDevicesData;
			},
			
			set : function (newDevicesData) {
				let curUTC = new Date().getTime();
				let that = this;
				if (that.bufferDevicesData.length) {
					that.bufferDevicesData = newDevicesData.map( (curDevData) => {
						let previousDeviceData = that.bufferDevicesData.find( (bufferedElement) => { 
							if (bufferedElement.id === curDevData.id) return bufferedElement; });
						let shouldUseOldData = (curUTC - previousDeviceData.updatedTime) < 5*1000;
						return {
							"id" : shouldUseOldData ? previousDeviceData.id : curDevData.id,
							"methods" : curDevData.methods,
							"name" : curDevData.name,
							"state" : shouldUseOldData ? previousDeviceData.state : curDevData.state,
							"statevalue" : shouldUseOldData ? previousDeviceData.statevalue : curDevData.statevalue,
							"type" : curDevData.type,
							"color" : shouldUseOldData ? previousDeviceData.color : that.getDisplayColor(curDevData.state), 
							"hoverText" : shouldUseOldData ? previousDeviceData.hoverText : that.getHoverText(curDevData.state),
							"updatedTime" : shouldUseOldData ? previousDeviceData.updatedTime : curUTC,
							"cursor" : "pointer"
						}
					});
				} else {
					that.bufferDevicesData = newDevicesData.map( (curDevData) => {						
						return {
							"id" : curDevData.id,
							"methods" : curDevData.methods,
							"name" : curDevData.name,
							"state" : curDevData.state,
							"statevalue" : curDevData.statevalue,
							"type" : curDevData.type,
							"color" : that.getDisplayColor(curDevData.state), 
							"hoverText" : that.getHoverText(curDevData.state),
							"updatedTime" : curUTC
						}
					});
				}
			}
		}
	},
	mqtt: {
		// subscribe to this topic for updates 
		'nodered/performed_TelldusAction/listDevices' (data, topic) {
			let decoded = new TextDecoder("utf-8").decode(data);
			let decodedJSON = JSON.parse(decoded);
			this.devicesData = decodedJSON.successResult;			
		}
	}
}
</script>
<style scoped>

</style>
