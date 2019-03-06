<template>
    <v-card>
        <v-card-title class="headline">Event details</v-card-title>
        <v-card-text>
            <v-form ref="form" v-model="valid">
                <div class="flex-container justify-content-flex-start row">
                    <div class="flex-container column">                        
                        
                        <div class="section-header success">
                            <div>
                                <h4 class="subheading">1. Select units</h4>
                            </div>
                            <div>
                                <img :src="require(`@/assets/switch32x32.png`)" />
                            </div>
                        </div>



                        <div class="section-content">
                            <div class="grouped-resources-list">
                                <table>
                                        <thead>
                                            <tr>
                                                <th>Type</th>
                                                <th>Unit</th>
                                            </tr>
                                        </thead>
                                        <template v-for="(unitLocation, resourceGroupIndex)  in currentGroupedResources">
                                            <tr v-bind:key="unitLocation.node.TelldusUnitLocation_Name">
                                                <td colspan=2 class="location">
                                                    <div class = "location-header-container">
                                                        <h4 class="subheading">{{unitLocation.node.TelldusUnitLocation_Name}}</h4>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr v-bind:key="unitLocation.node.TelldusUnitLocation_Name + 'checkbox'">
                                                <td colspan=2>
                                                    <v-checkbox
                                                        @change="toggledLocation(unitLocation)"
                                                        v-model="unitLocation.node.selected"                                                
                                                        label="All..."
                                                        color="white"
                                                        hide-details
                                                        class="checkbox"
                                                    ></v-checkbox>
                                                </td>
                                            </tr>
                                            <tr v-for="(unitType, unitTypeIndex) in unitLocation.children" 
                                                v-bind:key="unitType.node.TelldusUnitType_Name + resourceGroupIndex">
                                                <td class="type">
                                                    <div v-if="unitType.children.length > 1" class="type-checkbox-container">
                                                        <div>
                                                            <v-checkbox
                                                                @change="toggledType(unitType)"
                                                                v-model="unitType.node.selected"
                                                                :title="unitType.node.TelldusUnitType_Name"
                                                                color="white"
                                                                class="checkbox"
                                                            ></v-checkbox>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="unit"
                                                    v-bind:class="{ unitTypeGroup: !unitTypeIndex % 2}">
                                                    <table>
                                                        <tr v-for="unit in unitType.children" v-bind:key="unit.Id">
                                                            <td v-bind:class="{ firstUnitInUnitTypeGroup: unitTypeIndex === 1}">
                                                                <v-checkbox
                                                                    v-model="unit.selected"
                                                                    :label="unit.Name + ' - ' + unit.LocationDescription"
                                                                    color="white"
                                                                    persistent-hint
                                                                    class="checkbox"
                                                                ></v-checkbox>                                                
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </template>
                                </table>
                            </div>
                        </div>

                    </div>

                    <div class="flex-container column">
                        
                        <section class="section-container">

                            <div class="section-header success">
                                <div>
                                    <h4 class="subheading">2. Select action time and level</h4>
                                </div>
                                <div>
                                    <img :src="require(`@/assets/table-clock32x32.png`)" />
                                </div>
                            </div>
                            <div class="section-content">
                                <div>
                                    <h4 class="subheading">Start</h4>
                                </div>
                                <div class="flex-container row justify-content-flex-start">
                                    <div>
                                        <v-text-field
                                            label="Start time"
                                            v-model="currentSettings.start.time"
                                            placeholder="HH:MM"
                                            return-masked-value
                                            mask="##:##"
                                            :rules="timeFormatRules"
                                            class="time-input"
                                        ></v-text-field>
                                    </div>
                                    <div class="action-level">
                                        <div>
                                            <img :src="require(`@/assets/indoor-on32x32.png`)" />
                                        </div>
                                        <div>
                                            <v-radio-group v-model="currentSettings.start.TelldusActionValue_actionValue" row>                                        
                                                <v-tooltip bottom>
                                                    <v-radio flat slot="activator" label="On" value="on" color="white"></v-radio>
                                                    <span>Meaning that the setting On applies from the beginning</span>
                                                </v-tooltip>
                                                <v-tooltip bottom>
                                                    <v-radio flat slot="activator" label="30%" value="30" color="white"></v-radio>
                                                    <span>Meaning that the setting level 30% (or On in cases where 30% is not valid) applies from the beginning</span>
                                                </v-tooltip>
                                                <v-tooltip bottom>
                                                    <v-radio flat slot="activator" label="Off" value="off" color="white"></v-radio>
                                                    <span>Meaning that the setting Off applies from the beginning</span>
                                                </v-tooltip>
                                            </v-radio-group>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h4 class="subheading">End<sup v-if="endEventTimeOccurNextDay">*)</sup></h4>
                                </div>
                                <div class="flex-container row">
                                    <div>
                                        <v-text-field
                                            label="End time"
                                            v-model="currentSettings.end.time"
                                            placeholder="HH:MM"
                                            return-masked-value
                                            mask="##:##"
                                            :rules="timeFormatRules"
                                            class="time-input"
                                        ></v-text-field>
                                    </div>
                                    <div class="action-level">
                                        <div>
                                            <img :src="require(`@/assets/indoor-off32x32.png`)" />
                                        </div>
                                        <div>
                                            <v-radio-group v-model="currentSettings.end.TelldusActionValue_actionValue" row>
                                                <v-tooltip bottom>
                                                    <v-radio flat slot="activator" label="Off" value="off" color="white"></v-radio>
                                                    <span>Meaning that the setting Off applies at the end</span>
                                                </v-tooltip>
                                            </v-radio-group>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </section>



                        <section class="section-container">
                            
                            <div class="section-header success">
                                <div>
                                    <h4 class="subheading">3. Select which days the event should occur</h4>
                                </div>
                                <div>
                                    <img :src="require(`@/assets/day32x32.png`)" />
                                </div>
                            </div>

                            <div class="section-content">

                                <div class="flex-container row">
                                    <div v-for="(day, index) in repeatDays" v-bind:key="day.shortName">
                                        <v-checkbox v-if=" index < 5 " v-model="day.selected" :label="day.shortName" color="white" class="checkbox"></v-checkbox>
                                    </div>
                                </div>

                                <div class="flex-container row">
                                    <div v-for="(day, index) in repeatDays" v-bind:key="day.shortName">
                                        <v-checkbox v-if=" index >= 5 " v-model="day.selected" :label="day.shortName" color="white" class="checkbox"></v-checkbox>
                                    </div>
                                </div>

                            </div>

                        </section>

                    </div>
                </div>
            </v-form>
        </v-card-text>

        <v-divider dark></v-divider>
        
        <v-card-actions>
            <v-flex class="text-xs-right">
                <v-btn
                    flat="flat"
                    @click="dismiss"
                >
                    Dismiss
                </v-btn>

                <v-btn
                    class="success"
                    flat="flat"
                    @click="submit"
                >
                    Submit
                </v-btn>                
            </v-flex>
        </v-card-actions>
    </v-card>
