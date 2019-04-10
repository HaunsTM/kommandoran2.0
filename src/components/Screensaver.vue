<template>
    
            <div class="container">
                <img :src="require(`@/assets/Photos/IMG_20190330_104033037.jpg`)" />   
            </div>
</template>
<script>


export default {
    name: 'Screensaver',
    computed: { },
    mounted() {
    },
    beforeDestroy() {
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
