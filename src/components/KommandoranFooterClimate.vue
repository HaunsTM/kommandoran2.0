<template>
    <article class="flex-container">
        <div class="flex-container column">
            <div>                
                <img :src="require(`@/assets/air-conditioner24x24.png`)" />
            </div>
        </div>
        <div class="flex-container column">
            <div>
                {{dwellingTemperature}} °C
            </div>
        </div>
        <div class="flex-container column">
            
        </div>
    </article>
</template>

<script>

import Vue from 'vue';

import moment from "moment";
import localization from 'moment/locale/sv';


export default {
    name: 'KommandoranFooterClimate',
    data: () => ({
        dwellingTemperature: ""
    }),
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
        align-items: center;
    }
    .column {
        flex-direction: column;
    }
</style>