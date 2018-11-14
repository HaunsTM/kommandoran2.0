<template>
	<article>
		<v-layout row wrap class="hidden-md-and-up">
			<v-flex d-flex xs12>
				<full-calendar 
						class = "scheduler"
						v-if="this.bufferTelldusSchedulerOverview.length > 0" 
						:config="calendarConfig" 
						:events="calendarEvents"
					/>
			</v-flex>
		</v-layout>
		<v-layout row wrap class="hidden-sm-and-down">
			
			<v-flex d-flex md12>

				<v-toolbar dense>

					<v-overflow-btn
					:items="dropdown_edit"
					editable
					label="Select system"
					hide-details
					class="pa-0"
					overflow
					></v-overflow-btn>

					<v-divider
					class="mr-2"
					vertical
					></v-divider>

					<v-btn-toggle v-model="multiple_select" class="transparent" multiple>

						<span>BROADEN<br/>EVENT</span>
						<v-tooltip bottom>
							<v-btn :value="1" flat slot="activator">
								<v-icon >more_horiz</v-icon>
							</v-btn>
							<span>Add created event to multiple days</span>
						</v-tooltip>

						<v-tooltip bottom>
							<v-btn :value="2" flat slot="activator">
								<v-icon>more_vert</v-icon>
							</v-btn>
							<span>Add created event to all units </span>
						</v-tooltip>

					</v-btn-toggle>

					<v-divider	class="mx-2" vertical></v-divider>

					<v-btn-toggle v-model="multiple_select" class="transparent">
						<span>ADD<br/>DAYS</span>
						<v-tooltip bottom>
							<v-btn :value="mon_fri" flat slot="activator">
								<v-icon>work</v-icon>
							</v-btn>
							<span>Tooltip</span>
						</v-tooltip>

						<v-tooltip bottom>
							<v-btn :value="sat_sun" flat slot="activator">
								<v-icon>weekend</v-icon>
							</v-btn>
							<span>Tooltip</span>
						</v-tooltip>
					</v-btn-toggle>

				</v-toolbar>


			</v-flex>
			<v-flex d-flex md12>
				<full-calendar 
					class = "scheduler"
					v-if="this.bufferTelldusSchedulerOverview.length > 0" 
					:config="calendarConfig" 
					:events="calendarEvents"

					@event-selected = "eventSelected"
					@event-drop = "eventDrop"
					@event-resize = "eventResize"
					@event-created = "eventCreated"
					@event-receive = "eventReceive"
					@event-render = "eventRender"
					@view-render = "viewRender"
					@day-click = "dayClick"
				/>
			</v-flex>
		</v-layout>
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
		calendarConfig : function () {
			
				let permanentConfiguration = {
					locale: "sv",					
					schedulerLicenseKey: "GPL-My-Project-Is-Open-Source",
					height: "parent",
					slotLabelFormat: [
						'dddd', // top level of text
						'HH:mm'        // lower level of text
					],
					defaultView: "timelineWeek",
					slotDuration: "00:15:00",
					minTime: this.$FULLCALENDAR_DEFAULT_START_DATE_MONDAY,
  maxTime: this. FULLCALENDAR_DEFAULT_END_DATE_SUNDAY,
					defaultDate: '2018-07-06',
					header: {
						left: "",
						center: "",
						right: ""
					},					
					resourceGroupField: 'telldusUnitLocationName',
					resourceColumns: [{	labelText: 'Name',	field: 'telldusUnitName' } ,{ labelText: 'Location', field: 'telldusUnitLocationDesciption'	}],
					editable: "true",
					selectable: "true"
				}

				let variableResources = this.$_(this.bufferTelldusSchedulerOverview)
					.sortBy(['TelldusUnitLocation_Name', 'TelldusUnitType_Name', 'TelldusUnit_Name', 'TelldusUnit_LocationDesciption'])
					.map( (u) => {
						let unit = {
							id : "\"" + u.TelldusUnit_Id + "\"",
							telldusUnitLocationName : u.TelldusUnitLocation_Name,
							telldusUnitName : u.TelldusUnit_Name,
							telldusUnitTypeName : u.TelldusUnitType_Name,
							telldusUnitActive : u.TelldusUnit_Active,
							telldusActionActive : u.TelldusAction_Active,
							telldusUnitId : u.TelldusUnit_Id,
							telldusUnitLocationDesciption : u.TelldusUnit_LocationDesciption
						};
						
						return unit;
					})
					.value();

				if(variableResources && variableResources.length > 1) {
					let merged = permanentConfiguration;
					merged.resources = variableResources;
					return merged;
				}
		},
		calendarEvents : () => {
			let events = [
				{ id: '1', resourceId: 'b', start: '2018-04-07T02:00:00', end: '2018-04-07T07:00:00', title: 'event 1' },
				{ id: '2', resourceId: 'c', start: '2018-04-07T05:00:00', end: '2018-04-07T22:00:00', title: 'event 2' },
				{ id: '3', resourceId: 'd', start: '2018-04-06', end: '2018-04-08', title: 'event 3' },
				{ id: '4', resourceId: 'e', start: '2018-04-07T03:00:00', end: '2018-04-07T08:00:00', title: 'event 4' },
				{ id: '5', resourceId: 'f', start: '2018-04-07T00:30:00', end: '2018-04-07T02:30:00', title: 'event 5' }
			];
			return events;
		},	 
	},
	created () {
		// fetch the data when the view is created and the data is
		// already being observed
		this.fetchData(); 
	},
	data() {
		return {
			bufferTelldusSchedulerOverview : {}

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
				that.bufferTelldusSchedulerOverview = response[0].data[1];
			})
			.catch((error) => {
				this.setLoadingState(false, error);
			});
		},
		setLoadingState: function (loading, error) {
			let payLoad =  { "isLoading" : loading, "error" : error };
			EventBus.$emit('loading', payLoad);
		},
		eventSelected(event, jsEvent, view) {
			console.log("eventSelected");
			console.log(event);
		},
		eventDrop(event) {
			console.log("eventDrop");
			console.log(event);
		},
		eventResize(event) {
			console.log("eventResize");
			console.log(event);
		},
		eventCreated(event) {
			console.log("eventCreated");
			console.log(event);
		},
		eventReceive(event) {
			console.log("eventReceive");
			console.log(event);
		},
		eventRender(event) {
			console.log("eventRender");
			console.log(event);
		},
		viewRender(view, element) {
			console.log("viewRender");
			console.log(view);
			console.log(element);
		},
		dayClick(date, jsEvent, view) {
			console.log("dayClick");
			console.log(date);
			console.log(jsEvent);
			console.log(view);
		}
	}
}
</script>




<style scoped>
	.scheduler {
		font-size: 10px;
		height: calc(100vh - 11rem);
	}
	.scheduler >>> tbody.fc-body{
		height: 100%;
	}
	
	.scheduler > fc-cell-content {
		margin-top : 1px;
		margin-bottom: 1px;
	}
	.scheduler >>> .fc-divider .fc-cell-text { 
		/* https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors */
		
		font-size: larger;
		color: #2f2f2f;
	}
</style>
