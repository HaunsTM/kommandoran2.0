// vue.config.js
module.exports = {
  // options...
  
  baseUrl: process.env.NODE_ENV === 'production'
    ? 'http://10.0.0.4/kommandoran2.0/'
    : '/',

    /*
    ? '/kommandoran2.0/'
    : '/'
    */
}