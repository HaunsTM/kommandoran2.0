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
            "ON" : {"ActionValue" : "on", "TelldusActionValueType" : "levelValue"},
            "OFF" : {"ActionValue" : "off" , "TelldusActionValueType" : "levelValue"},
            "UP" : {"ActionValue" : "up", "TelldusActionValueType" : "commandValue"},
            "DOWN" : {"ActionValue" : "down", "TelldusActionValueType" : "commandValue"},
            "0" : {"ActionValue" : "0", "TelldusActionValueType" : "levelValue"},
            "1" : {"ActionValue" : "1", "TelldusActionValueType" : "levelValue"},
            "2" : {"ActionValue" : "2", "TelldusActionValueType" : "levelValue"},
            "3" : {"ActionValue" : "3", "TelldusActionValueType" : "levelValue"},
            "4" : {"ActionValue" : "4", "TelldusActionValueType" : "levelValue"},
            "5" : {"ActionValue" : "5", "TelldusActionValueType" : "levelValue"},
            "6" : {"ActionValue" : "6", "TelldusActionValueType" : "levelValue"},
            "7" : {"ActionValue" : "7", "TelldusActionValueType" : "levelValue"},
            "8" : {"ActionValue" : "8", "TelldusActionValueType" : "levelValue"},
            "9" : {"ActionValue" : "9", "TelldusActionValueType" : "levelValue"},
            "10" : {"ActionValue" : "10", "TelldusActionValueType" : "levelValue"},
            "11" : {"ActionValue" : "11", "TelldusActionValueType" : "levelValue"},
            "12" : {"ActionValue" : "12", "TelldusActionValueType" : "levelValue"},
            "13" : {"ActionValue" : "13", "TelldusActionValueType" : "levelValue"},
            "14" : {"ActionValue" : "14", "TelldusActionValueType" : "levelValue"},
            "15" : {"ActionValue" : "15", "TelldusActionValueType" : "levelValue"},
            "16" : {"ActionValue" : "16", "TelldusActionValueType" : "levelValue"},
            "17" : {"ActionValue" : "17", "TelldusActionValueType" : "levelValue"},
            "18" : {"ActionValue" : "18", "TelldusActionValueType" : "levelValue"},
            "19" : {"ActionValue" : "19", "TelldusActionValueType" : "levelValue"},
            "20" : {"ActionValue" : "20", "TelldusActionValueType" : "levelValue"},
            "21" : {"ActionValue" : "21", "TelldusActionValueType" : "levelValue"},
            "22" : {"ActionValue" : "22", "TelldusActionValueType" : "levelValue"},
            "23" : {"ActionValue" : "23", "TelldusActionValueType" : "levelValue"},
            "24" : {"ActionValue" : "24", "TelldusActionValueType" : "levelValue"},
            "25" : {"ActionValue" : "25", "TelldusActionValueType" : "levelValue"},
            "26" : {"ActionValue" : "26", "TelldusActionValueType" : "levelValue"},
            "27" : {"ActionValue" : "27", "TelldusActionValueType" : "levelValue"},
            "28" : {"ActionValue" : "28", "TelldusActionValueType" : "levelValue"},
            "29" : {"ActionValue" : "29", "TelldusActionValueType" : "levelValue"},
            "30" : {"ActionValue" : "30", "TelldusActionValueType" : "levelValue"},
            "31" : {"ActionValue" : "31", "TelldusActionValueType" : "levelValue"},
            "32" : {"ActionValue" : "32", "TelldusActionValueType" : "levelValue"},
            "33" : {"ActionValue" : "33", "TelldusActionValueType" : "levelValue"},
            "34" : {"ActionValue" : "34", "TelldusActionValueType" : "levelValue"},
            "35" : {"ActionValue" : "35", "TelldusActionValueType" : "levelValue"},
            "36" : {"ActionValue" : "36", "TelldusActionValueType" : "levelValue"},
            "37" : {"ActionValue" : "37", "TelldusActionValueType" : "levelValue"},
            "38" : {"ActionValue" : "38", "TelldusActionValueType" : "levelValue"},
            "39" : {"ActionValue" : "39", "TelldusActionValueType" : "levelValue"},
            "40" : {"ActionValue" : "40", "TelldusActionValueType" : "levelValue"},
            "41" : {"ActionValue" : "41", "TelldusActionValueType" : "levelValue"},
            "42" : {"ActionValue" : "42", "TelldusActionValueType" : "levelValue"},
            "43" : {"ActionValue" : "43", "TelldusActionValueType" : "levelValue"},
            "44" : {"ActionValue" : "44", "TelldusActionValueType" : "levelValue"},
            "45" : {"ActionValue" : "45", "TelldusActionValueType" : "levelValue"},
            "46" : {"ActionValue" : "46", "TelldusActionValueType" : "levelValue"},
            "47" : {"ActionValue" : "47", "TelldusActionValueType" : "levelValue"},
            "48" : {"ActionValue" : "48", "TelldusActionValueType" : "levelValue"},
            "49" : {"ActionValue" : "49", "TelldusActionValueType" : "levelValue"},
            "50" : {"ActionValue" : "50", "TelldusActionValueType" : "levelValue"},
            "51" : {"ActionValue" : "51", "TelldusActionValueType" : "levelValue"},
            "52" : {"ActionValue" : "52", "TelldusActionValueType" : "levelValue"},
            "53" : {"ActionValue" : "53", "TelldusActionValueType" : "levelValue"},
            "54" : {"ActionValue" : "54", "TelldusActionValueType" : "levelValue"},
            "55" : {"ActionValue" : "55", "TelldusActionValueType" : "levelValue"},
            "56" : {"ActionValue" : "56", "TelldusActionValueType" : "levelValue"},
            "57" : {"ActionValue" : "57", "TelldusActionValueType" : "levelValue"},
            "58" : {"ActionValue" : "58", "TelldusActionValueType" : "levelValue"},
            "59" : {"ActionValue" : "59", "TelldusActionValueType" : "levelValue"},
            "60" : {"ActionValue" : "60", "TelldusActionValueType" : "levelValue"},
            "61" : {"ActionValue" : "61", "TelldusActionValueType" : "levelValue"},
            "62" : {"ActionValue" : "62", "TelldusActionValueType" : "levelValue"},
            "63" : {"ActionValue" : "63", "TelldusActionValueType" : "levelValue"},
            "64" : {"ActionValue" : "64", "TelldusActionValueType" : "levelValue"},
            "65" : {"ActionValue" : "65", "TelldusActionValueType" : "levelValue"},
            "66" : {"ActionValue" : "66", "TelldusActionValueType" : "levelValue"},
            "67" : {"ActionValue" : "67", "TelldusActionValueType" : "levelValue"},
            "68" : {"ActionValue" : "68", "TelldusActionValueType" : "levelValue"},
            "69" : {"ActionValue" : "69", "TelldusActionValueType" : "levelValue"},
            "70" : {"ActionValue" : "70", "TelldusActionValueType" : "levelValue"},
            "71" : {"ActionValue" : "71", "TelldusActionValueType" : "levelValue"},
            "72" : {"ActionValue" : "72", "TelldusActionValueType" : "levelValue"},
            "73" : {"ActionValue" : "73", "TelldusActionValueType" : "levelValue"},
            "74" : {"ActionValue" : "74", "TelldusActionValueType" : "levelValue"},
            "75" : {"ActionValue" : "75", "TelldusActionValueType" : "levelValue"},
            "76" : {"ActionValue" : "76", "TelldusActionValueType" : "levelValue"},
            "77" : {"ActionValue" : "77", "TelldusActionValueType" : "levelValue"},
            "78" : {"ActionValue" : "78", "TelldusActionValueType" : "levelValue"},
            "79" : {"ActionValue" : "79", "TelldusActionValueType" : "levelValue"},
            "80" : {"ActionValue" : "80", "TelldusActionValueType" : "levelValue"},
            "81" : {"ActionValue" : "81", "TelldusActionValueType" : "levelValue"},
            "82" : {"ActionValue" : "82", "TelldusActionValueType" : "levelValue"},
            "83" : {"ActionValue" : "83", "TelldusActionValueType" : "levelValue"},
            "84" : {"ActionValue" : "84", "TelldusActionValueType" : "levelValue"},
            "85" : {"ActionValue" : "85", "TelldusActionValueType" : "levelValue"},
            "86" : {"ActionValue" : "86", "TelldusActionValueType" : "levelValue"},
            "87" : {"ActionValue" : "87", "TelldusActionValueType" : "levelValue"},
            "88" : {"ActionValue" : "88", "TelldusActionValueType" : "levelValue"},
            "89" : {"ActionValue" : "89", "TelldusActionValueType" : "levelValue"},
            "90" : {"ActionValue" : "90", "TelldusActionValueType" : "levelValue"},
            "91" : {"ActionValue" : "91", "TelldusActionValueType" : "levelValue"},
            "92" : {"ActionValue" : "92", "TelldusActionValueType" : "levelValue"},
            "93" : {"ActionValue" : "93", "TelldusActionValueType" : "levelValue"},
            "94" : {"ActionValue" : "94", "TelldusActionValueType" : "levelValue"},
            "95" : {"ActionValue" : "95", "TelldusActionValueType" : "levelValue"},
            "96" : {"ActionValue" : "96", "TelldusActionValueType" : "levelValue"},
            "97" : {"ActionValue" : "97", "TelldusActionValueType" : "levelValue"},
            "98" : {"ActionValue" : "98", "TelldusActionValueType" : "levelValue"},
            "99" : {"ActionValue" : "99", "TelldusActionValueType" : "levelValue"},
            "100" : {"ActionValue" : "100", "TelldusActionValueType" : "levelValue"}
        };
        return Object.freeze(actionValueWithTypeEnum);
    }

    static getColor(actionValue) {
        //https://vuetifyjs.com/en/style/colors
        let color = "";

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
     * Not every TelldusUnit can deal with different level settings. A on/off must for example either on or of.
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



