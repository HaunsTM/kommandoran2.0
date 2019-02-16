import moment from "moment";

export default class TelldusAction_Scheduler {

    constructor(telldusUnit_Name, telldusActionType_ActionTypeOption, telldusActionValueType_Name, telldusActionValue_ActionValue, scheduler_Day, scheduler_Hours, scheduler_Minutes) {
        this._telldusUnit_Name = telldusUnit_Name;
        this._telldusActionType_ActionTypeOption = telldusActionType_ActionTypeOption;
        this._telldusActionValueType_Name = telldusActionValueType_Name;
        this._telldusActionValue_ActionValue = telldusActionValue_ActionValue;
        this._scheduler_Day = scheduler_Day;
        this._scheduler_Hours = scheduler_Hours;
        this._scheduler_Minutes = scheduler_Minutes;
        this._scheduler_Time = scheduler_Hours.toString().padStart(2, '0') + ':' + scheduler_Minutes.toString().padStart(2, '0');
    }

    get telldusUnit_Name() {
        return this._telldusUnit_Name;
    }
    get telldusActionType_ActionTypeOption() {
        return this._telldusActionType_ActionTypeOption;
    }
    get telldusActionValueType_Name() {
        return this._telldusActionValueType_Name;
    }
    get telldusActionValue_ActionValue() {
        return this._telldusActionValue_ActionValue;
    }
    get scheduler_Day() {
        return this._scheduler_Day;
    }					
    get scheduler_Hours() {
        return this._scheduler_Hours;
    }
    get scheduler_Minutes() {
        return this._scheduler_Minutes;
    }
    get scheduler_Time() {
        return this._scheduler_Time;
    }

    static DayPilotEvent_2_TelldusActionScheduler(dayPilotEvent, telldusIdNamePhrasebook) {
        const start = moment(dayPilotEvent.start.value);
        const end = moment(dayPilotEvent.end.value);

        //dayPilotEvent.text
        const telldusUnit_Id = dayPilotEvent.resource;
        const telldusUnit_Name = telldusIdNamePhrasebook.find( (t) => { return t.TelldusUnit_Id === telldusUnit_Id }).TelldusUnit_Name;
        const telldusActionType_ActionTypeOption = 'onOffDevice';
        const telldusActionValueType_Name = 'levelValue';
        const telldusActionValue_ActionValue = 'on';

        const startTelldusActionScheduler =
            new TelldusAction_Scheduler(telldusUnit_Name, telldusActionType_ActionTypeOption, 
                telldusActionValueType_Name, telldusActionValue_ActionValue,
                start.day(), start.hours(), start.minutes());

        const endTelldusActionScheduler =
            new TelldusAction_Scheduler(telldusUnit_Name, telldusActionType_ActionTypeOption, 
                telldusActionValueType_Name, telldusActionValue_ActionValue,
                end.day(), end.hours(), end.minutes());

        return [startTelldusActionScheduler, endTelldusActionScheduler];
    }
}