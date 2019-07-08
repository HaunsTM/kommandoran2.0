<template>
    <article v-if="mediaWidthMoreThan400px" class="flex-container" >
        <div class="column">
            <div>
                <img :src="require(`@/assets/air-conditioner24x24.png`)"/>
            </div>
        </div>
        <div class="column">
            <div>
                {{climate.indoors.main.temp.value}} °C 
            </div>
        </div>
        <div v-if="climate.outside.icon" class="flex-container outdoors">
            <div class="column">
                <img v-bind:src="require(`@/assets/open_weather_icons/${climate.outside.icon}.png`)" alt="" class="weather-icon">
            </div>
            <div class="column">
                {{climate.outside.tempc}} °C
            </div>        
        </div>
    </article>

    <v-carousel active-class="" v-else hide-controls hide-delimiters interval="6000">
        <v-carousel-item transition="fade">
            <div class="flex-container">
                <div class="column">
                    <img :src="require(`@/assets/air-conditioner24x24.png`)" />
                </div>
                <div class="column">
                    <div>
                        In
                    </div>
                    {{climate.indoors.main.temp.value}} °C 
                </div>        
            </div>
        </v-carousel-item>
        <v-carousel-item transition="fade">
            <div disabled="outsideClimate.icon" v-if="climate.outside.icon" class="flex-container outdoors">
                <div class="column">
                    <img v-bind:src="require(`@/assets/open_weather_icons/${climate.outside.icon}.png`)" alt="" class="weather-icon">
                </div>
                <div class="column outdoor-text">
                    <div>
                        Out
                    </div>
                    <div>                        
                        {{climate.outside.tempc}} °C
                    </div>
                </div>        
            </div>
        </v-carousel-item>
    </v-carousel>
</template>

<script>

export default {
    name: 'KommandoranFooterClimate',
    props: {
        'climate': Object,
        'mediaWidthMoreThan400px': Boolean
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
    .justify-content-center {
        align-items: center;
    }
    .indoor-icon {
        padding-right: 0.2rem;
    }
    @media only screen and (max-width: 400px) {
        .weather-icon {
            width: 30px;
        }
        .outdoor-text {
            padding-bottom: 0.4rem;
        }
    }
    @media only screen and (min-width: 401px) {
        .outdoors {
            padding-left: 1rem;
        }
        .weather-icon {
            width: 32px;
        }
    }
</style>