import { HoverTextProviderHelper } from './hoverTextProvider.hlp';
export default class TelldusUnit {
    constructor(id, name, locationDescription) {
        this._id = id;
        this._name = name;
        this._locationDescription = locationDescription;
    }

    get Id() {
        return this._id;
    }
    
    get Name() {
        return this._name;
    }

    get LocationDescription() {
        return this._locationDescription;
    }

    get TelldusUnitType() {
        return this._telldusUnitType;
    }
    
    set TelldusUnitType(value) {
        this._telldusUnitType = value;
    }

    static getHoverText(telldusUnit_Name, telldusUnitTypes_Name, telldusActionValues_ActionValue, telldusActionValues_ActionValue_SetTime) {
        return HoverTextProviderHelper.powerSwitchText(telldusUnit_Name, telldusUnitTypes_Name, telldusActionValues_ActionValue, telldusActionValues_ActionValue_SetTime);
    }
  }