<template>
    <article class="menu" >

        <v-layout hidden-sm-and-up>
            <v-flex>
                <div class="small-transport-container">
                    <div class="small-transport-destination-container">
                        <div class="title-row">
                            <h3 class="headline">Mot Lund</h3>
                        </div>
                        <div class="every-odd-transport-option-color"
                            v-for="data in transportData.Lund"
                            v-bind:key="data.JourneyTime">
                            
                            <div class="small-transport-option-container">
                                <div class="small-transport-option-line-location-container">
                                    <div class="title">
                                        {{data.Name}}
                                    </div>
                                    <div class="caption">
                                        {{data.LineTypeName}}&nbsp;&rarr;&nbsp;{{data.Towards}}
                                    </div>
                                </div>
                                <div class="small-transport-option-time">
                                    <div>
                                        <h4 class="title">
                                            {{data.JourneyTime}}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="small-transport-container">
                    <div class="small-transport-destination-container">
                        <div class="title-row">
                            <h3 class="headline">Mot Malmö</h3>
                        </div>
                        <div class="every-odd-transport-option-color"
                            v-for="data in transportData.Malmö"
                            v-bind:key="data.JourneyTime">
                            
                            <div class="small-transport-option-container">
                                <div class="small-transport-option-line-location-container">
                                    <div class="title">
                                        {{data.Name}}
                                    </div>
                                    <div class="caption">
                                        {{data.LineTypeName}}&nbsp;&rarr;&nbsp;{{data.Towards}}
                                    </div>
                                </div>
                                <div class="small-transport-option-time">
                                    <div>
                                        <h4 class="title">
                                            {{data.JourneyTime}}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </v-flex>
        </v-layout>

        <v-layout hidden-xs-only row wrap>
            <v-flex sm12 md6 class="transport-wrapper">
                <v-card dark class="transport">
                    <v-card-title class="title-row" primary-title>
                        <div>
                            <h3 class="headline">Lund</h3>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                            :headers="transportHeaders"
                            :items="transportsToLund"
                            hide-actions
                            class="elevation-1"
                        >
                            <template slot="headerCell" slot-scope="props">
                                <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <span v-on="on">
                                    {{ props.header.text }}
                                    </span>
                                </template>
                                <span>
                                    {{ props.header.text }}
                                </span>
                                </v-tooltip>
                            </template>
                            <template v-slot:items="props">
                                <td class="text-xs-right">{{ props.item.Name }}<br /><small>{{props.item.LineTypeName}} -> {{props.item.Towards}}</small> </td>
                                <td class="text-xs-right">{{ props.item.JourneyTime }}</td>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex sm12 md6 class="transport-wrapper">
                <v-card dark class="transport">
                    <v-card-title class="title-row" primary-title>
                        <div>
                            <h3 class="headline">Malmö</h3>
                        </div>
                    </v-card-title>
                     <v-card-text>
                        <v-data-table
                            :headers="transportHeaders"
                            :items="transportsToMalmo"
                            hide-actions
                            class="elevation-1"
                        >
                            <template slot="headerCell" slot-scope="props">
                                <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <span v-on="on">
                                    {{ props.header.text }}
                                    </span>
                                </template>
                                <span>
                                    {{ props.header.text }}
                                </span>
                                </v-tooltip>
                            </template>
                            <template v-slot:items="props">
                                <td class="text-xs-right">{{ props.item.Name }}<br /><small>{{props.item.LineTypeName}} -> {{props.item.Towards}}</small></td>
                                <td class="text-xs-right">{{ props.item.JourneyTime }}</td>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
            
    </article> 
</template>
<script>

export default {
    name: 'KommandoranFooterTransportDetails',
    props: {
        'transportData': Object
    },
    data () {
        return {
            transportHeaders: [
                {
                    text: 'Line',
                    align: 'center',
                    value: 'Name'
                },
                {
                    text: 'Departure', 
                    align: 'center',
                    value: 'JourneyTime'
                }
            ]
        }
    },    
    computed: {
        transportsToLund() {
            return this.transportData['Lund'];
        },
        transportsToMalmo() {
            return this.transportData['Malmö'];
        },
    },
    
    methods: {

    }
}

</script>

<style scope>
    .menu{
        padding: 1rem;
        background-color: #212121;
        opacity: 1;
    }

    .title-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .small-transport-container {
        display: flex;
        flex-direction: column;
        padding-bottom: 2rem;
    }

    .small-transport-destination-container {
        display: flex;
        flex-direction: column;        
    }
    
    .small-transport-option-container {        
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0.5rem;
    }

    .every-odd-transport-option-color:nth-child(even) {
        background: #424242;
    }

    .small-transport-option-line-location-container {
        display: flex;
        flex-direction: column;
        align-items: space-around;
    }

    .small-transport-option-line-location-container > div {
        
        padding-bottom: 0.5rem;
    }

    .small-transport-option-time {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

</style>