<template>      
    <v-list dense>
        <v-list-tile v-on:click="routeLinkClick('scheduler')">
            <v-list-tile-action>
                <img :src="require(`@/assets/event32x32.png`)" />
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Schedulers</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-on:click="routeLinkClick('security')">
            <v-list-tile-action>
                <img :src="require(`@/assets/cctv32x32.png`)" />
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Camera</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-on:click="routeLinkClick('switches-overview')">
            <v-list-tile-action>
                <img :src="require(`@/assets/switch32x32.png`)" />
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>Switches</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-on:click="routeLinkClick('media-controller')">
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
  name: 'NavigationList',
  props: ['drawer'],
  methods: {      
    routeLinkClick(route) {         
        this.$emit('navigateTo', route)
	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
