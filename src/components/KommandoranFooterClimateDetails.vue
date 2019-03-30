<template>
    <article class="menu" >

        <v-layout row wrap>
            <v-flex sm12 md6 class="indoor-wrapper">
                <v-card dark class="indoor">
                    <v-card-title class="title-row" primary-title>
                        <div>
                            <h3 class="headline">Indoor</h3>
                        </div>
                        <div>
                            <v-img
                                :src="require(`@/assets/air-conditioner24x24.png`)"
                                class="climate-icon"
                            ></v-img>
                        </div>
                    </v-card-title>
                    <v-card-text>

                        <v-data-table
                            :headers="indoorHeaders"
                            :items="indoorData"
                            hide-actions
                            class="elevation-1"
                        >
                            <template slot="headerCell" slot-scope="props">
                                <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <span v-on="on">
                                    {{ props.header.text }}
                                    </span>
                                </template>
                                <span>
                                    {{ props.header.text }}
                                </span>
                                </v-tooltip>
                            </template>
                            <template v-slot:items="props">
                                <td>{{ props.item.indoorLocation }}<br /><small>{{ props.item.indoorUpdateTime }}</small></td>
                                <td class="text-xs-right">
                                    {{ props.item.indoorTempC }}
                                    <span>
                                        <br />
                                        <small>{{ props.item.indoorEffectW }}</small>
                                    </span>
                                </td>

                            </template>
                        </v-data-table>



                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex sm12 md6 class="outoor-wrapper">
                <v-card dark class="outoor">
                    <v-card-title class="title-row" primary-title>
                        <div>
                            <h3 class="headline">Outdoor</h3>
                            {{climate.outside.weatherUpdateTime}}
                        </div>
                        <div v-if="climate.outside.icon">
                            <img v-bind:src="require(`@/assets/open_weather_icons/${climate.outside.icon}.png`)" alt="" class="weather-icon">
                        </div>
                    </v-card-title>
                     <v-card-text>

                        <v-data-table
                            :headers="outdoorHeadersTemp"
                            :items="outdoorTemp"
                            hide-actions
                            class="elevation-1"
                        >
                            <template slot="headerCell" slot-scope="props">
                                <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <span v-on="on">
                                    {{ props.header.text }}
                                    </span>
                                </template>
                                <span>
                                    {{ props.header.text }}
                                </span>
                                </v-tooltip>
                            </template>
                            <template v-slot:items="props">
                                <td class="text-xs-right">{{ props.item.outdoorMeasurementName }}</td>
                                <td class="text-xs-right">{{ props.item.outdoorMeasurementValue }}</td>
                            </template>
                        </v-data-table>

                        <v-data-table
                            :headers="outdoorHeadersAir"
                            :items="outdoorAir"
                            hide-actions
                            class="elevation-1"
                        >
                            <template slot="headerCell" slot-scope="props">
                                <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <span v-on="on">
                                    {{ props.header.text }}
                                    </span>
                                </template>
                                <span>
                                    {{ props.header.text }}
                                </span>
                                </v-tooltip>
                            </template>
                            <template v-slot:items="props">
                                <td class="text-xs-right">{{ props.item.outdoorMeasurementName }}</td>
                                <td class="text-xs-right">{{ props.item.outdoorMeasurementValue }}</td>
                            </template>
                        </v-data-table>
                        
                        <v-data-table
                            :headers="outdoorHeadersWind"
                            :items="outdoorWind"
                            hide-actions
                            class="elevation-1"
                        >
                            <template slot="headerCell" slot-scope="props">
                                <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <span v-on="on">
                                    {{ props.header.text }}
                                    </span>
                                </template>
                                <span>
                                    {{ props.header.text }}
                                </span>
                                </v-tooltip>
                            </template>
                            <template v-slot:items="props">
                                <td class="text-xs-right">{{ props.item.outdoorMeasurementName }}</td>
                                <td class="text-xs-right">{{ props.item.outdoorMeasurementValue }}</td>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
            
    </article>
</template>

<script>

import moment from "moment";
import localization from 'moment/locale/sv';

