<template>
    <v-layout column>
        <v-flex xs12>
            <v-layout justify-center row>
                <v-flex xs3>
                    <nav class="container">
                        <router-link to="scheduler" >
                            <div class="svg-image-container">
                                <div class="svg-image time"></div>
                            </div>
                        </router-link>
                        <h6 class="headline">Schedulers</h6>
                    </nav>   
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12>
            <v-layout justify-space-around row>
                <v-flex xs3>
                    <nav class="container">
                        <router-link to="security" >
                            <div class="svg-image-container">
                                <div class="svg-image security-camera"></div>
                            </div>
                        </router-link>
                        <h6 class="headline">Camera</h6>
                    </nav>
                </v-flex>
                <v-flex xs3>
                    <nav class="container">
                        <router-link to="switches-overview" >
                            <div class="svg-image-container">
                                <div class="svg-image switch"></div>
                            </div>
                        </router-link>
                        <h6 class="headline">Switches</h6>
                    </nav>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12>
            <v-layout justify-center row>
                <v-flex xs3>
                    <nav class="container">
                        <router-link to="media-controller" >
                            <div class="svg-image-container">
                                <div class="svg-image radio"></div>
                            </div>
                        </router-link>
                        <h6 class="headline">Radio</h6>
                    </nav>  
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>

</template>
<script>
export default {
  
}
</script>
<style>
    nav.container {        
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        
        border-radius: 2rem;
        transition: all 0.2s ease-in-out;
    }
    nav.container:hover {
        background: rgba(128,214,255, .3);
        box-shadow: 0 5px 15px rgba(66,165,245, 0.2);
    }
    .svg-image-container {
        width: 6rem;
    }
    .svg-image {
        background-size: cover;
        width: 100%;
        height: 0;
        padding: 0; /* reset */
        padding-bottom: 100%;
    }
    .switch {
        background-image: url('../assets/switch.svg');
    }
    .time {
        background-image: url('../assets/time.svg');
    }
    .security-camera {
        background-image: url('../assets/security-camera.svg');
    }
    .radio {
        background-image: url('../assets/radio.svg');
    }
</style>
