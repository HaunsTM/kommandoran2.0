import _ from 'lodash';
import DayPilotEvent from '../helpers/DayPilotEvent';

export class DayPilotSchedulerHelper {

    constructor( bufferTelldusSchedulerOverview, defaultStartDateMonday ) {
        this._bufferTelldusSchedulerOverview = bufferTelldusSchedulerOverview;
        this._defaultStartDateMonday = defaultStartDateMonday;
        this._NO_DATE = '0000-00-00';
    }

    get bufferTelldusSchedulerOverview() {
        return this._bufferTelldusSchedulerOverview;
    }

    get groupResourcesEvents() {
        const MIN_STRING_CONTENT_LENGTH_TO_REPRESENT_A_POSSIBLE_JSON_OBJECT = 10;
        let that = this;

        let groupedResourcesEvents = _(this._bufferTelldusSchedulerOverview)
            .filter( (e) => { return (e.ScheduledActivities && e.ScheduledActivities.length > MIN_STRING_CONTENT_LENGTH_TO_REPRESENT_A_POSSIBLE_JSON_OBJECT); })
            .map( (resource) => {
                let repetitiveActivities = _(JSON.parse(resource.ScheduledActivities))
                     .filter( (sE) => {
                         return ( sE.Scheduler_Date === this._NO_DATE )})
                    .sortBy(['TelldusActionTypes_ActionTypeOption','Scheduler_WeekDay', 'Scheduler_Hour', 'Scheduler_Minute'])
                    .value();
                return that.calendarEventArrayPerResource(resource.TelldusUnit_Id, repetitiveActivities)
            })
            .flattenDeep()
            .union()
            .value();
        return groupedResourcesEvents; 
    }

    get groupResourcesByLocation() {
        const that = this;
        let groupedResources = _(this._bufferTelldusSchedulerOverview)
            .sortBy(['TelldusActionValueType_Name'])
            .groupBy(x => x.TelldusUnitLocation_Name)
            .reduce( (result0, value, key) => {
                let resourceGroup = {
                    "name" : key,
                    "children" :  value.reduce( (result1, u) => {
                        if (u.TelldusUnitType_Name.match(that.regValidTelldusUnitTypes_Name)) {
                            let child = {
                                id :  u.TelldusUnit_Id,
                                name: u.TelldusUnit_Name + "<br />" + u.TelldusUnit_LocationDesciption,
                                
                                TelldusUnitType_Name : u.TelldusUnitType_Name,
                                TelldusUnit_Active : u.TelldusUnit_Active,
                                TelldusAction_Active : u.TelldusAction_Active
                            };
                            result1.push(child);
                        }
                        return result1;
                    }, [])
                }
                if(resourceGroup.children.length > 0) {
                    result0.push(resourceGroup);
                }
                return result0;
            }, []);
        return groupedResources;
    }

