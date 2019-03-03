export default class TelldusUnitType {

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

    static get Name() {
        const telldusUnitTypeNameEnum = {
            'TELLDUS_433_MHZ_ONOFF' : '433 MHz - OnOff',
            'TELLDUS_433_MHZ_BELL' : '433 MHz - Bell',
            'TELLDUS_433_MHZ_LIGHTSENSOR' : '433 MHz - LightSensor',
            'Z_WAVE_ONOFFDIM' : 'Z-Wave - OnOffDim',
            'Z_WAVE_HEAT_IT_THERMOSTAT' : 'Z-Wave - HeatItZWaveThermostat'
        };

        return Object.freeze(telldusUnitTypeNameEnum);
    }
    
}
