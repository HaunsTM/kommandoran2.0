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
    props: {
        'transportData': Object,
        'mediaWidthMoreThan400px': Boolean
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
