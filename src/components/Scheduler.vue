<template>
  <SchedulerComponent />
</template>
<script>
import SchedulerComponent from './SchedulerComponent.vue';

const HEMSAMARITEN_WCF_SERVICE_BASE_URL_MEDIA ="http://localhost:8525/HemsamaritenWCFService/media/";
const HEMSAMARITEN_WCF_SERVICE_BASE_URL_TELLSTICK ="http://localhost:8525/HemsamaritenWCFService/tellstick/";

export default {
	components: {
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
