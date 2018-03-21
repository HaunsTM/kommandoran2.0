<template>
  <article>  
      <section class="flex-container-row">
        
        <section class="flex-container-column">
          
        </section>
        
        <section class="flex-container-column">
          <section class="flex-container-row flex-wrap">
            <md-checkbox v-model="boolean">Accent <small>(Default)</small></md-checkbox>
            <md-checkbox v-model="boolean">Accent <small>(Default)</small></md-checkbox>
            <md-checkbox v-model="boolean">Accent <small>(Default)</small></md-checkbox>
            <md-checkbox v-model="boolean">Accent <small>(Default)</small></md-checkbox>
            <md-checkbox v-model="boolean">Accent <small>(Default)</small></md-checkbox>
          </section>
          <section class="flex-container-row flex-wrap">
            <md-checkbox v-model="boolean">Accent <small>(Default)</small></md-checkbox>
            <md-checkbox v-model="boolean">Accent <small>(Default)</small></md-checkbox>
          </section>
          <section class="flex-container-row flex-wrap">            
            <md-checkbox v-model="boolean">Accent <small>(Default)</small></md-checkbox>
          </section>
        </section>
        
      </section>
    <md-checkbox v-model="boolean">Accent <small>(Default)</small></md-checkbox>
    <md-checkbox v-model="boolean" class="md-primary">Primary</md-checkbox>
  </article>
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

.flex-container-column {
    display: flex;
    flex-direction: column;
}

.flex-container-row {
    display: flex;
    flex-direction: row;
}

.flex-wrap {
  flex-wrap: wrap;
}
.flex-justify-start {
    justify-content: flex-start;
}

.flex-justify-end {
    justify-content: flex-end;
}
</style>
