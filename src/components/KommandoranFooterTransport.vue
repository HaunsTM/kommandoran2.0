<template>
	
    <v-layout align-center column fill-height>        
        <v-flex class="date-time">
          ajdfshj
        </v-flex>
        <v-flex class="date-time">
            sdfg
        </v-flex>
    </v-layout>
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
                    .groupBy(l => l.Name)
                    .value();
debugger;
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
    .date-time {
        font-size: 1rem;
        line-height: 1.2rem;
    }
</style>