</template>

<script>

import * as moment from 'moment';
import { DayPilot } from 'daypilot-pro-vue'
import DayPilotEvent from '../helpers/DayPilotEvent';

import TelldusUnitType from "../helpers/TelldusUnitType"
import TelldusActionValue from "../helpers/TelldusActionValue"
import TelldusUnit from "../helpers/TelldusUnit"

export default {
    name: 'EventSelectorDialog',
    props: ['groupedResources', 'initialEvent', 'visible'],
	data: function() {
		return {
            valid: false,
            currentSettings: {
                'start': {
                    'time': '',
                    'TelldusActionValue_actionValue': 'on'
                },
                'end': {
                    'time': '',
                    'TelldusActionValue_actionValue': 'off'
                },
                'selectedUnits': []
            },
            TelldusActionValue_actionValue: {
                start: 'on',
                end: 'off'
            },
			days: [
                {   shortName: 'Mon', 
                    selected: false,
                    dayOfWeek: 1
                },
                {
                    shortName: 'Tue', 
                    selected: false,
                    dayOfWeek: 2
                },
                {
                    shortName: 'Wed', 
                    selected: false,
                    dayOfWeek: 3
                },
                {
                    shortName: 'Thu', 
                    selected: false,
                    dayOfWeek: 4
                },
                {
                    shortName: 'Fri', 
                    selected: false,
                    dayOfWeek: 5
                },
                
                {
                    shortName: 'Sat', 
                    selected: false,
                    dayOfWeek: 6
                },
                {
                    shortName: 'Sun', 
                    selected: false,
                    dayOfWeek: 0
                }
            ],
            repeatDays:[],
            currentGroupedResources: [],
            timeSeparator: ':'
		}
    },
    methods: {
        dismiss() {
            this.$emit('dismiss');
        },
        setInitialDaySelected() {
            const tempCurrentEvent = JSON.parse( JSON.stringify( this.initialEvent ) );
            const startDayIndex = moment( tempCurrentEvent.start ).day();

            this.repeatDays = this.days.map( ( d ) => {
                if ( d.dayOfWeek === startDayIndex ) {
                    d.selected = true;
                } else {
                    d.selected = false;
                }
                return d;
             });             
        },
        setInitiallySelectedTime() {
            const tempCurrentEvent = JSON.parse( JSON.stringify( this.initialEvent ) );
            const startTime = moment( tempCurrentEvent.start ).format('HH:mm');
            const endTime = moment( tempCurrentEvent.end ).format('HH:mm');

            this.currentSettings.start.time = startTime;
            this.currentSettings.end.time = endTime;
        },
        setCurrentGroupedResourcesSelections() {
            const tempGroupedResources = JSON.parse( JSON.stringify( this.groupedResources ) )
            const retVal = tempGroupedResources.map( (loc) => {
                    let locTemp = {
                        'node': loc.node,
                        'children': loc.children.map( (type) => {
                            let typeTemp = {
                                'node': type.node,
                                'children': type.children.map( (unit) => {
                                    const telldusUnitType = new TelldusUnitType(null, type.node.TelldusUnitType_Name)
                                    let telldusUnit = new TelldusUnit(unit.TelldusUnit_Id, unit.TelldusUnit_Name, unit.TelldusUnit_LocationDesciption);                                    
                                    telldusUnit.TelldusUnitType = telldusUnitType;
                                    
                                    if (unit.TelldusUnit_Id === this.initialEvent.resource) {
                                        telldusUnit.selected = true;
                                    }
                                    return telldusUnit;
                                })
                            }
                            return typeTemp;
                        })
                    }
                    return locTemp;
                });
            this.currentGroupedResources = retVal;
        },
        submit() {
            if (this.$refs.form.validate()) {
                this.$emit('submit', this.currentEvents);
            }
        },
        toggledLocation(args) {
            const that = this;
            const selected = args.node.selected;
            args.children.forEach( (type) => {
                type.node.selected = selected;
                that.toggledType(type);
            });
        },
        toggledType(args) {
            const selected = args.node.selected;
            args.children.forEach( (unit) => {
                unit.selected = selected;
            });
        },
    },    
	computed: {
        currentEvents() {
            const that = this;

            let currentEvents = that.selectedUnits.flatMap( (telldusUnit) => {
                const unitAndEventOccurDays = that.selectedDaysEventOccurs.flatMap( (sDEO) => {
                    
                    const id = DayPilot.guid();
                    const startMonday = this.$DEFAULT_START_DATE_MONDAY;

                    const startDayIndex = sDEO.dayOfWeek;
                    const startTimeHHMM = that.currentSettings.start.time;

                    const endDayIndex = 
                        that.endEventTimeOccurNextDay ? (startDayIndex < 6 ? startDayIndex + 1 : 0) : startDayIndex;
                    const endTimeHHMM = this.currentSettings.end.time;

                    const timeSeparator = that.timeSeparator;
                    const resource = telldusUnit.Id;
                    const startTelldusActionValue_actionValue =
                        TelldusActionValue.getClosestPossibleTelldusActionValue( telldusUnit.TelldusUnitType, that.startTelldusActionValue_actionValue );
                    
                    const endTelldusActionValue_actionValue =
                        TelldusActionValue.getClosestPossibleTelldusActionValue( telldusUnit.TelldusUnitType, that.endTelldusActionValue_actionValue );

                    const dPE = new DayPilotEvent(
                        id, startMonday,
                        startDayIndex, startTimeHHMM,
                        endDayIndex, endTimeHHMM, timeSeparator,
                        resource,
                        startTelldusActionValue_actionValue, endTelldusActionValue_actionValue);

                    return dPE
                });
                return unitAndEventOccurDays;
            });
            return currentEvents;
        },
		currentEventText() {
            let currentEventText = "";
            if (this.valid) {
                return null;
            } else {
                currentEventText = "Please enter valid ";
            }
            return currentEventText;
		},
        endTelldusActionValue_actionValue() {
            return this.currentSettings.end.TelldusActionValue_actionValue;
        },
        endEventTimeOccurNextDay() {
            const startTime = moment( this.currentSettings.start.time, 'HH:mm' );
            const endTime = moment( this.currentSettings.end.time, 'HH:mm' );

            return endTime < startTime;
        },
        selectedDaysEventOccurs() {
            const selectedDaysEventOccurs =
                this.repeatDays.map( (d) => {
                    if(d.selected) {
                        return d;
                    }
                    return null;
                }).filter( e => e);
                
            return selectedDaysEventOccurs;
        },
        selectedUnits() {
            let selectedUnits = {};
            if(this.currentGroupedResources.flatMap) {
                selectedUnits = this.currentGroupedResources
                .flatMap( (loc) => {
                    return loc.children.flatMap( (type) => {
                        return type.children.flatMap( (u) => {
                            if (u.selected) {
                                return u;
                            }
                        })
                    })
                }).filter( e => e);
            }
            return selectedUnits;
        },
        startTelldusActionValue_actionValue() {
            return this.currentSettings.start.TelldusActionValue_actionValue;
        },
        timeFormatRules() {
            const rules = [
                v => !!v || 'Time is required',                
                v => /^(?:[0-1]\d|2[0-3]):(?:[0-5])\d$/.test(v) || 'Invalid time!'
            ];
            
            return rules;
        }
    },
    watch: {
        startTelldusActionValue_actionValue: {
            handler(newValue) {
                if ( newValue === 'off' ) {
                    this.currentSettings.end.time = this.currentSettings.start.time;
                }
            }
        },        
        visible: {
            // watch for outer set property (indicates if the control has had 
            // its visibility property changed = if property settings should be updated)
            immediate: true,
            deep: true,
            handler(newValue) {
                if ( newValue === true ) {
                    this.setCurrentGroupedResourcesSelections();
                    this.setInitialDaySelected();
                    this.setInitiallySelectedTime();
                }
            }
        }
    }
}
</script>

