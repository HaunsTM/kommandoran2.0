<template>
    <article class="scheduler-component-container">
      <section class="column">
        <section class="row">
          <PowerSwitchesMap></PowerSwitchesMap>
        </section>
        <section class="row space-between">
          <section class="time-picker">
            <v-text-field label="Picker in menu"
                          v-model="time"
                          prepend-icon="access_time"
                          v-on:click.native="showTimepickerDialog"
                          readonly>
            </v-text-field>
            <v-menu ref="menu"
                    lazy                  
                    :close-on-content-click="false"
                    v-model="displayTimePicker"
                    transition="scale-transition"                  
                    absolute
                    :position-x="timePickerPosition.x"
                    :position-y="timePickerPosition.y"
                    :return-value.sync="time">
              <v-time-picker v-model="time" 
                    max-width="20rem" color="red accent-2" format="24hr" @change="$refs.menu.save(time)"></v-time-picker>
            </v-menu>
          </section>

            <ActionTypeComponent></ActionTypeComponent>
        </section>
        <section class="day-picker">
          <h4>Action days</h4>
          <section class="row flex-wrap">
              <md-checkbox v-model="days.monday.checked">{{days.monday.name}}</md-checkbox>
              <md-checkbox v-model="days.tuesday.checked">{{days.tuesday.name}}</md-checkbox>
              <md-checkbox v-model="days.wednesday.checked">{{days.wednesday.name}}</md-checkbox>
              <md-checkbox v-model="days.thursday.checked">{{days.thursday.name}}</md-checkbox>
              <md-checkbox v-model="days.friday.checked">{{days.friday.name}}</md-checkbox>
          </section>
          <section class="row space-between">
              <section>
                <md-checkbox v-model="days.saturday.checked">{{days.saturday.name}}</md-checkbox>
                <md-checkbox v-model="days.sunday.checked">{{days.sunday.name}}</md-checkbox>
              </section>
              <section class="column multi-checker">
                  <md-checkbox v-model="wholeWorkWeek_checked">{{wholeWorkWeek_name}}</md-checkbox>
                  <md-checkbox v-model="weekend_checked">{{weekend_name}}</md-checkbox>
              </section>          
          </section>
        </section>
      </section>
    </article>
</template>

<script>
import ActionTypeComponent from "./ActionTypeComponent.vue";
import PowerSwitchesMap from "./PowerSwitchesMap.vue";

