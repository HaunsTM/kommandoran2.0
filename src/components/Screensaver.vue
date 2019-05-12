<template>
    <div class="container">
        <img :src="imgSrc" /> 
    </div>
</template>
<script>


export default {
    name: 'Screensaver',
    data: () => {
        return {
            nonsenseNoCacheKey: -1
        }        
    },
    computed: {
        imgSrc() {
            const src = this.$API_BASE_URL + "/screensaver-image.jpg?" + this.nonsenseNoCacheKey;
            return src;
        },
     },
    methods: {
        updateNonsenseNoCacheKey() {
            this.nonsenseNoCacheKey = new Date().getTime();
        }
    },
    mounted() {
        this.intervalUpdateNonsenseNoCacheKey = setInterval(this.updateNonsenseNoCacheKey, this.$SCREENSAVER_SWITCH_INTERVAL_MS);
    },
    beforeDestroy() {
        clearInterval( this.intervalUpdateNonsenseNoCacheKey );
    }
}
</script>
<style scoped>

    img, div {
        padding: 0;
        margin: 0;
    }
    
    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    @media (max-width: 400px) {
        .container {
            width: 100%;
            height: calc(95vh - 60px - 40px);
        }
        img {
            max-width: 100%;
            height: auto;
            width: auto;
            max-height: calc(95vh - 60px - 40px);
        }
    }

   @media (min-width: 401px) {
        .container {
            width: 100%;
            height: calc(93vh - 60px - 40px);
        }
        img {
            max-width: 100%;
            height: auto;
            width: auto;
            max-height: calc(93vh - 60px - 40px);
        }

    }
</style>
