<template>
<div id="app">

    <!--<router-view/>-->
  <div class="page-container md-layout-column">
    
    <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">Kommandoran 2.0™</span>

      <div class="md-toolbar-section-end">
        <md-button @click="showSidepanel = true">Favorites</md-button>
      </div>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">My App name</span>
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

    <md-drawer class="md-right" :md-active.sync="showSidepanel">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Favorites</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <span class="md-list-item-text">Abbey Christansen</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <span class="md-list-item-text">Alex Nelson</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <span class="md-list-item-text">Mary Johnson</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon>chat_bubble</md-icon>
          </md-button>
        </md-list-item>
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

<style>
.page-container {
  height: 100vh;
  overflow: hidden;
  position: relative;
  border: 1px solid black;
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>
