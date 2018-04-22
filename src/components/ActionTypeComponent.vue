<template>
  <article class="row">
      <md-switch v-model="turnOn" class="md-primary"></md-switch>
      <div class="svg-image-container" v-bind:class="{ hide: !turnOn}">
          <div class="relative">
            <div class="svg-image absolute light-bulb-turned-on"></div>
          </div>
            <div class="glowing"></div>
      </div>
      <div class="svg-image-container" v-bind:class="{ hide: turnOn}" >
        <div class="svg-image light-bulb-turned-off"></div>
      </div>
  </article>
</template>

<script>
export default {
  name: "ActionTypeComponent",
  data: () => ({
    turnOn: false
  }),
  props: ["actionTypes", "possibleUntisToPerformActionOn"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .hide {
    display: none;
  }

  .svg-image-container {
    width: 2rem;
  }
  .relative {
    position: relative;
  }
  .absolute {
    position:absolute;
    top: 0;
    left: 0;
  }
  .glowing {
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
    
    animation-timing-function: ease-in;

    animation-name: glow-yellow;
    animation-duration: 0.2s;
    animation-fill-mode: forwards;
  }
  @keyframes glow-yellow {
    
      from { background-color:#FFFDE7;}
      to { background-color:#FFEB3B;
      box-shadow: 0rem -0.5rem 2rem 0.5rem #FFEB3B;}
  }
  .svg-image {
    background-size: cover;
    width: 100%;
    height: 0;
    padding: 0; /* reset */
    padding-bottom: 100%;
  }
  
  .light-bulb-turned-on {
    background-image: url("../assets/light-bulb-turned-on.svg");
  
  }
  .light-bulb-turned-off {
    background-image: url("../assets/light-bulb-turned-off.svg");
  }
</style>