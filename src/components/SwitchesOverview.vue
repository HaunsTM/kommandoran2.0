<template>
    
	<div class="invisible-scrollbar">
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
								<v-card-title>
									<div>
										<div class="title">Visible system</div>
										<div class="caption">System(-s) to be displayed</div>
									</div>
								</v-card-title>
								<v-divider light></v-divider>
								<v-card-actions>
									<v-btn-toggle v-model="visiblePowerswitchMapItems" multiple>
										<v-btn flat value="telldus433MHz">433 MHz</v-btn>
										<v-btn flat value="zWave">Z-Wave</v-btn>
									</v-btn-toggle>
								</v-card-actions>
							</v-card>
						</v-flex>
						<v-flex sm12>							
							<div class="scroll-parent-multi-switch-sm-and-up">
								<v-card>
									<v-card-title>
										<div>
											<div class="title">Multi switch</div>
											<div class="caption">Affect multiple switches</div>
										</div>
									</v-card-title>
									<v-divider light></v-divider>
									<v-card-actions>
										<div class="caption">All</div>
										<v-spacer></v-spacer>
										<v-btn-toggle v-model="multi_switch">
											<v-btn color="success" value="all_on">On</v-btn>
											<v-btn color="error" value="all_off">Off</v-btn>
										</v-btn-toggle>
									</v-card-actions>								
									<v-card-actions>
										<div class="caption">Comfort</div>
										<v-spacer></v-spacer>
										<v-btn-toggle v-model="multi_switch">
											<v-btn color="success" value="comfort_on">On</v-btn>
										</v-btn-toggle>
									</v-card-actions>
									<v-card-actions>
										<div class="caption">All Z-Wawe</div>
										<v-spacer></v-spacer>
										<v-btn-toggle v-model="multi_switch">
											<v-btn color="success" value="all_zwave_on">On</v-btn>
											<v-btn color="error" value="all_zwave_off">Off</v-btn>
										</v-btn-toggle>
									</v-card-actions>
									<v-card-actions>
										<div class="caption">All 433 MHz</div>
										<v-spacer></v-spacer>
										<v-btn-toggle v-model="multi_switch">
											<v-btn color="success" value="all_433_on">On</v-btn>
											<v-btn color="error" value="all_433_off">Off</v-btn>
										</v-btn-toggle>
									</v-card-actions>
								</v-card>
							</div>
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

import TelldusAction from "../helpers/TelldusAction"
import TelldusActionType from "../helpers/TelldusActionType"
import TelldusActionValue from "../helpers/TelldusActionValue"
import TelldusUnit from "../helpers/TelldusUnit"

