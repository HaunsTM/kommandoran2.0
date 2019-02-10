
export class ColorProvider  {
 
    // https://vuetifyjs.com/en/style/colors
    
    static get commandValue() {
        return {
            /**
             * down - blue 
             */
            'down': '#2196F3',
            /**
             * down - red 
             */
            'up': '#F44336'
        }
    }
    
    static get levelValue() {

        return {
            'on': {
                    /**
                     * on - yellow lighten-5
                     */
                   'l10': '#FFFDE7',
                    /**
                     * on - yellow lighten-5
                     */
                    'l20': '#FFFDE7',
                    /**
                     * on - yellow lighten-4
                     */
                    'l30': '#FFF9C4',
                    /**
                     * on - yellow lighten-4
                     */
                    'l50': '#FFF9C4',
                    /**
                     * on - yellow lighten-3
                     */
                    'l60': '#FFF59D',
                    /**
                     * on - yellow lighten-3
                     */
                    'l70': '#FFF59D',
                    /**
                     * on - yellow lighten-2
                     */
                    'l80': '#FFF176',
                    /**
                     * on - yellow lighten-1
                     */
                    'l90': '#FFEE58',
                    /**
                     * on - yellow accent-2
                     */
                    'l100': '#FFFF00',
            },
            /**
             * off - grey lighten-1
             */
            'off': '#BDBDBD'
        }
    }

    /**
     * error - red accent-2
     */
    static get error() {
        return '#FF5252';
    }
}