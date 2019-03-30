<template>
    <footer class="flex-container">
        <div class='left-column' v-on:click="showClimateDetailsDialog = true">
            <kommandoran-footer-climate
                :climate = "climate"
                :mediaWidthMoreThan400px = "mediaWidthMoreThan400px" />
            <v-dialog v-model="showClimateDetailsDialog" >                    
                <kommandoran-footer-climate-details
                    :climate="climate" 
                    :mediaWidthMoreThan400px = "mediaWidthMoreThan400px"  />
            </v-dialog>
        </div>
        <div class='center-column' v-on:click="showTransportDetailsDialog = true">
                <kommandoran-footer-transport
                    :transportData="transportData" 
                    :mediaWidthMoreThan400px = "mediaWidthMoreThan400px" />

                <v-dialog v-model="showTransportDetailsDialog" >                    
                    <kommandoran-footer-transport-details />
                </v-dialog>
                
        </div>
        <div class='right-column'>
            <kommandoran-footer-time />
        </div>
    </footer>
</template>

<script>

import Vue from 'vue';

import moment from "moment";
import localization from 'moment/locale/sv';

import KommandoranFooterClimate from './KommandoranFooterClimate';
import KommandoranFooterClimateDetails from './KommandoranFooterClimateDetails';
import KommandoranFooterTime from './KommandoranFooterTime';
import KommandoranFooterTransport from './KommandoranFooterTransport';
import KommandoranFooterTransportDetails from './KommandoranFooterTransportDetails';

