export default class TelldusAction {
    constructor(telldusUnit, telldusActionType, telldusActionValue) {
        this._telldusUnit = telldusUnit;
        this._telldusActionType = telldusActionType;
        this._telldusActionValue = telldusActionValue;
    }

    get telldusUnit() {
        return this._telldusUnit;
    }
    get telldusActionType() {
        return this._telldusActionType;
    }
    get telldusActionValue() {
        return this._telldusActionValue;
    }

    get toJSONObject() {
        let telldusUnit = {
            "Name" : this._telldusUnit.name
        };
        
        let telldusActionType = {
            "ActionTypeOption" : this._telldusActionType.actionTypeOption
        };
                
        let telldusActionJSON = {
            "TelldusUnit" : telldusUnit,
            "TelldusActionType" : telldusActionType,
            "TelldusActionValue" : this._telldusActionValue.actionValueWithType
        }

        return telldusActionJSON;
    }
  }