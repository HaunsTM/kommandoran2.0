<template>
	
    <v-layout justify-center row wrap>
        <v-flex xs3>
            &copy;2018 — <strong>Hauns&trade;</strong>
        </v-flex>
        <v-flex xs3>
            
            <v-layout justify-center row wrap>
                
                <v-flex xs12>
                    {{currentTime}}
                </v-flex>
                <v-flex xs12>
                    {{currentDate}}
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>

import { EventBus } from './event-bus.js';

import moment from "moment";
import localization from 'moment/locale/sv';

export default {
    name: 'KommandoranFooter',
    data: () => ({
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
		'nodered/performed_TelldusAction/listDevices' (data, topic) {
			let decoded = new TextDecoder("utf-8").decode(data);
			let decodedJSON = JSON.parse(decoded);
			console.log(decodedJSON.successResult);			
		}
	},
    mounted() {
        this.calculateTime();
        this.calculateDate();

        this.intervalCalculateTime = setInterval(this.calculateTime, 1*1000);
        this.intervalCalculateDate = setInterval(this.calculateDate, 24*60*60*1000);
    },
    beforeDestroy() {
        clearInterval(this.intervalCalculateTime);
        clearInterval(this.intervalCalculateDate);
    }
}
</script>

<style scope>

</style>