<style scoped>

    .flex-container {
        display: flex;
    }

    .column {
        flex-direction: column;
    }

    .row {
        flex-direction: row;
    }
    .align-items-flex-start {
        align-items: flex-start;
    }
    .justify-content-flex-start {
        justify-content: flex-start;
    }

    .grouped-resources-list {
        height: calc(100vh - 45vh);
		overflow-y: scroll;
    }

    .section-header > div {
        padding-left: 2rem;
    }
    
    .resourceGroup {
       background-color: #757575;
    }

    .unitTypeGroup {
        border-left: 1px solid white;
    }

    .firstUnitInUnitTypeGroup {
        padding-top: 2rem;
    }

    .grouped-resources-list table {
        border-collapse: collapse;
    }

    .location {
        width: 30rem;
    }

    .location-header-container {
        display: flex;
        justify-content: center;
        background-color: #757575;
    }

    .type {
        padding-top: 2rem;
        width: 15rem;
    }

    .type-checkbox-container {
        
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .unit {
        width: 15rem;
    }

    .checkbox {
        margin: 0;
        padding: 0 1rem 0 0;
    }

    .section-container {
        padding-left: 0.5rem;
        width: 30rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .section-header {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .section-content {
        padding-top: 1rem;
        padding-left: 0.5rem;
        display: flex;
        flex-direction: column;
    }
    
    .action-level { 
        width: 100%;
        display: flex;
        align-items: center;
    }

    .time-input {
        width: 6rem;
    }

    h4.subheading {
        padding-top: 0.5rem;
        padding-bottom: 1rem;
    }

    sup {
        font-size: smaller;
    }
</style>
