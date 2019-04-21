<template>
	
	<v-app id="app" dark>
		<v-navigation-drawer
			clipped
			fixed
			v-model="drawer"
			app
		>	
		<navigation-list v-on:navigateTo="navigateTo"/>
		</v-navigation-drawer>
		<v-toolbar app fixed clipped-left>
			<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
			<v-toolbar-title>Kommandoran&trade; 2.0</v-toolbar-title>
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
		<v-footer app fixed>
			<kommandoran-footer />
		</v-footer>
	</v-app>

</template>

<script>

import { EventBus } from './components/event-bus.js';

import KommandoranFooter from './components/KommandoranFooter.vue'

import NavigationList from './components/NavigationList.vue'

export default {
	name: 'App',
	data: () => ({
		drawer: false,		
		loading: false,
		loadingError: ""
	}),
	created(){
		EventBus.$on('loading', this.setLoadingState);
	},
	components: {
		KommandoranFooter,
		NavigationList
	},
	methods: {
		navigateTo(route) {
			this.$router.push({ path: route })
		},
		setLoadingState(data) {
			this.loading = data.isLoading;
			this.loadingError=JSON.stringify(data.error);
		}
	},
	
	onIdle() {
		this.navigateTo('screensaver');
	},
	onActive() {
		this.navigateTo('/');
	},
	mounted () {
		this.$mqtt.subscribe('nodered/#')
	}
}
</script>

<style scope>
	.page-container {
        max-height: calc(100vh - 150px);
		border: 1px solid red;
		overflow-y: scroll;
	}
</style>
