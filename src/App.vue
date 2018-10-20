<template>
    
    <v-app id="app">
      <v-navigation-drawer app></v-navigation-drawer>
      <v-toolbar app>
        <v-spacer></v-spacer>
        <section v-if="loading===true">
          <v-progress-circular color="green" indeterminate></v-progress-circular>
        </section>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
      <v-footer app></v-footer>
    </v-app>
  
</template>

<script>

import { EventBus } from './components/event-bus.js';

export default {
  name: 'App',  
  data: function data() {
    return {
      loading: false,
      loadingError: ""
    }
  },
  created(){
    EventBus.$on('loading', this.setLoadingState);
  },
  methods: {
    setLoadingState(data) {
      this.loading = data.isLoading;
      this.loadingError=JSON.stringify(data.error);
    }
  },
  mounted () {
    this.$mqtt.subscribe('nodered/#')
  }
}
</script>

<style scope>
  .page-container {
    height: 100vh;
    position: relative;
  }


</style>
