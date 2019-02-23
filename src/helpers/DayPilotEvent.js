
import * as moment from 'moment';
export default class DayPilotEvent {

    constructor(id, startMonday, startDayIndex, startTimeHHMMSS, endDayIndex, endTimeHHMMSS, timeSeparator, resource, text, barColor ) {

        const dateByDay = (index) => {
            // 0 = sunday, 6 = saturday
            const daysToAddBasedOnIndexRelatedToStartMonday = index === 0 ? 6 : index - 1;
            const currentDate = moment(startMonday).add( daysToAddBasedOnIndexRelatedToStartMonday, 'days');
            
            return currentDate;
        }
        const tempFirst = dateByDay(startDayIndex)
            .add(startTimeHHMMSS.split(timeSeparator)[0], 'hours')
            .add(startTimeHHMMSS.split(timeSeparator)[1], 'minutes');
        
        const tempLast = dateByDay(endDayIndex)
            .add(endTimeHHMMSS.split(timeSeparator)[0], 'hours')
            .add(endTimeHHMMSS.split(timeSeparator)[1], 'minutes');

        const localFormat = 'YYYY-MM-DD[T]HH:mm:ss';
        this._start = tempFirst.isBefore(tempLast) ? tempFirst.format(localFormat) : tempLast.format(localFormat);
        this._end = tempFirst.isBefore(tempLast) ? tempLast.format(localFormat) : tempFirst.format(localFormat);

        this._id = id;
        this._text = text;
        this._resource = resource;
        this._barColor = barColor;
    }
//https://api.daypilot.org/daypilot-event-data/
    get barColor() {
        return this._barColor;
    }

    get end() {
        return this._end;
    }

    get id() {
        return this._id;
    }

    get resource() {
        return this._resource;
    }

    get start() {
        return this._start;
    }

    get text() {
        return this._text;
    }

    toJSON() {
        return {
            "barColor": this.barColor,        
            "end": this.end,        
            "id": this.id,        
            "resource": this.resource,        
            "start": this.start,        
            "text":  this.text
        }
    }
}