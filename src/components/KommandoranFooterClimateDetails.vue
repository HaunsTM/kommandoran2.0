<template>
    <article class="menu flex-container column" >
            
        <div class="row">
            <div>
                <img :src="require(`@/assets/air-conditioner24x24.png`)"/>
            </div>
        </div>

        <div class="row">
            <div>
                Main temperature
            </div>
            <div v-if="climate.indoors.main.temp.value">
                {{climate.indoors.main.temp.value}} °C<br />
                <small>{{climate.indoors.main.temp.time}}</small>
            </div>            
            <div v-if="climate.indoors.main.effect">
                ({{climate.indoors.main.temp.effect}} W)<br />
                <small>{{climate.indoors.main.effect.time}}</small>
            </div>
        </div>
        
        <div class="row">
            <div>
                Main temperature
            </div>
            <div v-if="climate.indoors.main.temp.value">
                {{climate.indoors.main.temp.value}} °C<br />
                <small>{{climate.indoors.main.temp.time}}</small>
            </div>            
            <div v-if="climate.indoors.main.effect">
                ({{climate.indoors.main.temp.effect}} W)<br />
                <small>{{climate.indoors.main.effect.time}}</small>
            </div>
        </div>
        
        <div class="row">
            <div>
                Main temperature
            </div>
            <div v-if="climate.indoors.main.temp.value">
                {{climate.indoors.main.temp.value}} °C<br />
                <small>{{climate.indoors.main.temp.time}}</small>
            </div>            
            <div v-if="climate.indoors.main.effect">
                ({{climate.indoors.main.temp.effect}} W)<br />
                <small>{{climate.indoors.main.effect.time}}</small>
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
</template>

<script>

export default {
    name: 'KommandoranFooterClimateDetails',
    props: {
        'climate': Object,
        'mediaWidthMoreThan400px': Boolean
    }
}

</script>

<style scope>
.menu{
    background-color: #212121;
    opacity: 1;
}
    .flex-container {
        display: flex;
    }
    .column {
        flex-direction: column;
    }
    .row {
        flex-direction: row;
    }
    .justify-content-center {
        align-items: center;
    }
    .indoor-icon {
        padding-right: 0.2rem;
    }
</style>