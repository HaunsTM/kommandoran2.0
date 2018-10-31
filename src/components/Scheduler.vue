<template>
  <article>
		<full-calendar :config="calendarConfig" :events="events" />
  </article>
</template>
<script>


	//https://github.com/CroudTech/vue-fullcalendar

import Vue from 'vue';
import PowerSwitchesMap from "./PowerSwitchesMap.vue";
import { EventBus } from './event-bus.js';
import moment from "moment";
export default {
	components: {
	},	
	computed: {
		calendarConfig : {
			get: function() {
				let permanentConfiguration = {
					locale: "sv",
					slotLabelFormat: [
						//'MMMM YYYY', // top level of text
						'HH:mm'        // lower level of text
					],
					slotDuration: "00:15:00",
					schedulerLicenseKey: "GPL-My-Project-Is-Open-Source",
					defaultView: "timelineWeek",
					header: {
						left: "",
						center: "",
						right: ""
					},
					resourceColumns: [{
						group: true,
						labelText: 'System',
						field: 'system'
					},{
						labelText: 'Name',
						field: 'name'
					}]
				}

				let merged = {...this.telldusSchedulerOverview, ...permanentConfiguration};
				return merged;
			}
		},

		telldusSchedulerOverview : {
			get : function ()  {
				return that.bufferTelldusSchedulerOverview;
			},
			
			set : function (newTelldusSchedulerOverview) {
				let that = this;
				/*debugger;

				that.bufferTelldusSchedulerOverview = newTelldusSchedulerOverview.map( (curData) => {
						return {

TelldusAction_Active: null
TelldusUnitLocation_Name: "Vardagsrum"
TelldusUnitType_Name: "433 MHz - OnOff"
TelldusUnit_Active: {type: "Buffer", data: Array(1)}
TelldusUnit_Id: 1
TelldusUnit_LocationDesciption: "fönsterlampa"
TelldusUnit_Name: "1"
							"id" : curData.TelldusUnit_Id,
							"methods" : curDevData.methods,
							"name" : curDevData.name,
							"state" : shouldUseOldData ? previousDeviceData.state : curDevData.state,
							"statevalue" : shouldUseOldData ? previousDeviceData.statevalue : curDevData.statevalue,
							"type" : curDevData.type,
							"color" : shouldUseOldData ? previousDeviceData.color : that.getDisplayColor(curDevData.state), 
							"hoverText" : shouldUseOldData ? previousDeviceData.hoverText : that.getHoverText(curDevData.state),
							"updatedTime" : shouldUseOldData ? previousDeviceData.updatedTime : curUTC
						}
					});*/

			}
		}
	},
	created () {
		// fetch the data when the view is created and the data is
		// already being observed
		this.fetchData(); 
	},
	data() {
		return {
			bufferTelldusSchedulerOverview : {},
			events: [{
					title: "test",
					resourceId: "a",
					start: moment(),
					end: moment().add(1, "d")
				},{
					title: "test",
					resourceId: "a2",
					start: moment().add(2, "d"),
					end: moment().add(3, "d")
				}
			],
			config: {
				locale: "sv",
				slotLabelFormat: [
					//'MMMM YYYY', // top level of text
					'HH:mm'        // lower level of text
				],
				slotDuration: "00:15:00",
				schedulerLicenseKey: "GPL-My-Project-Is-Open-Source",
				defaultView: "timelineWeek",
				header: {
					left: "",
					center: "",
					right: ""
				},
				resourceLabelText: "Rooms",
				resources: [{
					id: "a",
					title: "Room A",
					children: [	{
						id: "a1",
						title: "Room A1"
					},{
						id: "a2",
						title: "Room A2"
					}]
				}]
			}
		};
	},
	methods: {
		fetchData : function () {
        	this.setLoadingState(true);
			let that = this;
			const promises = [         
				Vue.axios.get(this.$DB_API_BASE_URL + '?procedure=GetRepetitiveOnlyTelldusSchedulerOverview')
			];
			Promise.all(promises)
			.then((response) => {
            	this.setLoadingState(false);
				that.telldusSchedulerOverview = response[0].data[1];
			})
			.catch((error) => {
            	this.setLoadingState(false, error);
			});
		},
		setLoadingState: function (loading, error) {
			let payLoad =  { "isLoading" : loading, "error" : error };
			EventBus.$emit('loading', payLoad);
		},	
	}
}
</script>
<style scoped>

</style>
