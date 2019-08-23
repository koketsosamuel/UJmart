import axios from 'axios'
import config from '../../config/config'

const state = {

  ad: null,
  ads: {
    page: null,
    pages: null,
    ads: []
  }

}

const getters = {
  ad: (state) => state.ad
}

const mutations = {
  getAd(state, ad) {
    state.ad = ad
  }
}

const actions = {

  async getAd({commit}, id) {
    let res = await axios.get(`${config.axiosConf.baseURL}ad/one/${id}`)
    commit('getAd', res.data.ad)
  }
 
}


export default {

  state,
  getters,
  mutations,
  actions

}