<template>
    <article class="menu" >

        <v-layout row wrap>
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
        'transportData': Object,
        'mediaWidthMoreThan400px': Boolean
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
    
    @media only screen and (min-width: 401px) {  
        .title-row > div {
            padding-right: 2rem;
        }
        .transport {
            padding: 1rem;
        }

        .transport-wrapper {
            padding: 1rem;
        }
    }
    @media only screen and (max-width: 400px) {
 
    }

</style>