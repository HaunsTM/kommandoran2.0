<template>

    <div class="flex-container-column">
        <div class="flex-container-row">            
            <nav class="container">
                <router-link to="scheduler" >
                    <div class="svg-image-container">
                        <div class="svg-image time"></div>
                    </div>
                </router-link>
                <div><span>Schedulers</span></div>
            </nav>
            <nav class="container">
                <router-link to="media-controller" >
                    <div class="svg-image-container">
                        <div class="svg-image radio"></div>
                    </div>
                </router-link>
                <div><span>Radio</span></div>
            </nav>
        </div>
        <div class="flex-container-row">            
            <nav class="container">
                <router-link to="security" >
                    <div class="svg-image-container">
                        <div class="svg-image security-camera"></div>
                    </div>
                </router-link>
                <div><span>Security</span></div>
            </nav>
            <nav class="container">
                <router-link to="power-switches-map" >
                    <div class="svg-image-container">
                        <div class="svg-image switch"></div>
                    </div>
                </router-link>
                <div><span>Power Switches</span></div>
            </nav>
        </div>
    </div>


</template>
<script>
export default {
  
}
</script>
<style>
    nav.container {        
        display: flex;
        flex-direction: column;        
        align-items: center;
        margin: 1rem;
        padding: 1rem;
        
        border-radius: 2rem;
        background: rgb(128, 214, 255, 0.3);
        transition: all 0.1s ease-in-out;
    }
    nav.container:hover {
        background: rgba(66,165,245, 0.2);
        box-shadow: 0 5px 15px rgba(128,214,255, .8);
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
        background-image: url('../assets/switch.svg');
    }
    .time {
        background-image: url('../assets/time.svg');
    }
    .security-camera {
        background-image: url('../assets/security-camera.svg');
    }
    .radio {
        background-image: url('../assets/radio.svg');
    }

    .flex-container-column {
        display: flex;
        flex-direction: column;
    }


    .flex-container-row {
        display: flex;
        flex-direction: row;
    }

    .flex-justify-start {
        justify-content: flex-start;
    }
    .flex-justify-center {
         justify-content: center;
         border: 1px solid black;
    }
    .flex-justify-end {
        justify-content: flex-end;
    }
    
</style>