export default {
    name: 'KommandoranFooterClimateDetails',
    props: {
        'climate': Object,
        'mediaWidthMoreThan400px': Boolean
    },
    data () {
        return {
            indoorHeaders: [
                {
                    text: 'Location',
                    align: 'left',
                    value: 'indoorLocation'
                },
                { text: '', value: 'indoorLocation'},
            ],            
            outdoorHeadersTemp: [
                {
                    text: 'Temperature',
                    align: 'left',
                    value: 'outdoorMeasurementName'
                },
                { text: '', value: 'outdoorMeasurementValue' },
            ],            
            outdoorHeadersAir: [
                {
                    text: 'Air',
                    align: 'left',
                    value: 'outdoorMeasurementName'
                },
                { text: '', value: 'outdoorMeasurementValue' },
            ],            
            outdoorHeadersWind: [
                {
                    text: 'Wind',
                    align: 'left',
                    value: 'outdoorMeasurementName'
                },
                { text: '', value: 'outdoorMeasurementValue' },
            ]
        }
    },    
    computed: {
        indoorData() {
            return [
                {   
                    indoorEffectW: this.valueIsNotEmpty( this.climate.indoors.utilityRoom.effect ) ?
                        this.climate.indoors.utilityRoom.effect.value + ' W' : '',
                    indoorLocation: this.climate.indoors.utilityRoom.name,
                    indoorTempC: this.valueIsNotEmpty( this.climate.indoors.utilityRoom.temp ) ? 
                        this.climate.indoors.utilityRoom.temp.value + ' °C' : '',
                    indoorUpdateTime: this.valueIsNotEmpty( this.climate.indoors.utilityRoom.temp ) ? 
                        this.climate.indoors.utilityRoom.temp.time : ''
                },                
                {                       
                    indoorEffectW: this.valueIsNotEmpty( this.climate.indoors.main.effect ) ?
                        this.climate.indoors.main.effect.value + ' W' : '',
                    indoorLocation: this.climate.indoors.main.name,
                    indoorTempC: this.valueIsNotEmpty( this.climate.indoors.main.temp ) ?
                        this.climate.indoors.main.temp.value + ' °C' : '',
                    indoorUpdateTime: this.valueIsNotEmpty( this.climate.indoors.main.temp ) ? 
                        this.climate.indoors.main.temp.time : ''
                },                
                {   
                    indoorEffectW: this.valueIsNotEmpty( this.climate.indoors.outdoorRoom.effect ) ?
                        this.climate.indoors.outdoorRoom.effect.value + ' W' : '',
                    indoorLocation: this.climate.indoors.outdoorRoom.name,
                    indoorTempC: this.valueIsNotEmpty( this.climate.indoors.outdoorRoom.temp ) ?
                        this.climate.indoors.outdoorRoom.temp.value + ' °C' : '',
                    indoorUpdateTime: this.valueIsNotEmpty( this.climate.indoors.outdoorRoom.temp ) ? 
                        this.climate.indoors.outdoorRoom.temp.time : ''
                }
            ]
        },
        outdoorTemp() {
            return [
                {
                    outdoorMeasurementName: 'Max temp',
                    outdoorMeasurementValue: this.climate.outside.temp_maxc + ' °C'
                },
                {
                    outdoorMeasurementName: 'Cur temp',
                    outdoorMeasurementValue: this.climate.outside.tempc + ' °C'
                },
                {
                    outdoorMeasurementName: 'Min temp',
                    outdoorMeasurementValue: this.climate.outside.temp_minc + ' °C'
                }
            ]
        },
        outdoorAir() {
            return [
                {
                    outdoorMeasurementName: 'Humidity',
                    outdoorMeasurementValue: this.climate.outside.humidity + ' %'
                },
                {
                    outdoorMeasurementName: 'Pressure',
                    outdoorMeasurementValue: this.climate.outside.pressure + ' mBar'
                }
            ]
        },
        outdoorWind() {
            return [
                {
                    outdoorMeasurementName: 'Wind spd',
                    outdoorMeasurementValue: this.climate.outside.windspeed + ' m/s'
                },
                {
                    outdoorMeasurementName: 'Wind dir',
                    outdoorMeasurementValue: this.climate.outside.winddirection + ' °'
                }
            ]
        }
    },
    
    methods: {
        timeIsNotEmpty: ( data ) => {
            if( data !== null && typeof data.time !== 'undefined' && data.time !== '') {
                return true;
            }
            return false;
        },
        valueIsNotEmpty: ( data ) => {
            if( data !== null && typeof data.value !== 'undefined' && data.value !== '') {
                return true;
            }
            return false;
        }
    }
}

</script>

<style scope>
    .menu{
        padding: 1rem;
        background-color: #212121;
        opacity: 1;
    }
    .title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .title-row > div {
        padding-right: 2rem;
    }
    .indoor {
        padding: 1rem;
    }

    .indoor-wrapper {
        padding: 1rem;
    }

    .outoor {
        padding: 1rem;
    }
    
    .outoor-wrapper {
        padding: 1rem;
    }

    .climate-icon {
        width: 24px;
    }
    

</style>