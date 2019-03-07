import _ from 'lodash';
import DayPilotEvent from '../helpers/DayPilotEvent';
import TelldusUnitType from '../helpers/TelldusUnitType';
import TelldusActionValue from '../helpers/TelldusActionValue';

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
            .filter( (e) => { 
                return (e.ScheduledActivities && e.ScheduledActivities.length > MIN_STRING_CONTENT_LENGTH_TO_REPRESENT_A_POSSIBLE_JSON_OBJECT); })
            .map( function (resource) {
                const telldusUnitType = new TelldusUnitType(null, resource.TelldusUnitType_Name);
                let repetitiveActivities = _(JSON.parse(resource.ScheduledActivities))
                    .filter( (sE) => {
                         return ( sE.Scheduler_Date === that._NO_DATE )}
                    )
                    .groupBy(sE => sE.TelldusActions_Schedulers_ReferenceId)
                    .map( function( sE ) {

                        const id = sE[0].TelldusActions_Schedulers_ReferenceId;
                        const startMonday = that._defaultStartDateMonday
                        
                        const startDayIndex = sE[0].Scheduler_Day;
                        const startTimeHHMM = sE[0].Scheduler_Time;

                        const startAndEndTimeIsEqual = sE.length < 2;

                        const endDayIndex =  startAndEndTimeIsEqual ? sE[0].Scheduler_Day : sE[1].Scheduler_Day;
                        const endTimeHHMM = startAndEndTimeIsEqual ? sE[0].Scheduler_Time : sE[1].Scheduler_Time;

                        const timeSeparator = ':';
                        const telldusUnitId = resource.TelldusUnit_Id;
                        const startTelldusActionValue_actionValue =
                            TelldusActionValue.getClosestPossibleTelldusActionValue( telldusUnitType, sE[0].TelldusActionValue_ActionValue );
                            
                        const endTelldusActionValue_actionValue =
                            TelldusActionValue.getClosestPossibleTelldusActionValue(
                                telldusUnitType, startAndEndTimeIsEqual ? sE[0].TelldusActionValue_ActionValue : sE[1].TelldusActionValue_ActionValue );

                        const dPE = new DayPilotEvent(
                            id, startMonday,
                            startDayIndex, startTimeHHMM,
                            endDayIndex, endTimeHHMM, timeSeparator,
                            telldusUnitId,
                            startTelldusActionValue_actionValue, endTelldusActionValue_actionValue);

                        return dPE.toJSON();
                     })
                    .value();
                return repetitiveActivities;
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
            .filter( x => _( that.scheduleableTelldusUnitType_Names ).includes( x.TelldusUnitType_Name ) )
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

    get groupedResourcesByLocationAndTelldusUnitType() {
        const that = this;
        let groupedResources = _(this._bufferTelldusSchedulerOverview)
            .sortBy(['TelldusUnitLocation_Name'])
            .filter( x => _( that.scheduleableTelldusUnitType_Names ).includes( x.TelldusUnitType_Name ) )
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

    get scheduleableTelldusUnitType_Names() {

        const scheduleableTelldusUnitTypes = Object.freeze([
            TelldusUnitType.Name.TELLDUS_433_MHZ_ONOFF,
            TelldusUnitType.Name.Z_WAVE_ONOFFDIM
        ]);

        return scheduleableTelldusUnitTypes;
    }
}