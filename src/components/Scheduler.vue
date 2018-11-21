<template>
	<article>
		<v-layout row wrap class="hidden-md-and-up">
			<v-flex d-flex xs12>
				<!--
				<full-calendar 
						class = "scheduler"
						v-if="!$vuetify.breakpoint.mdAndUp && this.bufferTelldusSchedulerOverview.length > 0" 
						:config="calendarConfig" 
						:events="calendarEvents"
					/>

-->
			</v-flex>
		</v-layout>

		<v-layout row wrap class="hidden-sm-and-down">
			
			<v-flex d-flex md12>
<!--
-->
				<v-toolbar dense>

					<v-tooltip bottom>
						<v-btn v-on:click="save" flat slot="activator">									
							<v-icon>save</v-icon>
						</v-btn>
						<span>Add created event to all units </span>
					</v-tooltip>

					<v-divider class="mr-2"	vertical></v-divider>

					<v-overflow-btn
						v-bind:items="dropdown_system"
						editable
						label="Select system"
						hide-details
						class="pa-0"
						overflow
					></v-overflow-btn>

					<v-divider class="mr-2"	vertical></v-divider>

					<v-btn-toggle v-model="selectionShouldAffectAllUnits" class="transparent" multiple>
						<v-tooltip bottom>
							<v-btn v-bind:value="1" flat slot="activator" class="toolbar-button-image">									
								<img v-bind:src="require(`@/assets/all_units24x24.png`)"/>
							</v-btn>
							<span>Add created event to all units </span>
						</v-tooltip>
					</v-btn-toggle>

					<v-divider class="mx-2" vertical></v-divider>

					<v-btn-toggle v-model="selectionShouldAffectMultipleDays" class="transparent" multiple>
						<v-tooltip bottom>
							<v-btn v-bind:value="1" flat slot="activator" class="toolbar-button-image">									
								<img v-bind:src="require(`@/assets/mon_fri24x24.png`)"/>
							</v-btn>
							<span>Monday to Friday</span>
						</v-tooltip>
						<v-tooltip bottom>
							<v-btn v-bind:value="2" flat slot="activator" class="toolbar-button-image">
								<img v-bind:src="require(`@/assets/sat_sun24x24.png`)"/>
							</v-btn>
							<span>Weekend</span>
						</v-tooltip>
					</v-btn-toggle>

				</v-toolbar>
			</v-flex>

			<v-flex d-flex md12>
				<DayPilotScheduler id="dp" :config="config" />
			</v-flex>

		</v-layout>
	</article>
</template>
<script>


	//https://github.com/CroudTech/vue-fullcalendar

import Vue from 'vue';
import {DayPilotScheduler} from 'daypilot-pro-vue'
import { EventBus } from './event-bus.js';
import moment from "moment";
export default {
	components: {		
    	DayPilotScheduler 
	},	
	computed: {

		config: function() {
			timeHeaders: [
				{groupBy: "Month"},
				{groupBy: "Day", format: "d"}
			],
			scale: "Day",
			startDate: DayPilot.Date.today().firstDayOfYear(),
			days: DayPilot.Date.today().daysInYear(),
			resources: [
				{name: "Resource 1", id: "R1"},
				{name: "Resource 2", id: "R2"},
				{name: "Resource 3", id: "R3"}
			]
		},
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
			calendarEvents: [],
			selectionShouldAffectAllUnits : [],
			selectionShouldAffectMultipleDays : [],
			dropdown_system: ["Telldus"]
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
		
		save(event) {
			debugger;
			var allCalendarEvents = this.$refs.calendar.fireMethod('clientEvents');
			//disable button
			//send to server
			//enable button
		}
	}
}
</script>




<style scoped>
	.toolbar-button-image >>> div {
		width: 2rem;
	}
	
</style>