const ENOUGH_CORRECT_TIME_REG = /(?:0?(\d{1,2})):(?:0?(\d{1,2}))/;
const CRON_REG = /^([0-9]{1,2}|[*?])\s([0-9]{1,2}|[*?])\s([0-9]{1,2}|[*?])\s([0-9]{1,2}|[*?])\s([0-9]{1,2}|[*?])\s([*?]|MON|TUE|WED|THU|FRI|SAT|SUN)$/;
export default {
  name: "SchedulerComponent",
  components: {
    ActionTypeComponent,
    PowerSwitchesMap
  },
  props: ["initialCronexpressions"],
  created() {
    // fetch the data when the view is created and the data is
    //console.log(JSON.stringify(this.initialCronexpressions));
    this.currentCrons = this.initialCronexpressions;
  },
  data: () => ({
    time: null,
    displayTimePicker: false,
    timePickerPosition: {
      x: -1,
      y: -1
    },
    days: {
      monday: {
        checked: false,
        cronExpressionPartName: "MON",
        name: "Mon"
      },
      tuesday: {
        checked: false,
        cronExpressionPartName: "TUE",
        name: "Tue"
      },
      wednesday: {
        checked: false,
        cronExpressionPartName: "WED",
        name: "Wed"
      },
      thursday: {
        checked: false,
        cronExpressionPartName: "THU",
        name: "Thu"
      },
      friday: {
        checked: false,
        cronExpressionPartName: "FRI",
        name: "Fri"
      },
      saturday: {
        checked: false,
        cronExpressionPartName: "SAT",
        name: "Sat"
      },
      sunday: {
        checked: false,
        cronExpressionPartName: "SUN",
        name: "Sun"
      }
    },
    wholeWorkWeek_name: "Mon - Fri",
    weekend_name: "Sat - Sun"
  }),
  computed: {
    weekend_checked: {
      get: function() {
        let shouldBeChecked =
          this.days.saturday.checked && this.days.sunday.checked;

        return shouldBeChecked;
      },
      set: function(value) {
        this.days.saturday.checked = value;
        this.days.sunday.checked = value;
      }
    },
    wholeWorkWeek_checked: {
      get: function() {
        let shouldBeChecked =
          this.days.monday.checked &&
          this.days.tuesday.checked &&
          this.days.wednesday.checked &&
          this.days.thursday.checked &&
          this.days.friday.checked;

        return shouldBeChecked;
      },
      set: function(value) {
        this.days.monday.checked = value;
        this.days.tuesday.checked = value;
        this.days.wednesday.checked = value;
        this.days.thursday.checked = value;
        this.days.friday.checked = value;
      }
    },
    currentCrons: {
      get: function() {
        let crons = [];
        if (!this.time) return;

        let currentTime = this.time.match(ENOUGH_CORRECT_TIME_REG);
        let currentHour = currentTime[1];
        let currentMinute = currentTime[2];

        if (this.wholeWeekIsChecked()) {
          crons.push(
            "0" +
              " " +
              currentMinute +
              " " +
              currentHour +
              " " +
              "*" +
              " " +
              "*" +
              " " +
              "?"
          );
        } else {
          this.currentSelectedDaysCronExpressionPartName().forEach(
            cronExpressionPartName => {
              crons.push(
                "0" +
                  " " +
                  currentMinute +
                  " " +
                  currentHour +
                  " " +
                  "*" +
                  " " +
                  "*" +
                  " " +
                  cronExpressionPartName
              );
            }
          );
        }
        return crons;
      },
      set: function(value) {
        if (!value) return;
        let crons = value;
        let index = crons.length;

        while (index--) {
          let currentCron = crons[index];
          let cronMatches = currentCron.match(CRON_REG);
          let day = cronMatches[6];

          this.check(day);

          if (index == 0) {
            let minutes = cronMatches[2];
            let hour = cronMatches[3];
            this.time = hour.padStart(2, "0") + ":" + minutes.padStart(2, "0");
          }
        }
      }
    }
  },
  methods: {
    check(day) {
      if (new RegExp("^MON$", "i").test(day)) {
        this.days.monday.checked = true;
      } else if (new RegExp("^TUE$", "i").test(day)) {
        this.days.tuesday.checked = true;
      } else if (new RegExp("^WED$", "i").test(day)) {
        this.days.wednesday.checked = true;
      } else if (new RegExp("^THU$", "i").test(day)) {
        this.days.thursday.checked = true;
      } else if (new RegExp("^FRI$", "i").test(day)) {
        this.days.friday.checked = true;
      } else if (new RegExp("^SAT$", "i").test(day)) {
        this.days.saturday.checked = true;
      } else if (new RegExp("^SUN$", "i").test(day)) {
        this.days.sunday.checked = true;
      } else if (new RegExp("^[?*]$", "i").test(day)) {
        //do nothing
      } else {
        throw { message: "Unrecognized day-part in cronexpression." };
      }
    },
    wholeWorkWeekIsChecked() {
      return (
        this.days.monday.checked &&
        this.days.tuesday.checked &&
        this.days.wednesday.checked &&
        this.days.thursday.checked &&
        this.days.friday.checked
      );
    },
    weekendIsChecked() {
      return this.days.saturday.checked && this.days.sunday.checked;
    },
    wholeWeekIsChecked() {
      return this.wholeWorkWeekIsChecked() && this.weekendIsChecked();
    },
    currentSelectedDaysCronExpressionPartName() {
      let selectedDays = [];
      if (this.days.monday.checked)
        selectedDays.push(this.days.monday.cronExpressionPartName);
      if (this.days.tuesday.checked)
        selectedDays.push(this.days.tuesday.cronExpressionPartName);
      if (this.days.wednesday.checked)
        selectedDays.push(this.days.wednesday.cronExpressionPartName);
      if (this.days.thursday.checked)
        selectedDays.push(this.days.thursday.cronExpressionPartName);
      if (this.days.friday.checked)
        selectedDays.push(this.days.friday.cronExpressionPartName);
      if (this.days.saturday.checked)
        selectedDays.push(this.days.saturday.cronExpressionPartName);
      if (this.days.sunday.checked)
        selectedDays.push(this.days.sunday.cronExpressionPartName);
      return selectedDays;
    },
    showTimepickerDialog (e) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      console.log(""+"");
      this.$nextTick(() => {
        this.displayTimePicker = true
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.scheduler-component-container {
  /*background-color: #E8F5E9;*/
  padding: 1.6rem;
  max-width: 24rem;
}

.column {
  display: flex;
  flex-direction: column;
}

.time-picker {
  padding-left: 0.6rem;
}
.time-picker .picker__body {
  background-color: #FFFFFF
}
.time-picker .input-group__details {
  display: none;
  background-color: black;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.flex-wrap {
  flex-wrap: wrap;
}

.space-between {
  justify-content: space-between;
}
.multi-checker {
  background-color: #e3f2fd;
  padding: 0.2rem;
}

.md-checkbox {
  margin: 0.2rem 0.2rem !important;
  padding-bottom: 0.2rem !important;
  padding-left: 0.4rem !important;
}

.md-checkbox .md-checkbox-label {
  padding-left: 0.2rem !important;
  white-space: nowrap !important;
}
</style>
