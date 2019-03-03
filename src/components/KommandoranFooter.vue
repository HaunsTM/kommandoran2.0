<template>
    <footer class="flex-container">
        <div>
            <kommandoran-footer-climate />
        </div>
        <div>
            <kommandoran-footer-transport />
        </div>
        <div>
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
    }
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
</style>