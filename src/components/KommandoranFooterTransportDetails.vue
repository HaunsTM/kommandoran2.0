<template>
    <article class="menu" >

        <v-layout row wrap>
            <v-flex sm12 md6 class="indoor-wrapper">
                <v-card dark class="indoor">
                    <v-card-title class="title-row" primary-title>
                        <div>
                            <h3 class="headline">Lund</h3>
                        </div>
                    </v-card-title>
                    <v-card-text>




                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex sm12 md6 class="outoor-wrapper">
                <v-card dark class="outoor">
                    <v-card-title class="title-row" primary-title>
                        <div>
                            <h3 class="headline">Malmö</h3>
                        </div>
                    </v-card-title>
                     <v-card-text>


                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
            
    </article>
</template>

<script>

export default {
    name: 'KommandoranFooterClimateDetails',
    props: {
        'climate': Object,
        'mediaWidthMoreThan400px': Boolean
    },
    data () {
        return {
        }
    },    
    computed: {

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
    .title-row > div {
        padding-right: 2rem;
    }
    .indoor {
        padding: 1rem;
    }

    .indoor-wrapper {
        padding: 1rem;
    }

    .outoor {
        padding: 1rem;
    }
    
    .outoor-wrapper {
        padding: 1rem;
    }

    .climate-icon {
        width: 24px;
    }
    

</style>