    calendarEventArrayPerResource(resourceId, resourceWithActivitiesArray) {
        let calendarEventArrayPerResource = [];
        const numberOfActivities = resourceWithActivitiesArray.length;
        let durationBarColor = "";
        let i = 0;
// DEN HÄR FUNKTIONEN BEHÖVER ÖVERSYN
        while (i < numberOfActivities) {
            let currentEventIsLastInSerie = (i + 1) === numberOfActivities;
            let currentEvent = resourceWithActivitiesArray[i];
            let currentEventDateTime = 
                this.calendarEventDateTime(currentEvent.Scheduler_Day, currentEvent.Scheduler_Time);

            switch (currentEvent.TelldusActionTypes_ActionTypeOption) {
                case "onOffDevice":
                    durationBarColor = "red";

                    if (currentEvent.TelldusActionValue_ActionValue === "on") {
                        if (!currentEventIsLastInSerie) {
                            let nextEvent = resourceWithActivitiesArray[i+1];
                            let nextEventDateTime = 
                                this.calendarEventDateTime(nextEvent.Scheduler_WeekDay, nextEvent.Scheduler_Hour, nextEvent.Scheduler_Minute);

                            if (nextEvent.TelldusActionValue_ActionValue === "off") {
                                calendarEventArrayPerResource.push(	new DayPilotEvent(
                                    currentEventDateTime, 
                                    nextEventDateTime, 
                                    resourceId, 
                                    currentEvent.TelldusActionTypes_ActionTypeOption, 
                                    durationBarColor)
                                );
                                i++;
                            } else {
                                calendarEventArrayPerResource.push(	new DayPilotEvent(
                                    currentEventDateTime, 
                                    currentEventDateTime, 
                                    resourceId, 
                                    currentEvent.TelldusActionTypes_ActionTypeOption, 
                                    durationBarColor)
                                );
                            }
                        } else {
                            calendarEventArrayPerResource.push(	new DayPilotEvent(
                                currentEventDateTime, 
                                currentEventDateTime, 
                                resourceId, 
                                currentEvent.TelldusActionTypes_ActionTypeOption, 
                                durationBarColor)
                            );
                        }
                    } else {							
                        if (!currentEventIsLastInSerie) {
                            const nextEvent = resourceWithActivitiesArray[i+1];
                            const nextEventDateTime = this.calendarEventDateTime(nextEvent.Scheduler_WeekDay, nextEvent.Scheduler_Hour, nextEvent.Scheduler_Minute);

                            if (nextEvent.TelldusActionValue_ActionValue === "on") {
                                calendarEventArrayPerResource.push(	new DayPilotEvent(
                                    currentEventDateTime, 
                                    nextEventDateTime, 
                                    resourceId, 
                                    currentEvent.TelldusActionTypes_ActionTypeOption, 
                                    durationBarColor)
                                );
                                i++;
                            } else {
                                calendarEventArrayPerResource.push(	new DayPilotEvent(
                                    currentEventDateTime, 
                                    currentEventDateTime, 
                                    resourceId, 
                                    currentEvent.TelldusActionTypes_ActionTypeOption, 
                                    durationBarColor)
                                );
                            }
                        } else {
                            calendarEventArrayPerResource.push(	new DayPilotEvent(
                                currentEventDateTime, 
                                currentEventDateTime, 
                                resourceId, 
                                currentEvent.TelldusActionTypes_ActionTypeOption, 
                                durationBarColor)
                            );
                        }
                    }
                    break;
                default:
                    durationBarColor = "blue";

            }
            i++;
        }
        return calendarEventArrayPerResource;			
    }
	
    calendarEventDateTime(day, time) {
        const daysToAdd = (day === 0) ? 6 : day - 1;
        const dateTime = new Date( this._defaultStartDateMonday );
        //dateTime.setHours(hour, minute);
        dateTime.setDate(dateTime.getDate() + daysToAdd);

        const yearValue = dateTime.getFullYear().toString();
        const monthValue = (dateTime.getMonth() + 1).toString().toString().padStart(2,'0');
        const dateValue = dateTime.getDate().toString().padStart(2,'0');
        const hourValue = hour.toString().padStart(2,'0');
        const minuteValue = minute.toString().padStart(2,'0');
        const secondValue = '00';
        
        let calendarEventDateTime = yearValue + '-' + monthValue + '-' + dateValue + 'T' +  time;
        return calendarEventDateTime;
    }

    get groupedResourcesByLocationAndTelldusUnitType() {
        const that = this;
        let groupedResources = _(this._bufferTelldusSchedulerOverview)
            .sortBy(['TelldusUnitLocation_Name'])
            .groupBy(x => x.TelldusUnitLocation_Name)
            .reduce( (result0, value0, key0) => {
                let resourceGroupByUnitLocation = {						
                    "node": {"TelldusUnitLocation_Name" : key0, "selected": false},
                    "children" :  _(value0)
                        .groupBy(x => x.TelldusUnitType_Name)
                        .reduce( (result1, value1, key1) => {
                            let child1 = {
                                "node": {"TelldusUnitType_Name" : key1, "selected": false},
                                "children" :  value1.reduce( (result2, u) => {
                                    if (u.TelldusUnitType_Name.match(that.regValidTelldusUnitTypes_Name)) {
                                        let child2 = {
                                            "TelldusUnit_Id" :  u.TelldusUnit_Id,
                                            "TelldusUnit_Name": u.TelldusUnit_Name,
                                            "selected": false,
                                            "TelldusUnit_LocationDesciption": u.TelldusUnit_LocationDesciption
                                        };
                                        result2.push(child2);
                                    }
                                    return result2;
                                }, [])
                            }
                            if(child1.children.length > 0) {
                                result1.push(child1);
                            }
                            return result1;
                        }, [])
                }
                if(resourceGroupByUnitLocation.children.length > 0) {
                    result0.push(resourceGroupByUnitLocation);
                }
                return result0;
            }, []);
        return groupedResources;
    }
}