<template>
    <article v-if="mediaWidthMoreThan400px" class="flex-container" >
        <div class="column">
            <div>
                <img :src="require(`@/assets/air-conditioner24x24.png`)"/>
            </div>
        </div>
        <div class="column">
            <div>
                {{dwellingTemperature}} °C 
            </div>
        </div>
        <div v-if="outsideClimate.icon" class="flex-container outdoors">
            <div class="column">
                <img v-bind:src="require(`@/assets/open_weather_icons/${outsideClimate.icon}.png`)" alt="" class="weather-icon">
            </div>
            <div class="column">
                {{outsideClimate.tempc}} °C
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
                    {{dwellingTemperature}} °C 
                </div>        
            </div>
        </v-carousel-item>
        <v-carousel-item transition="fade">
            <div disabled="outsideClimate.icon" v-if="outsideClimate.icon" class="flex-container">
                <div class="column">
                    <img v-bind:src="require(`@/assets/open_weather_icons/${outsideClimate.icon}.png`)" alt="" class="weather-icon">
                </div>
                <div class="column">
                    <div>
                        Out
                    </div>
                    <div>                        
                        {{outsideClimate.tempc}} °C
                    </div>
                </div>        
            </div>
        </v-carousel-item>
    </v-carousel>
</template>

<script>

import Vue from 'vue';

import moment from "moment";
import localization from 'moment/locale/sv';

export default {
    name: 'KommandoranFooterClimate',
    data: () => ({
        bufferOutsideClimate: {},
        dwellingTemperature: ""
    }),
    computed: {
        mediaWidthMoreThan400px: () => {            
            return window.matchMedia("(min-width: 400px)").matches;
        },
        outsideClimate : {
			get : function ()  {
				return this.bufferOutsideClimate;
			},
			set : function (newClimateData)  {                
                this.bufferOutsideClimate = newClimateData;
			}
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
				that.dwellingTemperature = response[0].data.successResult.data[0].value;
			})
			.catch((error) => {
			});
		}
    },
	mqtt: {
		// subscribe to this topic for updates 
		'nodered/climate/dalby_outside' (data, topic) {
            
			let decoded = new TextDecoder("utf-8").decode(data);
			let decodedJSON = JSON.parse(decoded);
			this.outsideClimate = decodedJSON;
        }
	},
    mounted() {
		this.fetchTemperatureData();
        this.intervalFetchTemperatureData = setInterval(this.fetchTemperatureData, 5*60*1000);
    },
    beforeDestroy() {
        clearInterval(this.fetchTemperatureData);
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
    .outdoors {
        padding-left: 1rem;
    }
    .indoor-icon {
        padding-right: 0.2rem;
    }
    .weather-icon {
        width: 32px;
    }
</style>