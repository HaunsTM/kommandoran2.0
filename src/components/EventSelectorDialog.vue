<template>
    <v-card>
        <v-card-title class="headline">Event details</v-card-title>
        <v-card-text>
            <v-form ref="form" v-model="valid">
                <div class="flex-container row">
                    <div class="flex-container column">
                        <h4 class="subheading">Select units</h4>
                        <div class="grouped-resources-list">
                            <table>
                                <tr v-for="unitLocation in currentGroupedResources" v-bind:key="unitLocation.node.TelldusUnitLocation_Name" class="resourceGroup">
                                    <td class="location">
                                        <v-checkbox
                                            @change="toggledLocation(unitLocation)"
                                            v-model="unitLocation.node.selected"
                                            :label="unitLocation.node.TelldusUnitLocation_Name"
                                            color="white"
                                            hide-details
                                            class="checkbox"
                                        ></v-checkbox>
                                    </td>
                                    <td>
                                        <table>
                                            <tr v-for="unitType in unitLocation.children" v-bind:key="unitType.node.TelldusUnitType_Name" class="type-unit">
                                                <td class="type">
                                                    <v-checkbox
                                                        @change="toggledType(unitType)"
                                                        v-model="unitType.node.selected"
                                                        :label="unitType.node.TelldusUnitType_Name"
                                                        color="white"
                                                        hide-details
                                                        class="checkbox"
                                                    ></v-checkbox>
                                                </td>
                                                <td class="unit">
                                                    <table>
                                                        <tr v-for="unit in unitType.children" v-bind:key="unit.TelldusUnit_Name">
                                                            <td>
                                                                <v-checkbox
                                                                    v-model="unit.selected"
                                                                    :label="unit.TelldusUnit_Name"
                                                                    :hint="unit.TelldusUnit_LocationDesciption"
                                                                    color="white"
                                                                    persistent-hint
                                                                    class="checkbox"
                                                                ></v-checkbox>                                                
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="flex-container column action-list">
                        <section>
                            <h4 class="subheading">Selected units</h4>
                            <p v-if="selectedUnits.length > 0">{{selectedUnits}}</p>
                            <p v-else>NO UNIT SELECTED</p>
                        </section>
                        <section>
                            <v-divider dark></v-divider>
                            <h4 class="subheading">Select action time and level</h4>                            
                            <div class="flex-container row">
                                <div class="action-time">
                                    <h5 class="caption">Start time</h5>
                                    <v-text-field
                                        v-model="currentSettings.start.time"
                                        placeholder="HH:MM"
                                        return-masked-value
                                        mask="##:##"
                                        :rules="timeFormatRules"
                                        class="time-input"
                                    ></v-text-field>
                                </div>
                                <div class="action-value">
                                    <h5 class="caption">Level</h5>
                                    <v-radio-group v-model="currentSettings.start.actionLevelValue" row>
                                        <v-tooltip bottom>
                                            <v-radio flat slot="activator" label="Off" value="off" color="white"></v-radio>
                                            <span>Meaning that the setting Off applies from the beginning</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <v-radio flat slot="activator" label="30%" value="30" color="white"></v-radio>
                                            <span>Meaning that the setting level 30% (or on in cases where 30% is not valid) applies from the beginning</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <v-radio flat slot="activator" label="On" value="on" color="white"></v-radio>
                                            <span>Meaning that the setting On applies from the beginning</span>
                                        </v-tooltip>
                                    </v-radio-group>                                   
                                </div>
                            </div>
                            <div class="flex-container row">
                                <div class="action-time">
                                    <h5 class="caption">End time<sup v-if="endEventTimeOccurNextDay">*)</sup></h5>
                                    <v-text-field
                                        v-model="currentSettings.end.time"
                                        placeholder="HH:MM"
                                        return-masked-value
                                        mask="##:##"
                                        :rules="timeFormatRules"
                                        class="time-input"
                                    ></v-text-field>
                                </div>
                                <div class="action-value">
                                    <h5 class="caption">Level</h5>
                                    <v-radio-group v-model="currentSettings.end.actionLevelValue" row>
                                        <v-tooltip bottom>
                                            <v-radio flat slot="activator" label="Keep" value="keep" color="white"></v-radio>
                                            <span>Meaning that the initial setting remains</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <v-radio flat slot="activator" label="Off" value="off" color="white"></v-radio>
                                            <span>Meaning that the setting Off applies at the end</span>
                                        </v-tooltip>
                                    </v-radio-group>
                                </div>
                            </div>
                            <div class="flex-container row">
                                <small></small>
                            </div>
                        </section>                        
                        <v-divider dark></v-divider>
                        <section>
                            <v-divider dark></v-divider>
                            <h4 class="subheading">Select when the event should occur</h4>
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
                        </section>
                    </div>
                </div>
            </v-form>
        </v-card-text>
        <v-divider dark></v-divider>
        
        <v-card-actions>

            <v-btn
                color="green darken-1"
                flat="flat"
                @click="dismiss"
            >
                Dismiss
            </v-btn>

            <v-btn
                color="green darken-1"
                flat="flat"
                @click="submit"
            >
                Submit
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

