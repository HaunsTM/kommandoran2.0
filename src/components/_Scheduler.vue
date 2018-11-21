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
import { DayPilot, DayPilotScheduler } from 'daypilot-pro-vue'
import { EventBus } from './event-bus.js';
import moment from "moment";

export default {
	components: {		
    	DayPilotScheduler 
	},	
	computed: {
		
	},
	created () {
		// fetch the data when the view is created and the data is
		// already being observed
		this.fetchData(); 
	},
	data() {
		return {
			bufferTelldusSchedulerOverview : {},
			selectionShouldAffectAllUnits : [],
			selectionShouldAffectMultipleDays : [],
			dropdown_system: ["Telldus"],
			
			config: {
				theme: "scheduler_8",
				crosshairType : "Full",
				timeHeaders: [{"groupBy":"Month"},{"groupBy":"Day","format":"d"}],
				scale: "Day",
				days: DayPilot.Date.today().daysInMonth(),
				startDate: DayPilot.Date.today().firstDayOfMonth(),
				timeRangeSelectedHandling: "Enabled",
				onTimeRangeSelected: function (args) {
				var dp = this;
				DayPilot.Modal.prompt("Create a new event:", "Event 1").then(function(modal) {
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



		loadEvents() {
			const events = [
				// { id: 1, start: "2018-10-01T00:00:00", end: "2018-10-05T00:00:00", text: "Event 1", resource: "R1" },
				{ id: 2, start: DayPilot.Date.today().addDays(2), end: DayPilot.Date.today().addDays(5), text: "Event 1", resource: "R2"}
			];
			Vue.set(this.config, "events", events);
		},
		loadResources() {
			const resources = [
				{name: "Resource 1", id: "R1"},
				{name: "Resource 2", id: "R2"},
				{name: "Resource 3", id: "R3"}
			];
			Vue.set(this.config, "resources", resources);
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
	},
  mounted: function() {
    this.loadResources();
    this.loadEvents();

  }
}
</script>




<style scoped>
	.toolbar-button-image >>> div {
		width: 2rem;
	}

	
    #dp * {
		all: initial;
	}

	#dp >>> .scheduler_8_rowheader {
		border-bottom: 1px solid #a8a8a8;
	}

	#dp >>> .scheduler_8_timeheader_cell {
		border-bottom: 1px solid #a8a8a8;
	}
	
	#dp >>> .scheduler_8_matrix_horizontal_line {
		border: 1px solid #a8a8a8;
	}

	#dp >>> .scheduler_8_matrix_vertical_line {
		border: 1px solid #a8a8a8;
	}
	


	
	#dp >>> .scheduler_8_cell_business {
		background-color: blue;
	}
	#dp >>> .scheduler_8_event {
		background-color: orange;
	}
	#dp >>> div::selection {
		background-color: red;
	}
</style>
