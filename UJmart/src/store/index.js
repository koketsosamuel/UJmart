import Vue from 'vue'
import vuex from 'vuex'

import auth from './modules/auth'
import ccnu from './modules/ccnu'
import myads from './modules/myads'
import ads from './modules/ads'


// use vuex
Vue.use(vuex)

// storage

let store = new vuex.Store({
  modules: {
    auth,
    ccnu,
    myads,
    ads
  }
})

// export store, as well as create it
export default store