import * as moment from 'moment';
import DayPilotEvent from '../helpers/DayPilotEvent';

export default {
    name: 'EventSelectorDialog',
    props: ['groupedResources', 'initialEvent', 'visible'],
	data: function() {
		return {
            valid: false,
            currentSettings: {
                'start': {
                    'time': '',
                    'actionLevelValue': 'on'
                },
                'end': {
                    'time': '',
                    'actionLevelValue': 'off'
                },
                'selectedUnits': []
            },
            actionLevelValue: {
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
        setInitialDaySelected() {
            const tempCurrentEvent = JSON.parse( JSON.stringify( this.initialEvent ) );
            const startDayIndex = moment( tempCurrentEvent.start ).day() - 1;

            const tempDays = JSON.parse( JSON.stringify( this.days ) );
            tempDays[startDayIndex].selected = true;
            this.repeatDays = tempDays;
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
                                    if (unit.TelldusUnit_Id === this.initialEvent.resource) {
                                        unit.selected = true;
                                    }
                                    return unit;
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
        }
    },    
	computed: {
        currentEvents() {
           // DayPilotEvent
           
            const that = this;
                   //s fullDate : startDate: this.$DEFAULT_START_DATE_MONDAY

            const referenceMonday = { 'date': this.$DEFAULT_START_DATE_MONDAY, 'datePattern': 'yyyy-MM-dd'}
            let currentEvents = that.selectedUnits.flatMap( (u) => {
                const unitAndEventOccurDays = that.selectedDaysEventOccurs.flatMap( (sDEO) => {
                    const startDayIndex = sDEO.dayOfWeek;
                    const endDayIndex = 
                        that.endEventTimeOccurNextDay ? (startDayIndex < 6 ? startDayIndex + 1 : 0) : startDayIndex;

                    const resource = u.TelldusUnit_Id;
                const text = '';
                const dPE = new DayPilotEvent(startDayIndex, that.currentSettings.start.time, endDayIndex,
                    this.currentSettings.end.time, that.timeSeparator, text, resource, referenceMonday);
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
        endActionLevelValue() {
            return this.currentSettings.end.actionLevelValue;
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
        startActionLevelValue() {
            return this.currentSettings.start.actionLevelValue;
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
        endActionLevelValue: {
            handler(newValue) {
                if ( newValue === 'keep' ) {
                    this.currentSettings.end.time = this.currentSettings.start.time;
                }
            }
        },
        startActionLevelValue: {
            handler(newValue) {
                if ( newValue === 'off' ) {
                    this.currentSettings.end.actionLevelValue = 'keep';
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
        justify-content: flex-start;
        align-items: flex-start;
    }
    .column {
        flex-direction: column;
    }
    .row {
        flex-direction: row;
    }
    .center-row {        
        align-items: baseline;
    }

    .grouped-resources-list {
        height: calc(100vh - 45vh);
		overflow-y: scroll;
    }
    
    .resourceGroup:nth-child(2n+2) {
       background-color: #757575;
    }
    .location {
        width: 10rem;
    }
    .type {
        width: 15rem;
        border-bottom: 1px solid white;
    }
    .unit {
        width: 15rem;
        border-bottom: 1px solid white;
    }

    .checkbox {
        margin: 0;
        padding: 0 1rem 0 0;
    }


    .action-list {
        width: 40%;
        padding-left: 2rem;
        justify-content: flex-start;
        align-items: flex-start;
    }
    .action-value {
        padding-left: 30px;
    }
    .action-time {
        width: 5rem;
    }
    .time-input {
        width: 4rem;
    }
    h4.subheading {
        padding-top: 0.5rem;
        padding-bottom: 1rem;
    }
    sup {
        font-size: smaller;
    }
</style>
