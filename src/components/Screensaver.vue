<template>
    <div>

    </div>  
</template>
<script>

import Vue from 'vue';

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
