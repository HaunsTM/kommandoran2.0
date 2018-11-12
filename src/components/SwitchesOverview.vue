<template>
    
	<div>
		<v-layout row wrap class="hidden-sm-and-up">
			<v-flex d-flex xs12>
				<div class="scroll-parent-xs">
					<PowerSwitchesMap
						class="scroll-child"
						v-bind:devicesMapSVGjsMarkup = "devicesMapSVGjsMarkup" 
						v-bind:devices = "devicesData"
						v-bind:visibleItems = "visiblePowerswitchMapItems"
						v-on:powerSwitchClick="onPowerSwitchClick">
					</PowerSwitchesMap>
				</div>
			</v-flex>
			<v-flex xs12 class="py-2">
				<p>Display System</p>
				<v-btn-toggle v-model="visiblePowerswitchMapItems" multiple>
					<v-btn flat value="telldus433MHz">433 MHz</v-btn>
					<v-btn flat value="zWave">Z-Wave</v-btn>
				</v-btn-toggle>
			</v-flex>
		</v-layout>


		
		<v-layout row wrap class="hidden-xs-only">
			
			<v-flex d-flex sm9>
				<div class="scroll-parent-sm-and-up">
					<PowerSwitchesMap
						class="scroll-child"
						v-bind:devicesMapSVGjsMarkup = "devicesMapSVGjsMarkup" 
						v-bind:devices = "devicesData"
						v-bind:visibleItems = "visiblePowerswitchMapItems"
						v-on:powerSwitchClick="onPowerSwitchClick">
					</PowerSwitchesMap>
				</div>
			</v-flex>
			<v-flex sm3>
				
				<div class="scroll-parent-sm-and-up">

					<v-layout row wrap class="scroll-child">
						<v-flex sm12>

							<v-card>
								<v-img
									class="white--text"
									height="200px"
									src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
								>
									<v-container fill-height fluid>
									<v-layout fill-height>
										<v-flex xs12 align-end flexbox>
										<span class="headline">Top 10 Australian beaches</span>
										</v-flex>
									</v-layout>
									</v-container>
								</v-img>
								<v-card-title>
									<div>
									<span class="grey--text">Number 10</span><br>
									<span>Whitehaven Beach</span><br>
									<span>Whitsunday Island, Whitsunday Islands</span>
									</div>
								</v-card-title>
								<v-card-actions>
									<v-btn flat color="orange">Share</v-btn>
									<v-btn flat color="orange">Explore</v-btn>
								</v-card-actions>
							</v-card>

						</v-flex>
						<v-flex sm12>						
							<p>Display System</p>
							<v-btn-toggle v-model="visiblePowerswitchMapItems" multiple>
								<v-btn flat value="telldus433MHz">433 MHz</v-btn>
								<v-btn flat value="zWave">Z-Wave</v-btn>
							</v-btn-toggle>
						</v-flex>
					</v-layout>
				</div>
			</v-flex>
		</v-layout>
		
	</div>

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
		bufferDevicesData: {},
		devicesMapSVGjsMarkup: "",
		visiblePowerswitchMapItems: ["telldus433MHz"]
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
			//https://vuetifyjs.com/en/style/colors
			let color = "";
			if (state === 1) {
				//on yellow 
				color = "#FFEB3B";
			} else if (state === 2) {
				//off grey lighten-1
				color = "#BDBDBD";
			} else if (2 < state && state < 10)  {
				// yellow lighten-5
				color = "#FFFDE7";
			} else if (10 <= state && state < 20)  {
				// yellow lighten-5
				color = "#FFFDE7";
			} else if (20 <= state && state < 30)  {
				// yellow lighten-4
				color = "#FFF9C4";
			} else if (30 <= state && state < 40)  {
				// yellow lighten-4
				color = "#FFF9C4";
			} else if (40 <= state && state < 50)  {
				// yellow lighten-3
				color = "#FFF59D";
			} else if (50 <= state && state < 60)  {
				// yellow lighten-3
				color = "#FFF59D";
			} else if (60 <= state && state < 70)  {
				// yellow lighten-2
				color = "#FFF176";
			} else if (70 <= state && state < 80)  {
				// yellow lighten-2
				color = "#FFF176";
			} else if (80 <= state && state < 90)  {
				// yellow lighten-1
				color = "#FFEE58";
			} else if (90 <= state && state < 100) {
				// yellow lighten-1
				color = "#FFEE58";
			} else {
				// red
				color = "#F44336";
			}
			return color;
		},		
		getHoverText : function (name, state, statevalue, type, curUTC) {
			let hoverText = "";
			
			hoverText += "Name: " + name + "\n";

			hoverText += "State: ";
				if (state === 1) {
					//on 
					hoverText += "on (full)";
				} else if (state === 2) {
					//off
					hoverText += "off";
				} else if (2 < state && state <= 100)  {
					// on
					hoverText += "partially on (" + state + " %)";
				} else {
					// red
					hoverText += "unknown state (" + state + ")";
				}			
			hoverText += "\n";
			
			hoverText += "Type: " + type + "\n";
			hoverText += "Last updated: " + new Date(curUTC).toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' });

			return hoverText;
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
							"hoverText" : shouldUseOldData ? that.getHoverText(previousDeviceData.name, previousDeviceData.state, previousDeviceData.statevalue, previousDeviceData.type, curUTC): that.getHoverText(curDevData.name, curDevData.state, curDevData.statevalue, curDevData.type, curUTC),
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
							"hoverText" : that.getHoverText(curDevData.name, curDevData.state, curDevData.statevalue, curDevData.type, curUTC),
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
	.scroll-parent-xs {
        height: calc(100vh - 45vh);
		overflow: hidden;
	}
	
	.scroll-parent-sm-and-up {
        height: calc(100vh - 112px);
		overflow: hidden;
	}
	.scroll-child {
		height: 100%;
		overflow: scroll;
	}
</style>
