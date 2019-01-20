<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12 sm6 class="video-card-container">
                <v-card dark class="video-card">
                    <v-card-media primary class="title">Fågelmatare</v-card-media>
                    <img src="http://10.0.0.2:1021/mjpegfeed?oid=2&full">
                    <v-card-text>Den här bilden visar en vy</v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6 class="video-card-container">
                <v-card dark class="video-card">
                    <v-card-media primary class="title">Uterum</v-card-media>
                    <v-card-media primary><img src="http://10.0.0.2:1021/mjpegfeed?oid=1&full"></v-card-media>
                    <v-card-text>{{ lorem }}</v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6 class="video-card-container">
                <v-card dark class="video-card">
                    <v-card-media primary class="title">Garage</v-card-media>
                    <v-card-media primary><img src="http://10.0.0.2:1021/mjpegfeed?oid=3&full"></v-card-media>
                    <v-card-text>{{ lorem }}</v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>  
</template>
<script>

import Vue from 'vue';
import flvjs from 'flv.js';

Vue.prototype.$flvjs = flvjs

export default {
    name: 'Security',
    data: () => ({
        birdFeederCam: {},
        outdoorRoomCam: {},
        garageCam: {}

    }),
    computed: {
        mediaWidthMoreThan400px: () => {            
            return window.matchMedia("(min-width: 400px)").matches;
        },
        videoSize () {
            const baseWidth=1280;
            const baseHeight=720;
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return { width: baseWidth * 0. , height: baseHeight * 0.2 };
                default: return { width: baseWidth * 0.4, height: baseHeight * 0.4 };
                /*case 'sm': return { width: baseWidth * 1.875, height: baseHeight * 1.875 };
                case 'md': return { width: baseWidth * 3, height: baseHeight * 3};
                case 'lg': return { width: baseWidth * 3.95, height: baseHeight * 3.95 };
                case 'xl': return { width: baseWidth * 5.95, height: baseHeight * 5.95 };
                */
            }
        }
    },
    mounted() {
    },
    beforeDestroy() {
    }
}
</script>
<style scoped>
    img {
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
    }
    .video-card-container {
        padding: 1rem;
    }

    .video-card {
        padding: 1rem;
    }
</style>
