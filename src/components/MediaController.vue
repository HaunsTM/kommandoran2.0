<template>
    <section>
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <ul>
            <li v-for="mediaSource in registeredMediaSources">
                {{ mediaSource.Name }}
            </li>
        </ul>
    </section>
</template>
<script>
import axios from 'axios';
export default {
 
  data () {
    return {
      loading: false,
      registeredMediaSources: null,
      internetStreamRadioRegisteredCountries: null,
      error: null
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      const promises = [
          axios.get('http://localhost:8525/HemsamaritenWCFService/media/InternetStreamRadioRegisteredCountries'),
          axios.get('http://localhost:8525/HemsamaritenWCFService/media/InternetStreamRadioSourcesList')
      ];
      Promise.all(promises)
            .then((response) => {
                this.loading = false;
                this.internetStreamRadioRegisteredCountries = response[0].data;
                this.registeredMediaSources = response[1].data;                
            })
            .catch((error) => {
                this.loading = false;
                console.log(error);
            });

    }
  
    }
}
</script>
<style scoped>

</style>
