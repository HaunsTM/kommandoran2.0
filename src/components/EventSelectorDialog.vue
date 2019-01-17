<template>
        <v-card>
            <v-card-title class="headline">Use Google's location service?</v-card-title>
            <v-card-text>
                <article class="container row">
                    <section class="grouped-resources-list container column">
                        <div v-for="unitLocation in groupedResources" v-bind:key="unitLocation.node.TelldusUnitLocation_Name" class="container row">
                            <!-- Resources -->
                            <div class="container column">
                                <div>
                                    <v-checkbox
                                        @change="toggledLocation(unitLocation)"
                                        v-model="unitLocation.node.checked"
                                        :label="unitLocation.node.TelldusUnitLocation_Name"
                                        color="white"
                                        hide-details
                                    ></v-checkbox>
                                </div>
                            </div>
                            <div class="container column">
                                <div v-for="unitType in unitLocation.children" v-bind:key="unitType.node.TelldusUnitType_Name" class="container row">
                                    <div class="container column">
                                        <div>
                                            <v-checkbox
                                                @change="toggledType(unitType)"
                                                v-model="unitType.node.checked"
                                                :label="unitType.node.TelldusUnitType_Name"
                                                color="white"
                                                hide-details
                                            ></v-checkbox>
                                        </div>
                                    </div>
                                    <div class="container column">
                                        <div v-for="unit in unitType.children" v-bind:key="unit.TelldusUnit_Name" class="container row">
                                            <div>
                                                <v-checkbox
                                                    v-model="unit.checked"
                                                    :label="unit.TelldusUnit_Name"
                                                    color="white"
                                                    hide-details
                                                ></v-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </section>
                    <!--<section class="container row">
                         Week days 
                    </section>-->
                </article>

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
import Vue from 'vue';

export default {
    name: 'EventSelectorDialog',
    props: ['groupedResourcesByLocationAndTelldusUnitType', 'currentEvent'],
	data: function() {
		return {
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
            groupedResources : {}
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
    .grouped-resources-list > article, section, div {
       padding: 0;
       /*  margin: 0; */
    }
    .grouped-resources-list{
        border: 1px solid white;
    }
    .container {
        display: flex; /* or inline-flex */
    }
    .row {
        flex-direction: row;
    }
    .column {
        flex-direction: column;
    }
</style>
