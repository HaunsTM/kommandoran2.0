<template>
        <v-card>
            <v-card-title class="headline">{{start}}</v-card-title>
            <v-card-text>
                <div class="flex-container row">
                    <div class="grouped-resources-list">
                        <table>
                            <tr v-for="unitLocation in currentGroupedResources" v-bind:key="unitLocation.node.TelldusUnitLocation_Name" class="resourceGroup">
                                <td class="location">
                                    <v-checkbox
                                        @change="toggledLocation(unitLocation)"
                                        v-model="unitLocation.node.checked"
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
                                                    v-model="unitType.node.checked"
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
                                                                v-model="unit.checked"
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
                    <div class="flex-container column action-list">
                        <section>
                            <h4>Selected units</h4>
                            <p v-if="selectedUnits.length > 0">{{selectedUnits}}</p>
                            <p v-else>NO UNIT SELECTED</p>
                        </section>
                        <section>
                            <h4>Action level value</h4>
                            <h5>Start: </h5>
                            <div class="flex-container row">
                                <div>
                                    {{currentSettings.start.time}}
                                    <v-text-field
                                        v-model="currentSettings.start.time"
                                        :value="currentValue" 
                                        return-masked-value
                                        mask="##.##"
                                        @input="handleInput"
                                    ></v-text-field>
                                </div>
                                <div>
                                    <v-btn-toggle v-model="currentSettings.start.actionLevelValue" mandatory>
                                        <v-tooltip bottom>
                                            <v-btn flat slot="activator" value="off">
                                                <img :src="require(`@/assets/lightbulbOff.png`)"/>
                                                <span>Off</span>
                                            </v-btn>
                                            <span>Meaning that the setting Off applies from the beginning</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <v-btn flat slot="activator" value="30">
                                                <img :src="require(`@/assets/lightbulb30p32x32.png`)"/>
                                                <span>30%</span>
                                            </v-btn>
                                            <span>Meaning that the setting level 30% (or on in cases where 30% is not valid) applies from the beginning</span>
                                        </v-tooltip>
                                        <v-tooltip bottom>
                                            <v-btn flat slot="activator" value="on">
                                                <img :src="require(`@/assets/lightbulbFull32x32.png`)"/>
                                                <span>On</span>
                                            </v-btn>
                                            <span>Meaning that the setting On applies from the beginning</span>
                                        </v-tooltip>
                                    </v-btn-toggle>
                                </div>
                            </div>
                            


                            <h5>End: </h5>
                            <v-btn-toggle v-model="currentSettings.end.actionLevelValue" mandatory>
                                <v-tooltip bottom>
                                    <v-btn flat slot="activator" value="keep" >
                                        <img :src="require(`@/assets/update-arrows32x32.png`)"/>
                                        <span>Keep </span>
                                    </v-btn>
                                    <span>Meaning that the initial setting remains</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <v-btn flat slot="activator" value="off">
                                        <img :src="require(`@/assets/lightbulbOff.png`)"/>
                                        <span>Off</span>
                                    </v-btn>
                                    <span>Meaning that the setting Off applies when time's up</span>
                                </v-tooltip>
                            </v-btn-toggle>


                        </section>
                        <section>
                            <h4>Repeat event</h4>
                            <div class="flex-container row">
                                <div v-for="(day, index) in repeatDays" v-bind:key="day.shortName">
                                    <v-checkbox v-if=" index < 5 " v-model="day.checked" :label="day.shortName" color="white" class="checkbox"></v-checkbox>
                                </div>
                            </div>
                            <div class="flex-container row">
                                <div v-for="(day, index) in repeatDays" v-bind:key="day.shortName">
                                    <v-checkbox v-if=" index >= 5 " v-model="day.checked" :label="day.shortName" color="white" class="checkbox"></v-checkbox>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </v-card-text>

            <v-card-actions>

                <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="dialog = false"
                >
                    Disagree
                </v-btn>

                <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="dialog = false"
                >
                    Agree
                </v-btn>
            </v-card-actions>
        </v-card>
</template>

<script>

import moment from "moment";
import localization from 'moment/locale/sv';

export default {
    name: 'EventSelectorDialog',
    props: ['groupedResources', 'currentEvent', 'visible'],
	data: function() {
		return {
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
                {shortName: 'Mon', checked: false},
                {shortName: 'Tue', checked: false},
                {shortName: 'Wed', checked: false},
                {shortName: 'Thu', checked: false},
                {shortName: 'Fri', checked: false},
                
                {shortName: 'Sat', checked: false},
                {shortName: 'Sun', checked: false}
            ],
            repeatDays:[],
            currentGroupedResources: []
		}
    },
    methods: {
        toggledLocation(args) {
            const that = this;
            const checked = args.node.checked;
            args.children.forEach( (type) => {
                type.node.checked = checked;
                that.toggledType(type);
            });
        },
        toggledType(args) {
            const checked = args.node.checked;
            args.children.forEach( (unit) => {
                unit.checked = checked;
            });
        },
        setrepeatDaysSelected() {
            const tempCurrentEvent = JSON.parse( JSON.stringify( this.currentEvent ) );
            const startDayIndex = moment( tempCurrentEvent.start ).day() - 1;
            const endDayIndex = moment( tempCurrentEvent.end ).day() - 1;

            const tempDays = JSON.parse( JSON.stringify( this.days ) );
            tempDays[startDayIndex].checked = true;
            tempDays[endDayIndex].checked = true;
            this.repeatDays = tempDays;
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
                                    if (unit.TelldusUnit_Id === this.currentEvent.resource) {
                                        unit.checked = true;
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
    },    
	computed: {
        start() {
            return this.currentEvent.start;
        },
        end() {
            return this.currentEvent.end;
        },
        selectedUnits() {
            let selectedUnits = {};
            if(this.currentGroupedResources.flatMap) {
                selectedUnits = this.currentGroupedResources
                .flatMap( (loc) => {
                    return loc.children.flatMap( (type) => {
                        return type.children.flatMap( (u) => {
                            if (u.checked) {
                                return u.TelldusUnit_Name;
                            }
                        })
                    })
                }).filter( e => e);
            }
            return selectedUnits;
        }
    },
    watch: {        
        visible: {
            // watch for outer set property (indicates if the control has had 
            // its visibility property changed = if property settings should be updated)
            immediate: true,
            deep: true,
            handler(newValue) {
                if ( newValue === true ) {
                    this.setCurrentGroupedResourcesSelections();
                    this.setrepeatDaysSelected();
                }
            }
        }
    },
	created() {

    },
	mounted: function () {

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
        width: 60%;
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
    .value-slider {
        margin: 0;
        padding-right: 1rem;
    }

</style>
