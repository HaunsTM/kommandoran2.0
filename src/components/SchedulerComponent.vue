<template>
  <div>
    <md-checkbox v-model="boolean">Accent <small>(Default)</small></md-checkbox>
    <md-checkbox v-model="boolean" class="md-primary">Primary</md-checkbox>
  </div>
</template>

<script>
  export default {
    name: 'SchedulerComponent',
    data: () => ({
      boolean: true
    })
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
