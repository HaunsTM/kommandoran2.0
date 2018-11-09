<template>
	
	<v-app id="app" dark>
		<v-navigation-drawer app></v-navigation-drawer>
		
		<v-navigation-drawer
			clipped
			fixed
			v-model="drawer"
			app
		>
			<v-list dense>
				<v-list-tile @click="navigateTo('scheduler')">
					<v-list-tile-content>
						<v-list-tile-title>Schedulers</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile @click="navigateTo('security')">
					<v-list-tile-content>
						<v-list-tile-title>Camera</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile @click="navigateTo('switches-overview')">
					<v-list-tile-content>
						<v-list-tile-title>Switches</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-list-tile @click="navigateTo('media-controller')">
					<v-list-tile-content>
						<v-list-tile-title>Radio</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
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
			<span>Sjöstorpsvägen 3A</span>
		</v-footer>
	</v-app>

</template>

<script>

import { EventBus } from './components/event-bus.js';

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
methods: {
	navigateTo(route) {
		this.$router.push({ path: route })
	},
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
		height: 90vh;
		position: relative;
	}

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
    .svg-image-container {
        width: 6rem;
    }
    .svg-image {
        background-size: cover;
        width: 100%;
        height: 0;
        padding: 0; /* reset */
        padding-bottom: 100%;
    }
    .switch {
        background-image: url('assets/switch.svg');
    }
    .time {
        background-image: url('assets/time.svg');
    }
    .security-camera {
        background-image: url('assets/security-camera.svg');
    }
    .radio {
        background-image: url('assets/radio.svg');
    }

</style>
