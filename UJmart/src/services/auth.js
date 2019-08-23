import jsCookie from 'js-cookie'
import config from '../config/config'

let cookie = jsCookie.getJSON(config.authCookieName)



  function getToken () {
    if(cookie != undefined || cookie != null) {
     return cookie.token
    } else {
      return false
    }
  }

  function authorised () {
    if(cookie != undefined || cookie != null) {
     return cookie
    } else {
      return false
    }
  }

  function getAxiosAuthHeader () {
    return  "Bearer " + getToken()
  }

  export default {
    getToken: getToken(),
    authorised: authorised(),
    getAxiosAuthHeader: getAxiosAuthHeader()
  }


