<template>
	<article>

		<v-layout row wrap class="hidden-sm-and-down">
			
			<v-flex d-flex md12>
				<v-toolbar >

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
				<DayPilotScheduler id="dp" :config="config" ref="scheduler" />
			</v-flex>

		</v-layout>
	</article>

  
</template>

<script>
import Vue from 'vue';
import {DayPilot, DayPilotScheduler} from 'daypilot-pro-vue'
import { EventBus } from './event-bus.js';

export default {
	name: 'Scheduler',
	data: function() {
		return {
			
			bufferTelldusSchedulerOverview : {},
			calendarEvents: [],
			selectionShouldAffectAllUnits : [],
			selectionShouldAffectMultipleDays : [],
			dropdown_system: ["Telldus"],
			config: {
				timeHeaders: [{"groupBy":"Day","format":"dddd"},{"groupBy":"Hour", "format":"HH"},{"groupBy":"Cell"}],
				
				scale: "CellDuration",
				cellDuration: 5,
				cellWidth: 20,

				crosshairType: "Full",


				days: 7,
				startDate: this.$DEFAULT_START_DATE_MONDAY,
				timeRangeSelectedHandling: "Enabled",
				onTimeRangeSelected: function (args) {
					var dp = this;
					DayPilot.Modal.prompt("Create a new event:", "Event 1")
						.then(function(modal) {
							dp.clearSelection();
							if (!modal.result) { return; }
							dp.events.add(new DayPilot.Event({
								start: args.start,
								end: args.end,
								id: DayPilot.guid(),
								resource: args.resource,
								text: modal.result
							}));
						});
				},
				eventMoveHandling: "Update",
				onEventMoved: function (args) {
					this.message("Event moved: " + args.e.text());
				},
				eventResizeHandling: "Update",
				onEventResized: function (args) {
					this.message("Event resized: " + args.e.text());
				},
				eventDeleteHandling: "Update",
				onEventDeleted: function (args) {
					this.message("Event deleted: " + args.e.text());
				},
				eventClickHandling: "Disabled",
				eventHoverHandling: "Bubble",
				bubble: new DayPilot.Bubble({
					onLoad: function(args) {
					// if event object doesn't specify "bubbleHtml" property 
					// this onLoad handler will be called to provide the bubble HTML
					args.html = "Event details";
					}
				}),
				treeEnabled: true,
			},
		}
	},
	components: {
		DayPilotScheduler
	},
	computed: {
		// DayPilot.Scheduler object - https://api.daypilot.org/daypilot-scheduler-class/
		scheduler: function () {
			return this.$refs.scheduler.control;
		}
	},
	methods: {		
		groupResources(loadedTelldusSchedulerOverview) {
			let groupedResources = this.$_(loadedTelldusSchedulerOverview)
				.sortBy(['TelldusUnitLocation_Name', 'TelldusUnitType_Name', 'TelldusUnit_Name', 'TelldusUnit_LocationDesciption'])
				.groupBy(x => x.TelldusUnitLocation_Name)
				.map( (value, key) => {
					let resourceGroup = {
						"name" : key,
						"children" :  value.map( u => {
							let child = {
								id : "\"" + u.TelldusUnit_Id + "\"",
								name: u.TelldusUnit_Name + "<br />" + u.TelldusUnit_LocationDesciption,
								
								TelldusUnitType_Name : u.TelldusUnitType_Name,
								TelldusUnit_Active : u.TelldusUnit_Active,
								TelldusAction_Active : u.TelldusAction_Active
							};
							return child;
						})
					}			
				return resourceGroup;})
				.value();
			return groupedResources;
		},
		loadEvents() {
			const events = [
			// { id: 1, start: "2018-10-01T00:00:00", end: "2018-10-05T00:00:00", text: "Event 1", resource: "R1" },
			{ id: 2, start: DayPilot.Date.today().addDays(2), end: DayPilot.Date.today().addDays(5), text: "Event 1", resource: "R2"}
			];
			Vue.set(this.config, "events", events);
		},
		loadResources() {
			this.setLoadingState(true);
			let that = this;
			const promises = [         
				Vue.axios.get(this.$DB_API_BASE_URL + '?procedure=GetRepetitiveOnlyTelldusSchedulerOverview')
			];
			Promise.all(promises)
			.then((response) => {
				that.setLoadingState(false);
				let loadedTelldusSchedulerOverview = response[0].data[1];
				let groupedResources = that.groupResources(loadedTelldusSchedulerOverview);
				
				Vue.set(this.config, "resources", groupedResources);
				that.$refs.scheduler.control.rows.expandAll();
			})
			.catch((error) => {
				that.setLoadingState(false, error);
			});
		},
		setLoadingState: function (loading, error) {
			let payLoad =  { "isLoading" : loading, "error" : error };
			EventBus.$emit('loading', payLoad);
		},
		
		save(event) {
			//disable button
			//send to server
			//enable button
			let eventList = this.$refs.scheduler.control.events.list;
			debugger;
				//this.$refs.scheduler.control.rows.expandAll();
		}
	},
	mounted: function() {
		this.loadResources();
		//this.loadEvents();

		this.scheduler.message("Welcomes!");
	}
}
</script>



<style scoped>
	.toolbar-button-image >>> div {
		width: 2rem;
	}

	
#dp >>> ::-webkit-scrollbar { 
    display: block !important; 
	visibility: visible !important;
} 
	
</style>
