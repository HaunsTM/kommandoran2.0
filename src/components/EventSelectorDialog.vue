<template>
        <v-card>
            <v-card-title class="headline">{{start}}</v-card-title>
            <v-card-text>
                <div class="flex-container row">
                    <div class="grouped-resources-list">
                        <table>
                            <tr v-for="unitLocation in groupedResources" v-bind:key="unitLocation.node.TelldusUnitLocation_Name" class="resourceGroup">
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
                                                                color="white"
                                                                hide-details
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
                            <h4>Action days</h4>
                            <div class="flex-container row">
                                <v-checkbox v-model="days.monday.checked" :label="days.monday.name" color="white" class="checkbox"></v-checkbox>
                                <v-checkbox v-model="days.tuesday.checked" :label="days.tuesday.name" color="white" class="checkbox"></v-checkbox>
                                <v-checkbox v-model="days.wednesday.checked" :label="days.wednesday.name" color="white" class="checkbox"></v-checkbox>
                                <v-checkbox v-model="days.thursday.checked" :label="days.thursday.name" color="white" class="checkbox"></v-checkbox>
                                <v-checkbox v-model="days.friday.checked" :label="days.friday.name" color="white" class="checkbox"></v-checkbox>
                            </div>
                            <div class="flex-container row">
                                <v-checkbox v-model="days.saturday.checked" :label="days.saturday.name" color="white" class="checkbox"></v-checkbox>
                                <v-checkbox v-model="days.sunday.checked" :label="days.sunday.name" color="white" class="checkbox"></v-checkbox>  
                            </div>
                        </section>
                        <section>
                            <h4>Action level value</h4>
                            <h5>Start: </h5>
                            <v-btn-toggle v-model="actionLevelValue.start" mandatory>
                                <v-btn flat value="Off">
                                    <img :src="require(`@/assets/lightbulbOff.png`)"/>
                                    <span>Off</span>
                                </v-btn>
                                <v-btn flat value="30">
                                    <img :src="require(`@/assets/lightbulb30p32x32.png`)"/>
                                    <span>30%</span>
                                </v-btn>
                                <v-btn flat value="On">
                                    <img :src="require(`@/assets/lightbulbFull32x32.png`)"/>
                                    <span>On</span>
                                </v-btn>
                            </v-btn-toggle>
                            <h5>End: </h5>
                            <v-btn-toggle v-model="actionLevelValue.end" mandatory>
                                <v-btn flat>
                                    <img :src="require(`@/assets/update-arrows32x32.png`)"/>
                                    <span>Keep</span>
                                </v-btn>
                                <v-btn flat value="Off">
                                    <img :src="require(`@/assets/lightbulbOff.png`)"/>
                                    <span>Off</span>
                                </v-btn>
                            </v-btn-toggle>
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
    props: ['groupedResourcesByLocationAndTelldusUnitType', 'currentEvent'],
	data: function() {
		return {
            actionValues: ['off', '30', 'on'],
            actionLevelValue: {
                start: 100,
                end: 0
            },
			days: {
                monday: {
                    checked: false,
                    name: "Mon"
                },
                tuesday: {
                    checked: false,
                    name: "Tue"
                },
                wednesday: {
                    checked: false,
                    name: "Wed"
                },
                thursday: {
                    checked: false,
                    name: "Thu"
                },
                friday: {
                    checked: false,
                    name: "Fri"
                },
                saturday: {
                    checked: false,
                    name: "Sat"
                },
                sunday: {
                    checked: false,
                    name: "Sun"
                }
            },
            wholeWorkWeek_name: "Mon - Fri",
            weekend_name: "Sat - Sun",
            groupedResources: {}
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
        }
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
            if(this.groupedResources.flatMap) {
                selectedUnits = this.groupedResources
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
        groupedResourcesByLocationAndTelldusUnitType: {
            handler: function(newValue, oldValue) {
                this.groupedResources = newValue;
            }
        },
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
    }
    .unit {
        width: 15rem;
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
