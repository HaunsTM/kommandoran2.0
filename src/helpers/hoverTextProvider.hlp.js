
export class HoverTextProviderHelper {
 
    // https://vuetifyjs.com/en/style/colors
    

    static powerSwitchText(telldusUnit_Name, telldusUnitTypes_Name, telldusActionValues_ActionValue, telldusActionValues_ActionValue_SetTime) {
        let hoverText = "";
        hoverText += "Unit name: " + telldusUnit_Name + "\n";
        hoverText += "Unit type: " + telldusUnitTypes_Name + "\n";

        hoverText += "\n";
        if (telldusActionValues_ActionValue === 1) {
            //on 
            hoverText += 'on (full)'  + "\n";
        } else if (telldusActionValues_ActionValue === 2) {
            //off
            hoverText += 'off' + "\n";
        } else if (2 < telldusActionValues_ActionValue && telldusActionValues_ActionValue <= 100)  {
            // on
            hoverText += 'partially on (' + telldusActionValues_ActionValue + ' %)' + "\n";
        } else {
            // red
            hoverText += 'unknown state (' + telldusActionValues_ActionValue + ')' + "\n";
        }

        hoverText += "\n";
        hoverText += 'Updated time: ' + telldusActionValues_ActionValue_SetTime;
        return hoverText;
    }

}