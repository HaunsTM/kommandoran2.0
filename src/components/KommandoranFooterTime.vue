<template>

    <article class="flex-container">
        <div class="flex-container column">
            <div>                
                <img :src="require(`@/assets/wall-clock24x24.png`)" />
            </div>
        </div>
        <div class="flex-container column justify-content-center">
            <div class="flex-container">
                <div>
                    {{currentTime}}
                </div>
            </div>
            <div class="flex-container">
                    {{currentDate}}
            </div>
        </div>
    </article>

</template>

<script>

import moment from "moment";
import localization from 'moment/locale/sv';


export default {
    name: 'KommandoranFooterTime',
    data: () => ({
        currentDate : "",
        currentTime : ""
    }),
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
    mounted() {
        this.calculateTime();
        this.calculateDate();

        this.intervalCalculateTime = setInterval(this.calculateTime, 1*1000);
        this.intervalCalculateDate = setInterval(this.calculateDate, 1*1000);
    },
    beforeDestroy() {
        clearInterval(this.intervalCalculateTime);
        clearInterval(this.intervalCalculateDate);
    }
}
</script>

<style scope>
    .flex-container {
        display: flex;
    }
    .column {        
        flex-direction: column;
    }
    .justify-content-center {
        align-items: center;
    }
</style>