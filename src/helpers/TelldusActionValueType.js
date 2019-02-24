export default class TelldusActionValueType {
    constructor(id, name) {
        this._id = id;
        this._name = name;
    }

    get Id() {
        return this._id;
    }
    
    get Name() {
        return this._name;
    }

    static Name() {
        const telldusActionValueTypeNameEnum = {
            'LEVEL_VALUE' : 'levelValue',
            'COMMAND_VALUE' : 'commandValue',
            'EFFECT_W' : 'effect_W',
            'TEMPERATURE_C' : 'temperature_C'
        };
        return Object.freeze(telldusActionValueTypeNameEnum);
    }
    
  }