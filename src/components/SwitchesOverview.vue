<template>
    
    <v-layout column>
      
          <PowerSwitchesMap v-bind:devicesMapSVGjsMarkup = "devicesMapSVGjsMarkup" v-bind:devices="fakeDevicesData">
          </PowerSwitchesMap>
    </v-layout>
</template>
<script>
import Vue from 'vue';
import PowerSwitchesMap from "./PowerSwitchesMap.vue";
export default {    
  name: "SwitchesOverview",
  components: {
    PowerSwitchesMap
  },
  data: () => ({
    baseUrl: process.env.BASE_URL,
    devicesMapSVGjsMarkup: ""
  }),  
	created () {
		// fetch the data when the view is created and the data is
		// already being observed
		this.fetchData();
	},
	methods: {
		fetchData : function () {
			let that = this;
			const promises = [
					Vue.axios.get(this.baseUrl + 'devices-map.svg')
			];
			debugger;
			Promise.all(promises)
			.then((response) => {
        that.devicesMapSVGjsMarkup = response[0].data;
        console.log();
			})
			.catch((error) => {
					console.log(error);
			})					
		}
  },  
	computed: {
		fakeDevicesData: function () {
			
			let devices = [
				{
					name : "1",
					color : "yellow",
					hoverText : "on"
				},
				{
					name : "2",
					color : "yellow",
					hoverText : "on"
				},
				{
					name : "3",
					color : "yellow",
					hoverText : "on"
				},
				{
					name : "4",
					color : "yellow",
					hoverText : "on"
				},
				{
					name : "5",
					color : "gray",
					hoverText : "off"
				},
				{
					name : "6",
					color : "gray",
					hoverText : "off"
				},
				{
					name : "7",
					color : "gray",
					hoverText : "off"
				},
				{
					name : "8",
					color : "gray",
					hoverText : "off"
				},
				{
					name : "9",
					color : "gray",
					hoverText : "off"
				},
				{
					name : "10",
					color : "yellow",
					hoverText : "on"
				},
				{
					name : "11",
					color : "gray",
					hoverText : "off"
				},
				{
					name : "12",
					color : "gray",
					hoverText : "on"
				},
				{
					name : "13",
					color : "gray",
					hoverText : "off"
				},
				{
					name : "14",
					color : "gray",
					hoverText : "on"
				},
				{
					name : "15",
					color : "gray",
					hoverText : "off"
				},
				{
					name : "16",
					color : "gray",
					hoverText : "off"
				},
				{
					name : "17",
					color : "gray",
					hoverText : "off"
				},
				{
					name : "18",
					color : "gray",
					hoverText : "off"
				},
				{
					name : "19",
					color : "gray",
					hoverText : "off"
				},
				{
					name : "20",
					color : "gray",
					hoverText : "off"
				},
				{
					name : "21",
					color : "yellow",
					hoverText : "on"
				},
				{
					name : "22",
					color : "yellow",
					hoverText : "off"
				},
				{
					name : "23",
					color : "gray",
					hoverText : "off"
				},
				{
					name : "24",
					color : "yellow",
					hoverText : "on"
				},
				{
					name : "25",
					color : "yellow",
					hoverText : "on"
				},
			];
			return devices;
		}
	}
}
</script>
<style scoped>

</style>
