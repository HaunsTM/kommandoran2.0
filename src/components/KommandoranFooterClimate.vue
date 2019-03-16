<template>
    <article v-if="mediaWidthMoreThan400px" class="flex-container" >
        <div class="column">
            <div>
                <img :src="require(`@/assets/air-conditioner24x24.png`)"/>
            </div>
        </div>
        <div class="column">
            <div>
                {{climate.indoors.main.temp.value}} °C 
            </div>
        </div>
        <div v-if="climate.outside.icon" class="flex-container outdoors">
            <div class="column">
                <img v-bind:src="require(`@/assets/open_weather_icons/${climate.outside.icon}.png`)" alt="" class="weather-icon">
            </div>
            <div class="column">
                {{climate.outside.tempc}} °C
            </div>        
        </div>
    </article>

    <v-carousel v-else hide-controls hide-delimiters interval="6000">
        <v-carousel-item transition="fade">
            <div class="flex-container">
                <div class="column">
                    <img :src="require(`@/assets/air-conditioner24x24.png`)" />
                </div>
                <div class="column">
                    <div>
                        In
                    </div>
                    {{climate.indoors.main.temp.value}} °C 
                </div>        
            </div>
        </v-carousel-item>
        <v-carousel-item transition="fade">
            <div disabled="outsideClimate.icon" v-if="climate.outside.icon" class="flex-container outdoors">
                <div class="column">
                    <img v-bind:src="require(`@/assets/open_weather_icons/${climate.outside.icon}.png`)" alt="" class="weather-icon">
                </div>
                <div class="column outdoor-text">
                    <div>
                        Out
                    </div>
                    <div>                        
                        {{climate.outside.tempc}} °C
                    </div>
                </div>        
            </div>
        </v-carousel-item>
    </v-carousel>
</template>

<script>

import Vue from 'vue';

export default {
    name: 'KommandoranFooterClimate',
    data: () => ({

        climate: {
            indoors: {
                utilityRoom: {
                    telldusUnit_Name: '',
                    effect: {},
                    temp: {}
                },
                main: {
                    telldusUnit_Name: '',
                    effect: {},
                    temp: {}
                },
                outdoorRoom: {
                    telldusUnit_Name: '',
                    effect: {},
                    temp: {}
                }
            },
            outside: {}
        }
    }),
    computed: {
        mediaWidthMoreThan400px: () => {            
            return window.matchMedia("(min-width: 400px)").matches;
        }
    },
    methods: {
		fetchTemperatureData : function () {
			let that = this;
			const promises = [         
				Vue.axios.get(this.$TELLDUS_API_BASE_URL + '?telldusActionTypeActionTypeOption=getSensorInfo&telldusUnitName=Huvudtermostat')
			];
			Promise.all(promises)
			.then((response) => {
                that.climate.indoors.main = {
                    'temp': {
                        'unit': response[0].data.successResult.data[0].name,
                        'value': response[0].data.successResult.data[0].value
                    }
                }
			});
        },

        status:  ( json ) => {

            const telldusUnit_Name = json.successResult.name;

            const effect = json.successResult.data
                .find( ( d ) => { return d.name === 'watt' } );

            const temp = json.successResult.data
                .find( ( d ) => { return d.name === 'temp' } );            

            return {
                'telldusUnit_Name': telldusUnit_Name,
                'effect': {
                        'unit': effect ? effect.name : null,
                        'value': effect ? effect.value : null
                    },
                'temp': {
                        'unit': temp ? temp.name : null,
                        'value': temp ? temp.value : null
                    }		
            }
        }
    },
	mqtt: {
		// subscribe to this topic for updates 
		'nodered/climate/dalby_outside' ( data ) {
			let decoded = new TextDecoder("utf-8").decode( data );
			let decodedJSON = JSON.parse( decoded );
			this.climate.outside = decodedJSON;
        }, 
		// subscribe to this topic for updates 
		'nodered/performed_TelldusAction/getSensorInfo' ( data ) {
			const decoded = new TextDecoder("utf-8").decode( data );
            const decodedJSON = JSON.parse( decoded );
            const currentStatus = this.status( decodedJSON )

            switch (currentStatus.telldusUnit_Name) {
                case 'Grovkök golvtermostat':
                    this.climate.indoors.utilityRoom = currentStatus;
                    break;
                case 'Huvudtermostat':
                    
                    this.climate.indoors.main = currentStatus;
                    break;
                case 'Uterum golvtermostat':
                    
                    this.climate.indoors.outdoorRoom = currentStatus;
                    break;
            
                default:
                    break;
            }
		}
	},
    mounted() {
		this.fetchTemperatureData();
        this.intervalFetchTemperatureData = setInterval( this.fetchTemperatureData, 5*60*1000 );
    },
    beforeDestroy() {
        clearInterval( this.fetchTemperatureData );
    }
}
</script>

<style scope>
    .flex-container {
        display: flex;
        align-items: center;
    }
    .column {
        flex-direction: column;
    }
    .indoor-icon {
        padding-right: 0.2rem;
    }
    @media only screen and (max-width: 400px) {
        .weather-icon {
            width: 30px;
        }
        .outdoor-text {
            padding-bottom: 0.4rem;
        }
    }
    @media only screen and (min-width: 401px) {
        .outdoors {
            padding-left: 1rem;
        }
        .weather-icon {
            width: 32px;
        }
    }
</style>