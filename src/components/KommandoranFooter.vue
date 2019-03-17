<template>
    <footer class="flex-container">
        <div class='left-column'>
  <v-bottom-sheet v-model="sheet">
      
   <kommandoran-footer-climate
     slot="activator"
    ></kommandoran-footer-climate>
   <v-date-picker autosave style="" v-model="date"></v-date-picker>
  </v-bottom-sheet>
            <!--<kommandoran-footer-climate/>-->
        </div>
        <div class='center-column'>
            <kommandoran-footer-transport />
        </div>
        <div class='right-column'>
            <kommandoran-footer-time />
        </div>
    </footer>
</template>

<script>

import KommandoranFooterClimate from './KommandoranFooterClimate';
import KommandoranFooterTime from './KommandoranFooterTime';
import KommandoranFooterTransport from './KommandoranFooterTransport';

export default {
    name: 'KommandoranFooter',
  data () {
    return {
       date:'',
       sheet:null,
    }
  },
    components: {
        KommandoranFooterClimate,
        KommandoranFooterTime,
        KommandoranFooterTransport
    },
    methods: {
		fetchTemperatureData: () => {
		}
    },
}
</script>

<style scope>
    .flex-container {

        display: flex;        
        justify-content: space-between;
    }
    footer {
        font-size: 1rem;
        line-height: 1.1rem;
        width: 100%;
        padding: 0 0.3rem 0 0.3rem;
    }
    footer > div {
        display: flex;
        flex-direction: column;
        margin-bottom: -4px;
        border-bottom: 2px solid blue;

        height: 32px;
    }
    @media only screen and (min-width: 401px) {
        .center-column {
            padding-bottom: 2.4rem;
        }

    }
    @media only screen and (max-width: 400px) {
        footer {
            font-size: small;
        }
        .left-column {
            width: 20%;
        }
        .center-column {
            padding-bottom: 0.05rem;
        }
    }
</style>