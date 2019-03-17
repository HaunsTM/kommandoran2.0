<template>
	<article>
		<v-dialog
			v-if="bufferTelldusSchedulerOverview !== {}"
			v-model="eventSelectorDialog"
		>
			<event-selector-dialog
				v-bind:grouped-resources="dayPilotSchedulerHelper.groupedResourcesByLocationAndTelldusUnitType"
				v-bind:initial-event="currentSelectedEvent"
				v-bind:visible="eventSelectorDialog"
				v-on:dismiss="dismissEventSelectorDialog"
				v-on:submit="addNewEvents"
			>
			</event-selector-dialog>
		</v-dialog>
		<v-layout row wrap>
			
			<v-flex d-flex md12>
				<v-toolbar >

					<v-tooltip bottom>
						<v-btn v-on:click="save" flat slot="activator" :disabled="isLoading">
							<v-icon>save</v-icon>
						</v-btn>
						<span>Save Schedule to database</span>
					</v-tooltip>

					<v-tooltip bottom>
						<v-btn v-on:click="clearAllEvents" flat slot="activator" :disabled="isLoading">
							<v-icon>clear</v-icon>
						</v-btn>
						<span>Clear entire Schedule (dont't forget to save)</span>
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

				</v-toolbar>
			</v-flex>
			<v-flex d-flex md12>
				<DayPilotScheduler 
					id="dp" 
					:config="config" 
					ref="scheduler"/>
			</v-flex>

		</v-layout>
	</article>

  
</template>

<script>
import Vue from 'vue';
import EventSelectorDialog from './EventSelectorDialog';
import TelldusAction_Scheduler from '../helpers/TelldusAction_Scheduler';

import { DayPilot, DayPilotScheduler } from 'daypilot-pro-vue'
import { DayPilotSchedulerHelper } from '../helpers/DayPilotScheduler.hlp'
import { EventBus } from './event-bus.js';

export default {
	name: 'Scheduler',
	data: function() {
		let that = this;
		return {
			dayPilotSchedulerHelper: {},
			bufferTelldusSchedulerOverview : {},
			currentSelectedEvent: {},
			dropdown_system: ["Telldus"],
			eventSelectorDialog: false,
			isLoading: false,
			regValidTelldusUnitTypes_Name: /(^433 MHz - OnOff|433 MHz - Bell|Z-Wave - OnOffDim$)/,
			config: {
				timeHeaders: [{"groupBy":"Day","format":"dddd"},{"groupBy":"Hour", "format":"HH"}],
				
				scale: "CellDuration",
				cellDuration: 60,
				cellWidth: 20,

				heightSpec: "Max",
				height: 500,
				
				crosshairType: "Full",


				days: 7,
				events: [],
				startDate: this.$DEFAULT_START_DATE_MONDAY,

				onAfterRender: function( ) {
					//that.removeCalendarBS();
					this.rows.expandAll( );
				},

				/*
				eventMoveHandling: "Update",
				onEventMoved: function (args) {
					this.message("Event moved: " + args.e.text());
				},
				eventResizeHandling: "Update",
				onEventResized: function (args) {
					this.message("Event resized: " + args.e.text());
				},
				*/
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
					const startTime = args.source.start().toString('HH:mm');
					const endTime = args.source.end().toString('HH:mm');
					const unitName = that.dayPilotSchedulerHelper.telldusUnitNameBy( args.source.resource() );
					
					args.html = '<b>Event details</b> <br />' +
					'Start time: ' + startTime + '<br />' +
					'End time: ' + endTime + '<br />' +
					'Unit: ' + unitName;
					}
				}),
				treeEnabled: true,
			},
			originalAlertFunction: {}
		}
	},
	components: {
		DayPilotScheduler,
		EventSelectorDialog
	},
	computed: { 		
		
		// DayPilot.Scheduler object - https://api.daypilot.org/daypilot-scheduler-class/
		scheduler: function () {
			return this.$refs.scheduler.control;
		}
	},
	methods: {
		addNewEvents(events) {
			this.eventSelectorDialog = false;
			const that = this;
			
			events.forEach( event => {
				that.scheduler.events.add( event );
			});
			this.scheduler.update();
		},
		clearAllEvents() {
			this.scheduler.events.list = [];
			this.scheduler.update();
		},
		dismissEventSelectorDialog() {
			this.eventSelectorDialog = false;
		},
		loadCalendarData() {
			this.setLoadingState(true);

			const that = this;
			const promises = [
				Vue.axios.get(that.$DB_API_BASE_URL + '?procedure=GetRepetitiveOnlyTelldusSchedulerOverview')
			];
			Promise.all(promises)
			.then((response) => {
				that.setLoadingState(false);
				const bufferTelldusSchedulerOverview = response[0].data[1];
				
                const startMonday = that.$DEFAULT_START_DATE_MONDAY;
				that.dayPilotSchedulerHelper = new DayPilotSchedulerHelper( bufferTelldusSchedulerOverview, startMonday );

				Vue.set(that.config, "resources", that.dayPilotSchedulerHelper.groupResourcesByLocation);
				const events = that.dayPilotSchedulerHelper.groupResourcesEvents;
				
				that.addNewEvents( events );
			})
			.catch((error) => {
				that.setLoadingState(false, error);
			});
		},
		removeCalendarBS() {
			
			try {
				const xpathDemo = '//div[contains(text(),"DEMO")]';
				var divDemo = document.evaluate( xpathDemo , document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null  ).snapshotItem(0);
				divDemo.parentNode.removeChild( divDemo );
			}
			catch( err ) {
				return;
			}
		},
		setLoadingState: function (loading, error) {
			let payLoad =  { "isLoading" : loading, "error" : error };
			EventBus.$emit('loading', payLoad);
			this.isLoading = loading;
		},
		async save() {
			//disable button
			//send to server
			//enable button
			const eventList = this.scheduler.events.list;
			const telldusIdNamePhrasebook = this.dayPilotSchedulerHelper.bufferTelldusSchedulerOverview;

			const telldusActionSchedulers = eventList.flatMap( (s) => {				
				const telldusActionSchedulerPair = TelldusAction_Scheduler.DayPilotEvent_2_TelldusActionScheduler(s, telldusIdNamePhrasebook);
				return telldusActionSchedulerPair;
			});

			try {
				this.setLoadingState(true);

				await Vue.axios.post(this.$DB_API_BASE_URL, {
					"procedure": {
						"name": "RegisterTelldusAction_Scheduler",
						"data": telldusActionSchedulers
					}
				});
				this.loadCalendarData();
				this.setLoadingState(false);
			} catch (ex) {				
				this.setLoadingState(false, ex);
			}
		},
		timeRangeSelected: function(args) {
			this.currentSelectedEvent = args;
			this.eventSelectorDialog = true;
		}
	},
	beforeCreate: function() {
		this.originalAlertFunction = window.alert;
		window.alert = function() {};
	},
	mounted: function() {		
		this.loadCalendarData();
		//add event handlers for calendar

		this.scheduler.onTimeRangeSelected = this.timeRangeSelected;
	},
	beforeDestroy: function() {
		window.alert = this.originalAlertFunction;
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

	/*göm den här från början div.scheduler_default_corner > div:nth-child(2) */
	#dp >>> div:nth-child(1) > div.scheduler_default_corner > div:nth-child(2) {
		display: none;
	}
</style>
