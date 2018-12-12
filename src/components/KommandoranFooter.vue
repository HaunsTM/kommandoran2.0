<template>
    <footer class="flex-container">
        <div >
            <img :src="require(`@/assets/thermometer24x24.png`)" />
            {{dwellingTemperature}} °C
        </div>
        <div>
            <kommandoran-footer-transport />
        </div>
        <div>
            <kommandoran-footer-time />
        </div>
    </footer>
</template>

<script>

import Vue from 'vue'; 

import KommandoranFooterTime from './KommandoranFooterTime';
import KommandoranFooterTransport from './KommandoranFooterTransport';

import moment from "moment";
import localization from 'moment/locale/sv';


export default {
    name: 'KommandoranFooter',
    data: () => ({
        dwellingTemperature: "",
        loading: false,
        loadingError: ""
    }),
    created(){
    },  
    computed: {
    },
    components: {
        KommandoranFooterTime,
        KommandoranFooterTransport
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
        flex-wrap: nowrap;
        
        justify-content: space-between
    }
    .column {
        flex-direction: column;
    }
    footer {
        font-size: 1rem;
        line-height: 1.1rem;

        width: 100%;
        padding: 0 0.3rem 0 0.3rem;
    }
</style>