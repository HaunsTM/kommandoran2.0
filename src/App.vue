<template>
  <div id="app">

      <!--<router-view/>-->
    <div class="page-container md-layout-column">
      
      <md-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="showNavigation = true">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Kommandoran 2.0™</span>

      </md-toolbar>

      <md-drawer :md-active.sync="showNavigation">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span class="md-title">Kommandoran</span>
        </md-toolbar>

        <md-list>
          <!--https://material.io/icons/-->
          <md-list-item>
            <md-icon>power_settings_new</md-icon>
            <span class="md-list-item-text">Power gadgets</span>
          </md-list-item>
          <md-list style="margin-left:30px;">

          </md-list>


          <md-list-item>
            <md-icon>settings</md-icon>
            <span class="md-list-item-text">Settings</span>
          </md-list-item>
          <md-list style="margin-left:30px;">

          </md-list>


          <md-list-item>
            <md-icon>visibility</md-icon>
            <span class="md-list-item-text">Surveillance</span>
          </md-list-item>
          <md-list style="margin-left:30px;">

          </md-list>


          <md-list-item>
            <md-icon>music_video</md-icon>
            <span class="md-list-item-text">Media</span>
          </md-list-item>
          <md-list style="margin-left:30px;">

          </md-list>



        </md-list>
      </md-drawer>

      <md-content> 
        <router-view/>
      </md-content>

    </div>

  </div>

  
</template>

<script>
export default {
  name: 'App',
  data: function data() {
    return {
      showNavigation: false,
      showSidepanel: false
    }
  }
}
</script>

<style scope>
  .page-container {
    height: 100vh;
    position: relative;
  }

  .md-content{
    padding: 1rem 0.5rem 0.5rem 0.5rem;
  }
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

</style>
