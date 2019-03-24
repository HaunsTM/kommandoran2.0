<template>
    <footer class="flex-container">
        <div class='left-column'>
  <v-bottom-sheet v-model="sheet" inset>
      
   <kommandoran-footer-climate
     slot="activator"
     :climate = "climate"
     :mediaWidthMoreThan400px = "mediaWidthMoreThan400px"
    ></kommandoran-footer-climate>
   <kommandoran-footer-climate-details
        :climate="climate" 
        :mediaWidthMoreThan400px = "mediaWidthMoreThan400px"        
    ></kommandoran-footer-climate-details>
  </v-bottom-sheet>
            <!--<kommandoran-footer-climate/>-->
        </div>
        <div class='center-column'>
            <kommandoran-footer-transport />
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

export default {
    name: 'KommandoranFooter',
    data: () => ({

        date:'',
        sheet:null,
        climate: {
            indoors: {
                utilityRoom: {
                    effect: {},
                    temp: {},
                    time: {}
                },
                main: {
                    effect: {},
                    temp: {},
                    time: {}
                },
                outdoorRoom: {
                    effect: {},
                    temp: {},
                    time: {}
                }
            },
            outside: {}
        }
    }),
    components: {
        KommandoranFooterClimate,
        KommandoranFooterClimateDetails,
        KommandoranFooterTime,
        KommandoranFooterTransport
    },
    computed: {
        mediaWidthMoreThan400px: () => {            
            return window.matchMedia("(min-width: 400px)").matches;
        }
    },
    methods: {
        currentTime: function() {            
            return this.momentLocalized().format('YYYY-MM-DD HH:mm');
        },
        momentLocalized: () => {
            let momentLocalized = moment().locale("sv", localization);
            return momentLocalized;
        },
		fetchInitialIndoorTemperatureData : function () {
			let that = this;
			const promises = [         
				Vue.axios.get(this.$TELLDUS_API_BASE_URL + '?telldusActionTypeActionTypeOption=getSensorInfo&telldusUnitName=Huvudtermostat')
			];
			Promise.all(promises)
			.then((response) => {
                that.climate.indoors.main = {
                    'temp': {
                        'value': response[0].data.successResult.data[0].value,
                        'time': that.currentTime()
                    }
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
                    case 'Grovkök golvtermostat':
                        this.climate.indoors.utilityRoom.effect = effectValue ? {
                            'value': effectValue,
                            'time': telldusActionsPerformed_PerformedTime
                        } : this.climate.indoors.utilityRoom.effect;
                        this.climate.indoors.utilityRoom.temp = tempValue ? {
                            'value': tempValue,
                            'time': telldusActionsPerformed_PerformedTime
                        } : this.climate.indoors.utilityRoom.temp;
                        break;
                    case 'Huvudtermostat':
                        this.climate.indoors.main.effect = effectValue ? {
                            'value': effectValue,
                            'time': telldusActionsPerformed_PerformedTime
                        } : this.climate.indoors.main.effect;
                        this.climate.indoors.main.temp = tempValue ? {
                            'value': tempValue,
                            'time': telldusActionsPerformed_PerformedTime
                        } : this.climate.indoors.main.temp;
                        break;
                    case 'Uterum golvtermostat': 
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
		'nodered/climate/dalby_outside' ( data ) {
			let decoded = new TextDecoder("utf-8").decode( data );
			let decodedJSON = JSON.parse( decoded );
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