export default {    
	name: "SwitchesOverview", 
	components: {
		PowerSwitchesMap
	},
	data: () => ({
		baseUrl: process.env.BASE_URL,
		bufferDevicesData: {},
		devicesMapSVGjsMarkup: "",
		visiblePowerswitchMapItems: ["telldus433MHz"],

		multi_switch : {}
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
				Vue.axios.get(this.$TELLDUS_API_BASE_URL + '?telldusActionTypeActionTypeOption=onOffDevice&telldusUnitName=' + currentDevice.name + '&telldusActionValueTypeName=levelValue&telldusActionValueActionValue=' + setPointState)
			];

			Promise.all(promises)
				.then((response) => {
					that.setLoadingState(false);
					let performedTelldusAction = response[0].data.TelldusAction;
					
					that.devicesData = that.devicesData.map( (d) => {
							if (d.name === performedTelldusAction.TelldusUnit.Name) {
								let state = performedTelldusAction.TelldusActionValue.ActionValue === 'on' ? 1 : 2;

								d.state = state;
								d.color = TelldusActionValue.getColor(state);
								d.hoverText = TelldusUnit.getHoverText(state);
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
		postTelldusActions: async function (jsonTelldusActions) {
			try {
				this.setLoadingState(true);
				await Vue.axios.post(this.$TELLDUS_API_BASE_URL, { "TelldusActions": jsonTelldusActions } );
				this.setLoadingState(false);
			} catch (ex) {				
				this.setLoadingState(false, ex);
			}
		},
		telldusActionsPreparedBy: function (orderedDevices, setPointState){
			let telldusActions = orderedDevices.map( d => {				
				const telldusUnit = new TelldusUnit( d.name );
				const actionTypeOption = setPointState === 'on' || setPointState === 'off' ? TelldusActionType.ActionTypeOption().ON_OFF_DEVICE : null ;
				const telldusActionType = new TelldusActionType(actionTypeOption);
				const telldusActionValue = setPointState;
				const telldusAction = new TelldusAction(telldusUnit, telldusActionType, telldusActionValue);

				return telldusAction;
			});
			return telldusActions;
		},
		setLoadingState: function (loading, error) {
			let payLoad =  { "isLoading" : loading, "error" : error };
			EventBus.$emit('loading', payLoad);
		},		
		setReceivedMQTTState: function (receiving, error) {
			let payLoad =  { "isReceiving" : receiving, "error" : error };
			EventBus.$emit('loading', payLoad);
		},		
		setAllDevices : async function (setPointState) {
			// setPointState = ['on','off']
			let orderedDevices;

			switch (setPointState) {				
				case "on": {
					orderedDevices = [...this.offDevices, ...this.onDevices];
					break;
				}
				case "off": {
					orderedDevices = [...this.onDevices, ...this.offDevices];					
					break;
				}
			}
			let telldusActions = this.telldusActionsPreparedBy(orderedDevices, setPointState)
			let jsonTelldusActions = telldusActions.map( d => { return {"TelldusAction": d.toJSONObject }; } );
			debugger;
			await this.postTelldusActions(jsonTelldusActions);
		},
		setAllComfortDevices : function(setPointState) {

		},
		setAllZwaveDevices : function(setPointState) {

		},
		setAll433MHzDevices : function(setPointState) {

		},
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
							"color" : shouldUseOldData ? previousDeviceData.color : TelldusActionValue.getColor(curDevData.state), 
							"hoverText" : shouldUseOldData ? TelldusUnit.getHoverText(previousDeviceData.name, previousDeviceData.state, previousDeviceData.statevalue, previousDeviceData.type, curUTC): TelldusUnit.getHoverText(curDevData.name, curDevData.state, curDevData.statevalue, curDevData.type, curUTC),
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
							"color" : TelldusActionValue.getColor(curDevData.state), 
							"hoverText" : TelldusUnit.getHoverText(curDevData.name, curDevData.state, curDevData.statevalue, curDevData.type, curUTC),
							"updatedTime" : curUTC
						}
					});
				}
			}
		},
		onDevices: function() {
			const onDevices = this.$_(this.devicesData).filter( d => {
				return d.state !== 2
			}).value();
			return onDevices;
		},
		offDevices: function() {
			const offDevices = this.$_(this.devicesData).filter( d => {
				return d.state === 2
			}).value();
			return offDevices;
		},
	},
	mqtt: {
		// subscribe to this topic for updates 
		'nodered/performed_TelldusAction/listDevices' ( data ) {
			let decoded = new TextDecoder("utf-8").decode( data );
			let decodedJSON = JSON.parse(decoded);
			this.devicesData = decodedJSON.successResult;			
		}
	},
	watch: {
		multi_switch: function(action) {
			switch(action) {
				case "all_on": {
					this.setAllDevices('on');
					break;
				}
				case "all_off": {
					this.setAllDevices('off');
					break;
				}
				case "comfort_on": {
					this.setAllDevices('on');
					break;
				}
				case "all_zwave_on": {
					this.setAllZwaveDevices('on');
					break;
				}
				case "all_zwave_off": {
					this.setAllZwaveDevices('off');
					break;
				}
				case "all_433_on": {
					this.setAll433MHzDevices('on');
					break;
				}
				case "all_433_off": {
					this.setAll433MHzDevices('on');
					break;
				}
				default: { 
					break;
				} 
			}
		}
	}
}
</script>
<style scoped>
	::-webkit-scrollbar {
		display: none;
	}

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

	.scroll-parent-multi-switch-sm-and-up {

        height: 16rem;
	}
	
</style>
