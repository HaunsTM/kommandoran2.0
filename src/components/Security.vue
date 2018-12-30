<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12 sm6 class="video-card-container">
                <v-card dark class="video-card">
                    <v-card-media primary class="title">Fågelmatare</v-card-media>
                    <v-card-media primary><video ref="birdFeeder" :width="videoSize.width" :height="videoSize.height"></video></v-card-media>
                    <v-card-text>Den här bilden visar en vy</v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6 class="video-card-container">
                <v-card dark class="video-card">
                    <v-card-media primary class="title">Uterum</v-card-media>
                    <v-card-media primary><video ref="outdoorRoom" :width="videoSize.width" :height="videoSize.height"></video></v-card-media>
                    <v-card-text>{{ lorem }}</v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6 class="video-card-container">
                <v-card dark class="video-card">
                    <v-card-media primary class="title">Garage</v-card-media>
                    <v-card-media primary><video ref="garage" :width="videoSize.width" :height="videoSize.height"></video></v-card-media>
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
            const baseWidth=320;
            const baseHeight=240;
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return { width: baseWidth * 0.8, height: baseHeight * 0.8 };
                default: return { width: baseWidth * 1.5, height: baseHeight * 1.5 };
                /*case 'sm': return { width: baseWidth * 1.875, height: baseHeight * 1.875 };
                case 'md': return { width: baseWidth * 3, height: baseHeight * 3};
                case 'lg': return { width: baseWidth * 3.95, height: baseHeight * 3.95 };
                case 'xl': return { width: baseWidth * 5.95, height: baseHeight * 5.95 };
                */
            }
        }
    },
    methods: {
        flvPlayer: (videoElementRef, type, url) => {
	        var flvPlayer = flvjs.createPlayer({
	            type: type,
	            url: url
	        });
	        flvPlayer.attachMediaElement(videoElementRef);
	        flvPlayer.load();

            return flvPlayer;
        }
    },
    mounted() {
        this.birdFeederCam = this.flvPlayer(this.$refs.birdFeeder, 'flv', 'http://10.0.0.4:8000/surveillance/bird-feeder.flv');
        this.outdoorRoomCam = this.flvPlayer(this.$refs.outdoorRoom, 'flv', 'http://10.0.0.4:8001/surveillance/outdoor-room.flv');
        this.garageCam = this.flvPlayer(this.$refs.garage, 'flv', 'http://10.0.0.4:8002/surveillance/garage.flv');

        this.birdFeederCam.play();
        this.outdoorRoomCam.play();
        this.garageCam.play();
    },
    beforeDestroy() {

        this.birdFeederCam.pause();
        this.birdFeederCam.unload();
        this.birdFeederCam.detachMediaElement();
        this.birdFeederCam.destroy();
        this.birdFeederCam = null;

        this.outdoorRoomCam.pause();
        this.outdoorRoomCam.unload();
        this.outdoorRoomCam.detachMediaElement();
        this.outdoorRoomCam.destroy();
        this.outdoorRoomCam = null;
        
        this.garageCam.pause();
        this.garageCam.unload();
        this.garageCam.detachMediaElement();
        this.garageCam.destroy();
        this.garageCam = null;
    }
}
</script>
<style scoped>
    .video-card-container {
        padding: 1rem;
    }

    .video-card {
        padding: 1rem;
    }
</style>
