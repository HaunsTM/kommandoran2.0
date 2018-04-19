<template>
  <article>
  <ActionTypeComponent></ActionTypeComponent>
  <SchedulerComponent v-bind:initialCronexpressions="[
'0 41 3 * * MON',
'0 41 3 * * FRI']"/>

  </article>
</template>
<script>
import SchedulerComponent from './SchedulerComponent.vue';
import ActionTypeComponent from './ActionTypeComponent.vue';

const HEMSAMARITEN_WCF_SERVICE_BASE_URL_MEDIA ="http://localhost:8525/HemsamaritenWCFService/media/";
const HEMSAMARITEN_WCF_SERVICE_BASE_URL_TELLSTICK ="http://localhost:8525/HemsamaritenWCFService/tellstick/";

export default {
	components: {
		ActionTypeComponent,
		SchedulerComponent
	},    
	created () {
		// fetch the data when the view is created and the data is
		// already being observed
		this.fetchData()
	},
	methods: {
		fetchData : function () {

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
