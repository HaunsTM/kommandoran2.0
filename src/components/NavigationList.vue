<template>      
        <v-list dense>
            <v-list-tile @click="navigateTo('scheduler')">
                <v-list-tile-action>
                    <img :src="require(`@/assets/event32x32.png`)" />
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Schedulers</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="navigateTo('security')">
                <v-list-tile-action>
                    <img :src="require(`@/assets/cctv32x32.png`)" />
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Camera</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="navigateTo('switches-overview')">
                <v-list-tile-action>
                    <img :src="require(`@/assets/switch32x32.png`)" />
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Switches</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="navigateTo('media-controller')">
                <v-list-tile-action>
                    <img :src="require(`@/assets/cassette32x32.png`)" />
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Radio</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

</template>

<script>
export default {
  name: 'NavigationDrawer',
  props: ['drawer']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
