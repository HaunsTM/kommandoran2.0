<template>
    <v-layout column>
        <v-flex xs12>
            <v-layout justify-center row>
                <v-flex xs3>
                    <router-link to="scheduler" >
                        <nav class="container">
                            <img :src="require(`@/assets/event128x128.png`)" />
                            <h6 class="headline">Schedulers</h6>
                        </nav>
                    </router-link>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12>
            <v-layout justify-space-around row>
                <v-flex xs3>
                    <router-link to="security" >
                        <nav class="container">
                            <img :src="require(`@/assets/cctv128x128.png`)" />
                            <h6 class="headline">Camera</h6>
                        </nav>
                    </router-link>
                </v-flex>
                <v-flex xs3>
                    <router-link to="switches-overview" >
                        <nav class="container">
                            <img :src="require(`@/assets/switch128x128.png`)" />
                            <h6 class="headline">Switches</h6>
                        </nav>
                    </router-link>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12>
            <v-layout justify-center row>
                <v-flex xs3>
                    <router-link to="media-controller" >
                        <nav class="container">
                            <img :src="require(`@/assets/cassette128x128.png`)" />
                            <h6 class="headline">Radio</h6>
                        </nav>
                    </router-link>
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
    .container img {
        width: 4rem;
    }
</style>
