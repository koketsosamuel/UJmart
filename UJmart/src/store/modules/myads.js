import axios from 'axios'
import jsCookies from 'js-cookie'
import config from '../../config/config'

const state = {
  
  myAds: {
    page: 1,
    pages: 1,
    ads: []
  },

  allAds: {
    page: 1,
    pages: 1,
    ads: []
  }

}

const getters = {
  myAds: (state) => state.myAds,
  allAds: state => state.allAds
}

const mutations = {

  getMyAds(state, results){
    state.myAds.page = results.page
    state.myAds.pages = results.pages
    state.myAds.ads = results.ads
  },

  getAllAds(state, results){
    state.allAds.page = results.page
    state.allAds.pages = results.pages
    state.allAds.ads = results.ads
  }

}

const actions = {

  async getMyAds({commit}) {

    let res = await axios.get(`${config.axiosConf.baseURL}ad/myads`, {
      headers: {
        Authorization: `Bearer ${jsCookies.getJSON('4u7h3n71c4710n').token}`
      }
    })
    
    commit('getMyAds', res.data)

  },

  async getAllAds({commit}, opts) {

    let res = await axios.get(`${config.axiosConf.baseURL}ad/all/${opts.page}/${opts.category}/${opts.campus}`)
    
    commit('getAllAds', res.data)

  }
}

export default {

  state,
  getters,
  mutations,
  actions

}