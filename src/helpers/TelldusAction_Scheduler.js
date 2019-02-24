import moment from 'moment';
import TelldusActionType from './TelldusActionType';
import TelldusActionValue from './TelldusActionValue';

export default class TelldusAction_Scheduler {

    constructor( telldusUnit_Name,
                telldusActionType_ActionTypeOption,
                telldusActionValueType_Name,
                telldusActionValue_ActionValue,
                telldusAction_Scheduler_ReferenceId,
                scheduler_Day,
                scheduler_Hours,
                scheduler_Minutes) {
        this._telldusUnit_Name = telldusUnit_Name;
        this._telldusActionType_ActionTypeOption = telldusActionType_ActionTypeOption;
        this._telldusActionValueType_Name = telldusActionValueType_Name;
        this._telldusActionValue_ActionValue = telldusActionValue_ActionValue;
        this._telldusAction_Scheduler_ReferenceId = telldusAction_Scheduler_ReferenceId;
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
    get telldusAction_Scheduler_ReferenceId() {
        return this._telldusAction_Scheduler_ReferenceId;
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
        const start = moment(dayPilotEvent.start);
        const end = moment(dayPilotEvent.end);

        const telldusUnit_Id = dayPilotEvent.resource;
        const entry = telldusIdNamePhrasebook.find( (t) => { return t.TelldusUnit_Id === telldusUnit_Id } );
        const telldusUnit_Name = entry.TelldusUnit_Name;
    
        const telldusActionType_ActionTypeOption =  TelldusActionType.ActionTypeOption().ON_OFF_DEVICE; //'onOffDevice';

        const startTelldusActionValueType_Name =
            TelldusActionValue.ActionValueWithType()[dayPilotEvent.startActionValue.toUpperCase()].TelldusActionValueType_Name;//'levelValue';
        const startTelldusActionValue_ActionValue =  dayPilotEvent.startActionValue;
        const endTelldusActionValue_ActionValue =  dayPilotEvent.endActionValue;

        const telldusAction_Scheduler_ReferenceId = dayPilotEvent.id;
        
        const startTelldusActionScheduler =
            new TelldusAction_Scheduler(telldusUnit_Name, telldusActionType_ActionTypeOption, 
                startTelldusActionValueType_Name, startTelldusActionValue_ActionValue,
                telldusAction_Scheduler_ReferenceId,
                start.day(), start.hours(), start.minutes());

        const endTelldusActionScheduler =
            new TelldusAction_Scheduler(telldusUnit_Name, telldusActionType_ActionTypeOption, 
                startTelldusActionValueType_Name, endTelldusActionValue_ActionValue,
                telldusAction_Scheduler_ReferenceId,
                end.day(), end.hours(), end.minutes());
debugger;
        return [startTelldusActionScheduler, endTelldusActionScheduler];
    }
}