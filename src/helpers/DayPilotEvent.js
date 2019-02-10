
import { DayPilot } from 'daypilot-pro-vue'

export default class DayPilotEvent {

    constructor(referenceMonday, startDayIndex, startTimeHHMM, endDayIndex, endTimeHHMM, timeSeparator, resource, text, barColor ) {

        const dateByDay = (index) => {
            // 0 = sunday, 6 = saturday
            const startMonday = DayPilot.Date.parse(referenceMonday.date, referenceMonday.datePattern);
            const daysToAddBasedOnIndexRelatedToStartMonday = index === 0 ? 6 : index - 1;
            const currentDate = startMonday.addDays( daysToAddBasedOnIndexRelatedToStartMonday);
            
            return currentDate;
        }

        this._start = dateByDay(startDayIndex)
            .addHours(startTimeHHMM.split(timeSeparator)[0])
            .addMinutes(startTimeHHMM.split(timeSeparator)[1]);
        
        this._end = dateByDay(endDayIndex)
            .addHours(endTimeHHMM.split(timeSeparator)[0])
            .addMinutes(endTimeHHMM.split(timeSeparator)[1]);

        this._id = DayPilot.guid();
        this._text = text;
        this._resource = resource;
        this._barColor = barColor;
    }
//https://api.daypilot.org/daypilot-event-data/
    get barColor () {
        return this._barColor;
    }

    get start() {
        return this._start;
    }

    get end() {
        return this._end;
    }

    get id() {
        return this._id;
    }

    get text() {
        return this._text;
    }

    get resource() {
        return this._resource;
    }

    static TelldusUnitTypes
  }