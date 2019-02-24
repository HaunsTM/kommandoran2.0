import TelldusActionValueType from './TelldusActionValueType';
import { ColorProvider } from './colorProvider.hlp';

export default class TelldusActionValue {

    constructor(id, actionValue) {
        this._id = id;
        this._actionValue = actionValue;
    }
    
    get Id() {
        return this._id;
    }
    
    get ActionValue() {
        return this._actionValue;
    }
    
    static ActionValueWithType() {
        
        const actionValueWithTypeEnum = {
            'ON' : {'ActionValue' : 'on', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            'OFF' : {'ActionValue' : 'off' , 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            'UP' : {'ActionValue' : 'up', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().COMMAND_VALUE },
            'DOWN' : {'ActionValue' : 'down', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().COMMAND_VALUE },
            '0' : {'ActionValue' : '0', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '1' : {'ActionValue' : '1', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '2' : {'ActionValue' : '2', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '3' : {'ActionValue' : '3', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '4' : {'ActionValue' : '4', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '5' : {'ActionValue' : '5', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '6' : {'ActionValue' : '6', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '7' : {'ActionValue' : '7', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '8' : {'ActionValue' : '8', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '9' : {'ActionValue' : '9', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '10' : {'ActionValue' : '10', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '11' : {'ActionValue' : '11', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '12' : {'ActionValue' : '12', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '13' : {'ActionValue' : '13', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '14' : {'ActionValue' : '14', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '15' : {'ActionValue' : '15', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '16' : {'ActionValue' : '16', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '17' : {'ActionValue' : '17', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '18' : {'ActionValue' : '18', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '19' : {'ActionValue' : '19', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '20' : {'ActionValue' : '20', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '21' : {'ActionValue' : '21', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '22' : {'ActionValue' : '22', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '23' : {'ActionValue' : '23', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '24' : {'ActionValue' : '24', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '25' : {'ActionValue' : '25', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '26' : {'ActionValue' : '26', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '27' : {'ActionValue' : '27', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '28' : {'ActionValue' : '28', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '29' : {'ActionValue' : '29', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '30' : {'ActionValue' : '30', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '31' : {'ActionValue' : '31', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '32' : {'ActionValue' : '32', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '33' : {'ActionValue' : '33', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '34' : {'ActionValue' : '34', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '35' : {'ActionValue' : '35', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '36' : {'ActionValue' : '36', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '37' : {'ActionValue' : '37', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '38' : {'ActionValue' : '38', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '39' : {'ActionValue' : '39', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '40' : {'ActionValue' : '40', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '41' : {'ActionValue' : '41', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '42' : {'ActionValue' : '42', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '43' : {'ActionValue' : '43', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '44' : {'ActionValue' : '44', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '45' : {'ActionValue' : '45', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '46' : {'ActionValue' : '46', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '47' : {'ActionValue' : '47', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '48' : {'ActionValue' : '48', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '49' : {'ActionValue' : '49', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '50' : {'ActionValue' : '50', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '51' : {'ActionValue' : '51', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '52' : {'ActionValue' : '52', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '53' : {'ActionValue' : '53', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '54' : {'ActionValue' : '54', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '55' : {'ActionValue' : '55', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '56' : {'ActionValue' : '56', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '57' : {'ActionValue' : '57', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '58' : {'ActionValue' : '58', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '59' : {'ActionValue' : '59', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '60' : {'ActionValue' : '60', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '61' : {'ActionValue' : '61', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '62' : {'ActionValue' : '62', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '63' : {'ActionValue' : '63', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '64' : {'ActionValue' : '64', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '65' : {'ActionValue' : '65', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '66' : {'ActionValue' : '66', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '67' : {'ActionValue' : '67', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '68' : {'ActionValue' : '68', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '69' : {'ActionValue' : '69', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '70' : {'ActionValue' : '70', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '71' : {'ActionValue' : '71', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '72' : {'ActionValue' : '72', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '73' : {'ActionValue' : '73', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '74' : {'ActionValue' : '74', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '75' : {'ActionValue' : '75', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '76' : {'ActionValue' : '76', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '77' : {'ActionValue' : '77', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '78' : {'ActionValue' : '78', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '79' : {'ActionValue' : '79', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '80' : {'ActionValue' : '80', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '81' : {'ActionValue' : '81', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '82' : {'ActionValue' : '82', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '83' : {'ActionValue' : '83', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '84' : {'ActionValue' : '84', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '85' : {'ActionValue' : '85', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '86' : {'ActionValue' : '86', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '87' : {'ActionValue' : '87', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '88' : {'ActionValue' : '88', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '89' : {'ActionValue' : '89', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '90' : {'ActionValue' : '90', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '91' : {'ActionValue' : '91', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '92' : {'ActionValue' : '92', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '93' : {'ActionValue' : '93', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '94' : {'ActionValue' : '94', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '95' : {'ActionValue' : '95', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '96' : {'ActionValue' : '96', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '97' : {'ActionValue' : '97', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '98' : {'ActionValue' : '98', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '99' : {'ActionValue' : '99', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE },
            '100' : {'ActionValue' : '100', 'TelldusActionValueType_Name' : TelldusActionValueType.Name().LEVEL_VALUE }
        };
        return Object.freeze(actionValueWithTypeEnum);
    }
    static getColor(actionValue) {
        //https://vuetifyjs.com/en/style/colors
        let color = '';

        if ( /^\d+$/.test( actionValue ) ) {

            if ( actionValue === 1 || actionValue === 100 ) {

                color = ColorProvider.levelValue.on.l100;

            } else if (actionValue === 2 ) {

                color = ColorProvider.levelValue.off;

            } else if ( 2 < actionValue && actionValue < 100 )  {

                color = ColorProvider.levelValue.on.l30;

            } else {
                color = ColorProvider.error;
            }

        } else {

            if ( actionValue === 'down' ) {

                color = ColorProvider.commandValue.down;

            } else if (actionValue === 'up' ) {

                color = ColorProvider.commandValue.up;

            } else if (actionValue === 'on' ) {

                color = ColorProvider.levelValue.on.l100;

            } else if (actionValue === 'off' ) {

                color = ColorProvider.levelValue.off;

            } else {
                color = ColorProvider.error;
            }
        }

        return color;
    }
    
    /**
     * Not every TelldusUnit can deal with different level settings. A on/off device must for example be set to either on or off.
     * @param {*} telldusUnitType - string representation, example: '433 MHz - OnOff'
     * @param {*} preferredActionValue - string representation (small caps), example: 'on'
     */
    static getClosestPossibleTelldusActionValue(telldusUnitType, preferredActionValue) {
    
        switch (telldusUnitType.Name) {
            case '433 MHz - OnOff': {
                const actionValueIsNumeric = /^\d+$/.test( preferredActionValue );
                if ( actionValueIsNumeric && preferredActionValue === '2' ) { 
                    return 'off';
                } else if ( actionValueIsNumeric ) {
                    return 'on';
                } else {
                    return preferredActionValue
                }
            }
            case '433 MHz - Bell':
                return preferredActionValue;
            case '433 MHz - LightSensor':
                return preferredActionValue;
            case 'Z-Wave - OnOffDim':
                return preferredActionValue;
            case 'Z-Wave - HeatItZWaveThermostat':
                return preferredActionValue;
        
            default:
                throw new Error('Invalid TelldusUnitType: ' + telldusUnitType);
        }
    }

  }



