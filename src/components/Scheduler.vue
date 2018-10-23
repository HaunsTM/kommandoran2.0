<template>
  <article>


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
	},
	watch: {
	},
}
</script>
<style scoped>

</style>
