<template>
    <footer class="flex-container">
        <div class='left-column'>
            <kommandoran-footer-climate/>
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
    .center-column {
        padding-bottom: 2.4rem;
    }
    @media only screen and (max-width: 400px) {
        footer {
            font-size: small;
        }
        .left-column {
            width: 25%;
        }
        .center-column {
            min-width: 30%;
        }
        .right-column {
            min-width: 30%;        
        }
    }
</style>