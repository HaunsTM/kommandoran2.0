<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex xs4>
                <div class="container">
                    <iframe class="cam" src="http://10.0.0.110/video/mjpg.cgi"></iframe>
                </div>
            </v-flex>
            <v-flex xs4>
                <div class="container">
                    <iframe class="cam" src="http://10.0.0.111/video/mjpg.cgi"></iframe>
                </div>
            </v-flex>
            <v-flex xs4>
                <div class="container">
                    <iframe class="cam" src="http://10.0.0.112/video/mjpg.cgi"></iframe>
                </div>
            </v-flex>
        </v-layout>
    </v-container>  
</template>
<script>

import Vue from 'vue';

import moment from "moment";
import localization from 'moment/locale/sv';

export default {
    name: 'KommandoranFooterClimate',
    data: () => ({
    }),
    computed: {
        mediaWidthMoreThan400px: () => {            
            return window.matchMedia("(min-width: 400px)").matches;
        }
    },
    methods: {
    },
    mounted() {
    },
    beforeDestroy() {
    }
}
</script>
<style scoped>
    .container {
    width: 400px;
    height: 600px;
    padding: 0;
    overflow: hidden;
}

.cam {
    width: 1189;
    height: 668;
    border: 0;
    transform: scale(0.45);

    transform-origin: 0 0;
}
</style>