export default {
    name: 'KommandoranFooter',
    data: () => ({
        bufferTransportData: {},
        date: '',
        sheet: null,        
        climate: {
            indoors: {
                utilityRoom: {
                    name: 'Grovkök golvtermostat',
                    effect: {},
                    temp: {}
                },
                main: {
                    name: 'Huvudtermostat',
                    effect: {},
                    temp: {}
                },
                outdoorRoom: {
                    name: 'Uterum golvtermostat',
                    effect: {},
                    temp: {}
                }
            },
            outside: {}
        },
        showClimateDetailsDialog: false,
        showTransportDetailsDialog: false
        
    }),
    components: {
        KommandoranFooterClimate,
        KommandoranFooterClimateDetails,
        KommandoranFooterTime,
        KommandoranFooterTransport,
        KommandoranFooterTransportDetails
    },
    computed: {
        mediaWidthMoreThan400px: () => {            
            return window.matchMedia("(min-width: 400px)").matches;
        },
        
        transportData()  {
            if ( !this.bufferTransportData ) {
                return;
            }

			let transportData = this.$_( this.bufferTransportData.lines )
                    .filter( l => {
                        let transportIsInCorrectDirection = /(Malmö|Lund)/g.test(l.Towards);
                        return transportIsInCorrectDirection;
                    })
                    .map( l => {
                            let line = {
                                "City": l.Towards.match(/^([^\s])+/)[0],
                                "Name": l.Name,
                                "JourneyTime": (new Date(l.JourneyDateTime)).toLocaleTimeString('se-SE', { hour: 'numeric', hour12: false, minute: 'numeric' }),
                                "LineTypeName": l.LineTypeName,
                                "Towards": l.Towards,
                                "NewDepPoint": l.RealTimeInfo ? l.RealTimeInfo.NewDepPoint : "",
                                "DepTimeDeviation": l.RealTimeInfo ? l.RealTimeInfo.DepTimeDeviation : "",
                                "DepDeviationAffect": l.RealTimeInfo ? l.RealTimeInfo.DepDeviationAffect : ""
                            }
                            return line;
                        }
                    )
                    .orderBy(['JourneyDateTime'],['asc'])
                    .groupBy(l => l.City)
                    .value();
                return transportData;
		}
    },
    methods: {

        currentTime: function() {            
            return this.momentLocalized().format('YYYY-MM-DD HH:mm');
        },
        momentLocalized: ( utc ) => {
            const momentLocalized = moment( utc ).locale("sv", localization);
            return momentLocalized;
        },
        displayTime: function( utc ) {            
            return this.momentLocalized( utc ).format('YYYY-MM-DD HH:mm');
        },
		fetchInitialIndoorTemperatureData : function () {
			let that = this;
			const promises = [         
				Vue.axios.get(this.$TELLDUS_API_BASE_URL + '?telldusActionTypeActionTypeOption=getSensorInfo&telldusUnitName=Huvudtermostat')
			];
			Promise.all(promises)
			.then((response) => {
                that.climate.indoors.main.temp = {
                    'value': response[0].data.successResult.data[0].value,
                    'time': that.currentTime()
                }
			});
        },
        setClimateData( d ) {
            const telldusActionsPerformed_PerformedTime = d.TelldusActionsPerformed_PerformedTime ? 
                moment(d.TelldusActionsPerformed_PerformedTime).format('YYYY-MM-DD HH:mm'): this.currentTime();
            const telldusUnit_Name = d.TelldusUnits_Name;
            const effectValue = d.TelldusActionValueTypes_Name === 'watt' ? d.TelldusActionValues_ActionValue : null;
            const tempValue = d.TelldusActionValueTypes_Name === 'temp' ? d.TelldusActionValues_ActionValue : null;

            switch ( telldusUnit_Name ) {
                    case this.climate.indoors.utilityRoom.name:
                        this.climate.indoors.utilityRoom.effect = effectValue ? {
                            'value': effectValue,
                            'time': telldusActionsPerformed_PerformedTime
                        } : this.climate.indoors.utilityRoom.effect;
                        this.climate.indoors.utilityRoom.temp = tempValue ? {
                            'value': tempValue,
                            'time': telldusActionsPerformed_PerformedTime
                        } : this.climate.indoors.utilityRoom.temp;
                        break;
                    case this.climate.indoors.main.name:
                        this.climate.indoors.main.effect = effectValue ? {
                            'value': effectValue,
                            'time': telldusActionsPerformed_PerformedTime
                        } : this.climate.indoors.main.effect;
                        this.climate.indoors.main.temp = tempValue ? {
                            'value': tempValue,
                            'time': telldusActionsPerformed_PerformedTime
                        } : this.climate.indoors.main.temp;
                        break;
                    case this.climate.indoors.outdoorRoom.name: 
                        this.climate.indoors.outdoorRoom.effect = effectValue ? {
                            'value': effectValue,
                            'time': telldusActionsPerformed_PerformedTime
                        } : this.climate.indoors.outdoorRoom.effect;
                        this.climate.indoors.outdoorRoom.temp = tempValue ? {
                            'value': tempValue,
                            'time': telldusActionsPerformed_PerformedTime
                        } : this.climate.indoors.outdoorRoom.temp;
                        break;    
                    default:
                        break;
                }

        }
    },
	mqtt: {
        'nodered/transport/departureTime' ( data ) {
            
			let decoded = new TextDecoder("utf-8").decode( data );
            let decodedJSON = JSON.parse( decoded );
			this.bufferTransportData = decodedJSON;
        },
		'nodered/climate/dalby_outside' ( data ) {
			let decoded = new TextDecoder("utf-8").decode( data );
            let decodedJSON = JSON.parse( decoded );
            decodedJSON.weatherUpdateTime = this.displayTime( decodedJSON.weatherUpdateTime );
            decodedJSON.sunrise = this.displayTime( decodedJSON.sunrise );
            decodedJSON.sunset = this.displayTime( decodedJSON.sunset );

			this.climate.outside = decodedJSON;
        },
		'nodered/climate/dalby_indoor' ( data ) {
			const decoded = new TextDecoder("utf-8").decode( data );
            const decodedJSON = JSON.parse( decoded );
            const reportedIndoorClimate = decodedJSON;
            const that = this;
            
            reportedIndoorClimate.forEach( ( u ) => { 
                that.setClimateData( u );
            });
		}
	},
    mounted() {
		this.fetchInitialIndoorTemperatureData();
    },
    beforeDestroy() {
    }
}
</script>

<style scope>
    .flex-container {

        display: flex;        
        justify-content: space-between;
    }
    footer {
        font-size: 1rem;
        line-height: 1.1rem;
        width: 100%;
        padding: 0 0.3rem 0 0.3rem;
    }
    footer > div {
        display: flex;
        flex-direction: column;
        margin-bottom: -4px;
        border-bottom: 2px solid blue;

        height: 32px;
    }
    @media only screen and (min-width: 401px) {
        .center-column {
        }

    }
    @media only screen and (max-width: 400px) {
        footer {
            font-size: small;
        }
        .left-column {
            width: 20%;
        }
        .center-column {
        }
    }
</style>