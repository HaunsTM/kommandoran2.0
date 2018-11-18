<template>
	
    <v-layout justify-space-around align-center d-flex>
        <v-flex xs3>
            &copy;2018 — <strong>Hauns&trade;</strong>
        </v-flex>
        <v-flex xs3>
            <img :src="require(`@/assets/thermometer16x16.png`)" />
            {{dwellingTemperature}} °C
        </v-flex>
        <v-flex xs3>            
            <v-layout align-center column fill-height class="extra-padding">              
                
                <v-flex>
                    {{currentTime}}
                </v-flex>
                <v-flex>
                    {{currentDate}}
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>

import Vue from 'vue'; 

import { EventBus } from './event-bus.js';

import moment from "moment";
import localization from 'moment/locale/sv';


export default {
    name: 'KommandoranFooter',
    data: () => ({
        dwellingTemperature: "",
        currentDate : "",
        currentTime : "",
        loading: false,
        loadingError: ""
    }),
    created(){
        EventBus.$on('loading', this.setLoadingState);
    },  
    computed: {
    },
    methods: {         
        calculateDate: function() {
            this.currentDate = this.momentLocalized().format('L');
        },
        calculateTime: function() {            
            this.currentTime = this.momentLocalized().format('LT');
        },        
		fetchTemperatureData : function () {
        	this.setLoadingState(true);
			let that = this;
			const promises = [         
				Vue.axios.get(this.$TELLDUS_API_BASE_URL + '?telldusActionTypeActionTypeOption=getSensorInfo&telldusUnitName=Huvudtermostat')
			];
			Promise.all(promises)
			.then((response) => {
            	this.setLoadingState(false);
				that.dwellingTemperature = response[0].data.successResult.data[0].value;
			})
			.catch((error) => {
            	this.setLoadingState(false, error);
			});
		},
        momentLocalized: () => {
            let momentLocalized = moment().locale("sv", localization);
            return momentLocalized;
        },
        setLoadingState(data) {
            this.loading = data.isLoading;
            this.loadingError=JSON.stringify(data.error);
        }
    },
    mounted() {
        this.calculateTime();
        this.calculateDate();
		this.fetchTemperatureData(); 

        this.intervalCalculateTime = setInterval(this.calculateTime, 1*1000);
        this.intervalCalculateDate = setInterval(this.calculateDate, 24*60*60*1000);
        this.intervalFetchTemperatureData = setInterval(this.fetchTemperatureData, 5*60*1000);
    },
    beforeDestroy() {
        clearInterval(this.intervalCalculateTime);
        clearInterval(this.intervalCalculateDate);
        clearInterval(this.fetchTemperatureData);
    }
}
</script>

<style scope>

</style>
