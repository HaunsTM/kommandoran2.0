<template>
    <article class="scheduler-component-column">
        <section class="scheduler-component-row max-width">
            <md-checkbox v-model="days.monday.checked">{{days.monday.name}}</md-checkbox>
            <md-checkbox v-model="days.tuesday.checked">{{days.tuesday.name}}</md-checkbox>
            <md-checkbox v-model="days.wednesday.checked">{{days.wednesday.name}}</md-checkbox>
            <md-checkbox v-model="days.thursday.checked">{{days.thursday.name}}</md-checkbox>
            <md-checkbox v-model="days.friday.checked">{{days.friday.name}}</md-checkbox>
        </section>
        <section class="scheduler-component-row max-width">
            <md-checkbox v-model="days.saturday.checked">{{days.saturday.name}}</md-checkbox>
            <md-checkbox v-model="days.sunday.checked">{{days.sunday.name}}</md-checkbox>
            <section class="scheduler-component-column">
                <md-checkbox v-model="wholeWorkWeek_checked">{{wholeWorkWeek_name}}</md-checkbox>
                <md-checkbox v-model="weekend_checked">{{weekend_name}}</md-checkbox>
            </section>
        </section>
            
    </article>
</template>

<script>
  export default {
      name: 'SchedulerComponent',
      data: () => ({
          days: {
              monday: {
                checked: false,
                cronExpressionPartName : "MON",
                name: "Mon"
              },
              tuesday: {
                checked: false,
                cronExpressionPartName : "TUE",
                name: "Tue"
              },
              wednesday: {
                checked: false,
                cronExpressionPartName : "WED",
                name: "Wed"
              },
              thursday: {
                checked: false,
                cronExpressionPartName : "THU",
                name: "Thu"
              },
              friday: {
                checked: false,
                cronExpressionPartName : "FRI",
                name: "Fri"
              },
              saturday: {
                checked: false,
                cronExpressionPartName : "SAT",
                name: "Sat"
              },
              sunday: {
                checked: false,
                cronExpressionPartName : "SUN",
                name: "Sun"
              },
          },
          wholeWorkWeek_name:  "Mon - Fri",      
          weekend_name: "Sat - Sun"          
      }),
      /*
      watch: {

          'days.monday.checked': 'setWholeWorkWeekCheckboxChecked',
          'days.tuesday.checked': 'setWholeWorkWeekCheckboxChecked',
          'days.wednesday.checked': 'setWholeWorkWeekCheckboxChecked',
          'days.thursday.checked': 'setWholeWorkWeekCheckboxChecked',
          'days.friday.checked': 'setWholeWorkWeekCheckboxChecked',

          'days.saturday.checked': 'setWheekendCheckboxChecked',
          'days.sunday.checked': 'setWheekendCheckboxChecked',
      },
      methods: {
          setWholeWorkWeekChecked : function(event) {
            this.days.monday.checked = this.wholeWorkWeek.checked;
            this.days.tuesday.checked = this.wholeWorkWeek.checked;
            this.days.wednesday.checked = this.wholeWorkWeek.checked;
            this.days.thursday.checked = this.wholeWorkWeek.checked;
            this.days.friday.checked = this.wholeWorkWeek.checked;
          },
          setWeekendChecked : function(event) {
            this.days.saturday.checked = this.weekend.checked;
            this.days.sunday.checked = this.weekend.checked;
          },
          setWholeWorkWeekCheckboxChecked: function(event) {
            this.wholeWorkWeek.checked = 
            this.days.monday.checked &&
            this.days.tuesday.checked && 
            this.days.wednesday.checked &&
            this.days.thursday.checked &&
            this.days.friday.checked;
          },
          setWheekendCheckboxChecked: function(event, noo) {
            console.log('4');
            this.weekend.checked = 
              this.days.saturday.checked &&
              this.days.sunday.checked;
          }
      },*/
      computed: {
        'weekend_checked' : {
          get: function () {
              let shouldBeChecked = 
              this.days.saturday.checked &&
              this.days.sunday.checked;

              return shouldBeChecked; 
          },
          set: function (value) {
              this.days.saturday.checked = value;
              this.days.sunday.checked = value;
          }
        },
        'wholeWorkWeek_checked' : {
          get: function () {
              let shouldBeChecked = 
              this.days.monday.checked &&
              this.days.tuesday.checked &&
              this.days.wednesday.checked &&
              this.days.thursday.checked &&
              this.days.friday.checked;

              return shouldBeChecked; 
          },
          set: function (value) {
              this.days.monday.checked = value;
              this.days.tuesday.checked = value;
              this.days.wednesday.checked = value;
              this.days.thursday.checked = value;
              this.days.friday.checked = value;
          }
        }
      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .md-checkbox  {
    margin:  0.2rem 0.2rem!important;
    padding-bottom: 0.2rem !important;
    padding-left: 0.4rem !important;
  }

  .md-checkbox .md-checkbox-label {
    padding-left: 0.2rem !important;
    white-space: nowrap !important;
  }

  .scheduler-component-column { 
    display: flex;
    flex-direction: column;
  }
  .max-width { 
    width: 12rem;
  }
  .scheduler-component-row { 
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
