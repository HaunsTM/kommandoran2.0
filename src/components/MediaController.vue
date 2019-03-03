<template>

    <div class="md-layout">
        <article class="md-layout-item md-size-100 md-layout md-alignment-center-center" v-if="loading">
            <div class="md-layout-item md-size-25">
                <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
            </div>
        </article>

        <article class="md-layout-item md-gutter md-layout" v-if="!loading">
            <div class="md-layout-item md-medium-size-25 md-xsmall-size-100">  
                      
                <md-field>
                    <label for="internetRadioCountry">Land</label>
                    <md-select v-model="media.countries.selected.ISOAlpha2" name="internetRadioCountry" id="internetRadioCountry">
                        <md-option v-for="(option, index) in media.countries.list" v-bind:value="option.ISOAlpha2" v-bind:key="index">
                            {{ option.Name }}
                        </md-option>
                    </md-select>
                </md-field>
            </div>        

            <div class="md-layout-item md-medium-size-50 md-xsmall-size-100">
                <md-field>
                    <label for="mediaSource">Station</label>
                    <md-select v-model="media.sources.selected.Url" name="mediaSource">
                        <md-option v-for="(option, index) in countryDependentMediaSourcesList" v-bind:value="option.Url" v-bind:key="index">
                            {{ option.Name }}
                        </md-option>
                    </md-select>
                </md-field>
            </div><!---->
        </article>

        <article class="md-layout-item md-size-100 md-layout md-alignment-center-center" v-if="!loading">
            <div class="md-layout-item md-large-size-33 md-small-size-50 md-xsmall-size-100">
                <div class="media-controls-container">
                    <div class="controls">
                        <div class="image-button-style">
                            <a href="#" v-on:click.stop="stopMedia">
                                <div class="svg-image-container">
                                    <div class="svg-image media-stop"></div>
                                </div>
                            </a>
                        </div>
                        <div class="image-button-style">
                            <a href="#" v-on:click.stop="playMedia">
                                <div class="svg-image-container">
                                    <div class="svg-image media-play"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="volume">
                        <div class="image-button-style">
                            <a href="#" v-on:click.stop="mute">
                                <div class="svg-image-container">
                                    <div class="svg-image volume-mute"></div>
                                </div>
                            </a>
                        </div>
                        <div>
                            <range-slider
                                class="slider"
                                v-bind:min="media.volume.min"
                                v-bind:max="media.volume.max"
                                v-bind:step="media.volume.step"
                                v-model="media.volume.current">
                            </range-slider>
                        </div>
                        <div class="image-button-style">
                            <a href="#" v-on:click.stop="increaseMediaVolume">
                                <div class="svg-image-container">
                                    <div class="svg-image volume-max"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                
            </div>
        </article>

    </div>
</template>

<script>
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'
import axios from 'axios';

export default {
 
  data () {
    return {
        loading: false,
        media: {
            countries: {
                selected: {
                    ISOAlpha2: '',
                    Name: ''
                },
                list: []
            },
            sources: {
                selected: {
                    MediaCategoryType: '', 
                    MediaSourceCountry: '', 
                    MediaSourceCountry_ISOAlpha2: '', 
                    Name: '', 
                    Url: ''
                },
                list: []
            },
            volume: {
                max: 100,
                min: 0,
                current: 0,
                step: 1
            }
        }
    }
  },
  components: {
    RangeSlider
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData',
    'media.volume': {
        handler () {

            let requestUrl = 'http://localhost:8525/HemsamaritenWCFService/media/SetMediaVolume?value=' + this.media.volume.current;            
            
        },
        deep: true
    }
},
methods: {
    saveToLocalStoragePromise () {
        let updatdeLocalStoragePromise = new Promise( ( resolve ) => {
            try {
                let mediaJSON = JSON.stringify( this.media );
                localStorage.setItem( 'media', mediaJSON );
                resolve();
            }
            catch ( err) {
                resolve( err );
            }
        });
        return updatdeLocalStoragePromise;
    },
    fetchData () {
        this.loading = true

        if ( localStorage.getItem( 'media' ) ) this.media = JSON.parse( localStorage.getItem( 'media' ) );
        
        const promises = [
            axios.get( 'http://localhost:8525/HemsamaritenWCFService/media/InternetStreamRadioRegisteredCountries' ),
            axios.get( 'http://localhost:8525/HemsamaritenWCFService/media/InternetStreamRadioSourcesList' )
        ];

         Promise.all( promises )
        .then( ( response ) => {
            this.loading = false;
            this.media.countries.list = response[0].data;
            this.media.sources.list = response[1].data;
        } )
        .catch( ( ) => {
            this.loading = false;
        } );
    },
    playMedia: function () {
        let selectedMediaSourceUrl = this.media.sources.selected.Url
        let requestUrl = 'http://localhost:8525/HemsamaritenWCFService/media/PlayMedia?url=' + selectedMediaSourceUrl;
        axios.get(requestUrl)
        .then( ( ) => {
            this.loading = false;          
        } )
        .catch(( ) => {
            this.loading = false;
        } );
    },
    stopMedia: function () {
        
      axios.get('http://localhost:8525/HemsamaritenWCFService/media/StopMediaPlay')
        .then( ( ) => {
            this.loading = false;          
        } )
        .catch( ( ) => {
            this.loading = false;
        } );

    },
    mute: function() {
            this.media.volume.current = this.media.volume.min;
    },
    increaseMediaVolume: function() {
        if ((this.media.volume.current + this.media.volume.step) <= this.media.volume.max) {
            this.media.volume.current = (this.media.volume.current + this.media.volume.step);
        }        
    }
  },
  computed: {
    countryDependentMediaSourcesList: function(  ) {
        if( this.media.countries.selected.ISOAlpha2 !== '' && this.media.sources.list ) {
            let curISOAlpha2 = this.media.countries.selected.ISOAlpha2;
            let tempRadioList =  this.media.sources.list.filter( s => s.MediaSourceCountry_ISOAlpha2 === curISOAlpha2 );
            return tempRadioList;
        }
        return null;
    }
  }
}
</script>

<style scoped>
    .media-controls-container {
        display: flex;
        flex-direction: column;
        background: #4CAF50;
    }
    .media-controls-container > .controls {
        display: flex;
        justify-content: center;
        flex-direction: row;
    }
    .media-controls-container > .volume {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }
    .image-button-style{
        margin: 0.2rem 0.5rem;
        padding: 0.5rem;
        text-decoration: none;

        border-radius: 0.9rem;
        transition: all 0.2s ease-in-out;
    }
    .image-button-style:hover {
        background: rgba(128,214,255, .3);
        box-shadow: 0 5px 15px rgba(66,165,245, 0.2);
    }
    .svg-image-container {
        width: 3rem;
    }
    .svg-image {
        background-size: cover;
        width: 100%;
        height: 0;
        padding: 0; /* reset */
        padding-bottom: 100%;
    }
    .media-play {
        background-image: url('../assets/media-play.svg');
    }
    .media-stop {
        background-image: url('../assets/media-stop.svg');
    }
    .volume-max {
        background-image: url('../assets/volume-max.svg');
    }
    .volume-mute {
        background-image: url('../assets/volume-mute.svg');
    }

</style>