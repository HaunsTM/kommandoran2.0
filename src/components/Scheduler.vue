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

import { DayPilot, DayPilotScheduler } from 'daypilot-pro-vue'
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
		calendarEvent(start, end, resource, text, durationBarColor) {
			const calendarEvent = {
				"start": start,
				"end": end,
				"resource": resource,
				"text": text,
				"durationBarColor": durationBarColor,
				"id": DayPilot.guid()
			};
			return calendarEvent;
		},		
		calendarEventDateTime(weekDay, hour, minute) {
			const daysToAdd = (weekDay === 0) ? 6 : weekDay - 1;
			const dateTime = new Date(this.$DEFAULT_START_DATE_MONDAY);
			dateTime.setHours(hour, minute);
			dateTime.setDate(dateTime.getDate() + daysToAdd);

			const yearValue = dateTime.getFullYear().toString();
			const monthValue = (dateTime.getMonth() + 1).toString().toString().padStart(2,'0');
			const dateValue = dateTime.getDate().toString().padStart(2,'0');
			const hourValue = hour.toString().padStart(2,'0');
			const minuteValue = minute.toString().padStart(2,'0');
			const secondValue = '00';
			
			let calendarEventDateTime = yearValue + '-' + monthValue + '-' + dateValue + 'T' + hourValue + ':' + minuteValue + ':' + secondValue;
			return calendarEventDateTime;
		},
		calendarEventArrayPerResource(resourceId, resourceWithActivitiesArray) {
			let calendarEventArrayPerResource = [];
			const numberOfActivities = resourceWithActivitiesArray.length;
			let durationBarColor = "";
			let i = 0;

			while (i < numberOfActivities) {
				let currentEventIsLastInSerie = (i + 1) === numberOfActivities;
				let currentEvent = resourceWithActivitiesArray[i];
				let currentEventDateTime = 
					this.calendarEventDateTime(currentEvent.Scheduler_WeekDay, currentEvent.Scheduler_Hour, currentEvent.Scheduler_Minute);

				switch (currentEvent.TelldusActionTypes_ActionTypeOption) {
					case "onOffDevice":
						durationBarColor = "red";

						if (currentEvent.TelldusActionValue_ActionValue === "on") {
							if (!currentEventIsLastInSerie) {
								let nextEvent = resourceWithActivitiesArray[i+1];
								let nextEventDateTime = 
									this.calendarEventDateTime(nextEvent.Scheduler_WeekDay, nextEvent.Scheduler_Hour, nextEvent.Scheduler_Minute);

								if (nextEvent.TelldusActionValue_ActionValue === "off") {
									calendarEventArrayPerResource.push(	this.calendarEvent(
										currentEventDateTime, 
										nextEventDateTime, 
										resourceId, 
										currentEvent.TelldusActionTypes_ActionTypeOption, 
										durationBarColor)
									);
									i++;
								} else {
									calendarEventArrayPerResource.push(	this.calendarEvent(
										currentEventDateTime, 
										currentEventDateTime, 
										resourceId, 
										currentEvent.TelldusActionTypes_ActionTypeOption, 
										durationBarColor)
									);
								}
							} else {
								calendarEventArrayPerResource.push(	this.calendarEvent(
									currentEventDateTime, 
									currentEventDateTime, 
									resourceId, 
									currentEvent.TelldusActionTypes_ActionTypeOption, 
									durationBarColor)
								);
							}
						} else {							
							if (!currentEventIsLastInSerie) {
								const nextEvent = resourceWithActivitiesArray[i+1];
								const nextEventDateTime = this.calendarEventDateTime(nextEvent.Scheduler_WeekDay, nextEvent.Scheduler_Hour, nextEvent.Scheduler_Minute);

								if (nextEvent.TelldusActionValue_ActionValue === "on") {
									calendarEventArrayPerResource.push(	this.calendarEvent(
										currentEventDateTime, 
										nextEventDateTime, 
										resourceId, 
										currentEvent.TelldusActionTypes_ActionTypeOption, 
										durationBarColor)
									);
									i++;
								} else {
									calendarEventArrayPerResource.push(	this.calendarEvent(
										currentEventDateTime, 
										currentEventDateTime, 
										resourceId, 
										currentEvent.TelldusActionTypes_ActionTypeOption, 
										durationBarColor)
									);
								}
							} else {
								calendarEventArrayPerResource.push(	this.calendarEvent(
									currentEventDateTime, 
									currentEventDateTime, 
									resourceId, 
									currentEvent.TelldusActionTypes_ActionTypeOption, 
									durationBarColor)
								);
							}
						}
						break;
					default:
						durationBarColor = "blue";

				}
				i++;
			}
			return calendarEventArrayPerResource;			
		},
		groupResourcesEvents(loadedTelldusSchedulerOverview) {
			const MIN_STRING_CONTENT_LENGTH_TO_REPRESENT_A_POSSIBLE_JSON_OBJECT = 10;
			let that = this;

			let groupedResourcesEvents = this.$_(loadedTelldusSchedulerOverview)
				.filter( (e) => { return (e.ScheduledActivities && e.ScheduledActivities.length > MIN_STRING_CONTENT_LENGTH_TO_REPRESENT_A_POSSIBLE_JSON_OBJECT); })
				.map( (resource) => {
					let repetitiveActivities = that.$_(JSON.parse(resource.ScheduledActivities))
						.filter( (sE) => { return ( sE.Scheduler_Year === "" && sE.Scheduler_Month === "" && sE.Scheduler_Day === "" && sE.Scheduler_WeekDay !== "")})
						.sortBy(['TelldusActionTypes_ActionTypeOption','Scheduler_WeekDay', 'Scheduler_Hour', 'Scheduler_Minute'])
						.value();
					return that.calendarEventArrayPerResource(resource.TelldusUnit_Id, repetitiveActivities)
				})
				.flattenDeep()
				.union()
				.value();
			return groupedResourcesEvents; 
		},
		groupResources(loadedTelldusSchedulerOverview) {
			let groupedResources = this.$_(loadedTelldusSchedulerOverview)
				.sortBy(['TelldusActionValueType_Name'])
				.groupBy(x => x.TelldusUnitLocation_Name)
				.map( (value, key) => {
					let resourceGroup = {
						"name" : key,
						"children" :  value.map( u => {
							let child = {
								id :  u.TelldusUnit_Id,
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
		loadCalendarData() {
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
				let groupResourcesEvents = that.groupResourcesEvents(loadedTelldusSchedulerOverview);

				Vue.set(this.config, "resources", groupedResources);
				Vue.set(this.config, "events", groupResourcesEvents);
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
	created() {
		window.alert = (message) => { console.log(message); }
    },
	mounted: function() {
		this.loadCalendarData();
		//this.scheduler.message("Welcomes!");
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
