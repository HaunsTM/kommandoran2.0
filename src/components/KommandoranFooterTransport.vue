<template>
	
    <article class="flex-container" v-if="transportData['Lund'] && transportData['Malmö']">
        <div class="flex-container column">
                <img :src="require(`@/assets/bus32x32.png`)" />
        </div>
        <div class="flex-container column">
            <div class="flex-container">

               <div class="flex-container column">
                    <div class="current-ride">
                        <span class="line-info">{{transportData['Lund'][0].Name}}</span>                   
                    </div>
                    <div class="current-ride">
                        <span class="line-info">{{transportData['Malmö'][0].Name}}</span>                   
                    </div>
                </div>
                <div class="flex-container column" v-if="mediaWidthMoreThan400px">
                    <div class="current-ride">
                        <span class="line-info">{{transportData['Lund'][0].Towards.substring(0, 10)}}</span>                   
                    </div>
                    <div class="current-ride">
                        <span class="line-info">{{transportData['Malmö'][0].Towards.substring(0, 10)}}</span>                   
                    </div>
                </div>
                
               <div class="flex-container column">
                    <div class="current-ride">
                        <span class="scheduled-departure">{{transportData['Lund'][0].JourneyTime}}</span>               
                    </div>
                    <div class="current-ride">
                        <span class="scheduled-departure">{{transportData['Malmö'][0].JourneyTime}}</span>                   
                    </div>
                </div>
                
                <div class="flex-container column" v-if="mediaWidthMoreThan400px">
                    <span class="next-ride">
                        <span>({{transportData['Lund'][1].Name}}</span>
                        <span>{{transportData['Lund'][1].JourneyTime}})</span>
                    </span>
                     <span class="next-ride">
                        <span>({{transportData['Malmö'][1].Name}}</span>
                        <span>{{transportData['Malmö'][1].JourneyTime}})</span>
                    </span>
                </div>
 
            </div>
        </div>
    </article>
</template>

<script>

export default {
    name: 'KommandoranFooterTransport',
    data: () => ({
        bufferTransportData: {},
    }),
    created(){
    },
    computed: {
        mediaWidthMoreThan400px: () => {            
            return window.matchMedia("(min-width: 400px)").matches;
        },
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
                            let line = {
                                "City": l.Towards.match(/^([^\s])+/)[0],
                                "Name": l.Name,
                                "JourneyTime": (new Date(l.JourneyDateTime)).toLocaleTimeString('se-SE', { hour: 'numeric', hour12: false, minute: 'numeric' }),
                                "LineTypeName": l.LineTypeName,
                                "Towards": l.Towards,
                                "NewDepPoint": l.RealTimeInfo ? l.RealTimeInfo.NewDepPoint : "",
                                "DepTimeDeviation": l.RealTimeInfo ? l.RealTimeInfo.DepTimeDeviation : "",
                                "DepDeviationAffect": l.RealTimeInfo ? l.RealTimeInfo.DepDeviationAffect : ""
                            }
                            return line;
                        }
                    )
                    .orderBy(['JourneyDateTime'],['asc'])
                    .groupBy(l => l.City)
                    .value();
                this.bufferTransportData = transportData;
			}
		}
    },
	mqtt: {
		// subscribe to this topic for updates 
		'nodered/transport/departureTime' ( data ) {
            
			let decoded = new TextDecoder("utf-8").decode( data );
			let decodedJSON = JSON.parse( decoded );
			this.transportData = decodedJSON;
        }
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
</style>
