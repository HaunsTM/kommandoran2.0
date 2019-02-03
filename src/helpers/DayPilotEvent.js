import * as moment from 'moment';

export default class DayPilotEvent {

    constructor(startDayIndex, startTimeHHMM, endDayIndex, endTimeHHMM, timeSeparator, text, resource, referenceMonday) {

        const dateByDay = (index) => {
            // 0 = sunday, 6 = saturday
            const startMonday = moment(referenceMonday.date, referenceMonday.datePattern);
            const daysToAddBasedOnIndexRelatedToStartMonday = index === 0 ? 6 : index - 1;
            const currentDate = startMonday.add( daysToAddBasedOnIndexRelatedToStartMonday , 'days');
            
            return currentDate;
        }

        this._start = dateByDay(startDayIndex)
            .set({'hour': startTimeHHMM.split(timeSeparator)[0],
                  'minute': startTimeHHMM.split(timeSeparator)[1]});
        this._end = dateByDay(endDayIndex)
            .set({'hour': endTimeHHMM.split(timeSeparator)[0],
                  'minute': endTimeHHMM.split(timeSeparator)[1]});
        this._text = text;
        this._resource = resource;
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

  }