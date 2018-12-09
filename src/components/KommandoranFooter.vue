<template>
	
    <v-layout justify-space-around align-center d-flex>
        <v-flex xs4>
            &copy;2018 — <strong>Hauns&trade;</strong>
        </v-flex>
        <v-flex xs2>
            <img :src="require(`@/assets/thermometer16x16.png`)" />
            {{dwellingTemperature}} °C
        </v-flex>
        <v-flex xs2>
            <kommandoran-footer-transport />
        </v-flex>
        <v-flex xs3>            
            <v-layout align-center column fill-height>              
                
                <v-flex class="date-time">
                    {{currentTime}}
                </v-flex>
                <v-flex class="date-time">
                    {{currentDate}}
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>

import Vue from 'vue'; 

import KommandoranFooterTransport from './KommandoranFooterTransport';

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
    },  
    computed: {
    },
    components: {
        KommandoranFooterTransport
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
	mqtt: {
		// subscribe to this topic for updates 
		'nodered/transport/departure' (data, topic) {
			let decoded = new TextDecoder("utf-8").decode(data);
			let decodedJSON = JSON.parse(decoded);
			this.devicesData = decodedJSON.successResult;			
		}
	},
    mounted() {
        this.calculateTime();
        this.calculateDate();
		this.fetchTemperatureData(); 

        this.intervalCalculateTime = setInterval(this.calculateTime, 1*1000);
        this.intervalCalculateDate = setInterval(this.calculateDate, 1*1000);
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
    .date-time {
        font-size: 1rem;
        line-height: 1.2rem;
    }
</style>
