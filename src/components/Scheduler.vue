<template>
  <article>
  <SchedulerComponent v-bind:initialCronexpressions="[
'0 41 3 * * MON',
'0 41 3 * * FRI']" v-bind:devicesMapSVGjsMarkup="devicesMapSVGjsMarkup" v-bind:devices="fakeDevicesData"/>


  </article>
</template>
<script>
import SchedulerComponent from './SchedulerComponent.vue';
import axios from "axios";

const HEMSAMARITEN_WCF_SERVICE_BASE_URL_MEDIA ="http://localhost:8525/HemsamaritenWCFService/media/";
const HEMSAMARITEN_WCF_SERVICE_BASE_URL_TELLSTICK ="http://localhost:8525/HemsamaritenWCFService/tellstick/";

export default {
	components: {
		SchedulerComponent
	},
	
  data: () => ({
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
					axios.get('/static/devices-map.svg')
			];
			
			Promise.all(promises)
			.then((response) => {
				that.devicesMapSVGjsMarkup = response[0].data;
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
	},
	watch: {
		// call again the method if the route changes
		'$route': 'fetchData',
	},
}
</script>
<style scoped>

</style>
