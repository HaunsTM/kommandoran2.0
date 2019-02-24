export default class TelldusActionType {
    constructor(actionTypeOption) {
        this._actionTypeOption = actionTypeOption;
    }

    get actionTypeOption() {
        return this._actionTypeOption;        
    }

    static ActionTypeOption() {
        const actionTypeOptionEnum = {
            'ADD_DEVICE' : 'addDevice',
            'BELL_DEVICE' : 'bellDevice',
            'COMMAND_DEVICE' : 'commandDevice',
            'DEVICE_LEARN' : 'deviceLearn',
            'DIM_DEVICE' : 'dimDevice',
            'GET_DEVICE_INFO' : 'getDeviceInfo',
            'GET_PROFILE' : 'getProfile',
            'GET_SENSOR_INFO' : 'getSensorInfo',
            'LIST_CLIENTS' : 'listClients',
            'LIST_DEVICES' : 'listDevices',
            'LIST_EVENTS' : 'listEvents',
            'LIST_SENSORS' : 'listSensors',
            'ON_OFF_DEVICE' : 'onOffDevice',
            'REMOVE_DEVICE' : 'removeDevice',
            'SET_DEVICE_MODEL' : 'setDeviceModel',
            'SET_DEVICE_NAME' : 'setDeviceName',
            'SET_DEVICE_PARAMETER' : 'setDeviceParameter',
            'SET_DEVICE_PROTOCOL' : 'setDeviceProtocol',
            'SET_SENSOR_IGNORE' : 'setSensorIgnore',
            'SET_SENSOR_NAME' : 'setSensorName',
            'STOP_DEVICE' : 'stopDevice',
            'UP_DOWN_DEVICE' : 'upDownDevice'
        };
        return Object.freeze(actionTypeOptionEnum);
    }
    
    static getActionTypeOptions(telldusUnitType_Name) {
        switch (telldusUnitType_Name) {
            case '433 MHz - OnOff':
                return [TelldusActionType.ActionTypeOption().ON_OFF_DEVICE];                
            case '433 MHz - LightSensor':
                return [TelldusActionType.ActionTypeOption().GET_SENSOR_INFO];
            case 'Z-Wave - OnOffDim':
                return [
                    TelldusActionType.ActionTypeOption().ON_OFF_DEVICE,
                    TelldusActionType.ActionTypeOption().DIM_DEVICE,
                    TelldusActionType.ActionTypeOption().GET_DEVICE_INFO,
                    TelldusActionType.ActionTypeOption().GET_SENSOR_INFO];
            case 'Z-Wave - HeatItZWaveThermostat':
                return [TelldusActionType.ActionTypeOption().ON_OFF_DEVICE,
                        TelldusActionType.ActionTypeOption().GET_DEVICE_INFO,
                        TelldusActionType.ActionTypeOption().GET_SENSOR_INFO];
        
            default:
                throw new Error('Invalid TelldusUnitType: ' + telldusUnitType_Name);
        }
    }
  }