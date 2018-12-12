<template>
	
    <article v-if="transportData['Lund'] && transportData['Malmö']">
        <div class="flex-container column">
            <div>                
                <img :src="require(`@/assets/bus-stop24x24.png`)" />
            </div>
        </div>
        <div class="flex-container column">
            <div class="flex-container">
                <div class="current-ride" v-bind:class="{deviations: transportData['Lund'][0].Deviations !== ''}">
                    <span class="line-info">{{transportData['Lund'][0].Name}} {{transportData['Lund'][0].Towards.substring(0, 10)}}</span>
                    <span class="scheduled-departure">{{transportData['Lund'][0].JourneyTime}}</span>
                    <span v-if="transportData['Lund'][0].Deviations !== ''">({{transportData['Lund'][0].Deviations}})</span>
                    
                    <span class="next-ride" v-bind:class="{deviations: transportData['Lund'][1].Deviations !== ''}">
                        <span>({{transportData['Lund'][1].Name}}</span>
                        <span>{{transportData['Lund'][1].JourneyTime}})</span>
                        <span v-if="transportData['Lund'][1].Deviations !== ''">({{transportData['Lund'][1].Deviations}})</span>
                    </span>
                </div>
            </div>            
            <div class="flex-container">
                <div class="current-ride" v-bind:class="{deviations: transportData['Malmö'][0].Deviations !== ''}">
                    <span class="line-info">{{transportData['Malmö'][0].Name}} {{transportData['Malmö'][0].Towards.substring(0, 10)}}</span>
                    <span class="scheduled-departure">{{transportData['Malmö'][0].JourneyTime}}</span>
                    <span v-if="transportData['Malmö'][0].Deviations !== ''">({{transportData['Malmö'][0].Deviations}})</span>
                    <span class="next-ride" v-bind:class="{deviations: transportData['Malmö'][1].Deviations !== ''}">
                        <span>({{transportData['Malmö'][1].Name}}</span>
                        <span>{{transportData['Malmö'][1].JourneyTime}})</span>
                        <span v-if="transportData['Malmö'][1].Deviations !== ''">({{transportData['Malmö'][1].Deviations}})</span>
                    </span>
                </div>
            </div>
        </div>
    </article>
</template>

<script>

import Vue from 'vue'; 

export default {
    name: 'KommandoranFooterTransport',
    data: () => ({
        bufferTransportData: {},
    }),
    created(){
    },  
    computed: {
        transportData : {
			get : function ()  {
				return this.bufferTransportData;
			},
			set : function (newTransportData)  {
                let transportData = this.$_(newTransportData.lines)
                    .filter( l => {
                        let transportIsInCorrectDirection = /(Malmö|Lund)/g.test(l.Towards);
                        return transportIsInCorrectDirection;
                    })
                    .map( l => {
                            l.City = l.Towards.match(/^([^\s])+/)[0];
                            l.JourneyTime = (new Date(l.JourneyDateTime)).toLocaleTimeString('se-SE', { hour: 'numeric', hour12: false, minute: 'numeric' });
                            return l;
                        }
                    )
                    .orderBy(['JourneyDateTime'],['asc'])
                    .groupBy(l => l.City)
                    .value();
                this.bufferTransportData = transportData;
			}
		}
    },
    methods: {
    },
	mqtt: {
		// subscribe to this topic for updates 
		'nodered/transport/departureTime' (data, topic) {
            
			let decoded = new TextDecoder("utf-8").decode(data);
			let decodedJSON = JSON.parse(decoded);
			this.transportData = decodedJSON;
        }
	},
    mounted() {
    },
    beforeDestroy() {
    }
}
</script>

<style scope>
    article {
        display: flex;
        flex-wrap: nowrap;
    }
    .flex-container {
        display: flex;
    }
    .space-around {
        justify-content: space-around;
    }
    .column {
        flex-direction: column;
    }
    .current-ride {
        font-weight: bolder;
    }
    .current-ride > span {
        padding-left: 1rem;
    }
    .line-info {
        font-weight: lighter;
    }
    .scheduled-departure {
        font-weight: bold;
    }
    .next-ride {
        font-weight: lighter;
    }
    .next-ride > span {
        padding-left: 1rem;
    }
    .deviations {
        color: red;
    }
</style>
