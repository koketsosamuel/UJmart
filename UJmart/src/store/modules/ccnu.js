import axios from 'axios'
import config from '../../config/config'
import jsCookies from 'js-cookie'

let token
let options

function setToken() {
  if(jsCookies.getJSON("4u7h3n71c4710n") === null || jsCookies.getJSON("4u7h3n71c4710n") === undefined) {
    token = null
  } else {
    token = jsCookies.getJSON("4u7h3n71c4710n").token
  }

  options = {
    headers: {
      Authorization: "Bearer " + token
    }
  }

}



const state = {
  categories: [],
  campuses: [],
  notifications: [],
  usersRes: {users: [], pages: Number, page: Number}
}

const getters = {

  categories: (state) => state.categories,
  campuses: (state) => state.campuses,
  notifications: (state) => state.notifications,
  users: (state) => state.usersRes

}

const mutations = {

  async getCategories(state) {
    await setToken()
    let res = await axios.get(`${config.axiosConf.baseURL}category/all`, options)
    state.categories = res.data.categories
  },

  async getCampuses(state) {
    await setToken()
    let res = await axios.get(`${config.axiosConf.baseURL}campus/all`, options)
    state.campuses = res.data.campuses
  },

  async getNotifications(state) {
    await setToken()
    let res = await axios.get(`${config.axiosConf.baseURL}notification/all`, options)
    state.notifications = res.data.notifications
  },

  async getUsers(state, page) {
    await setToken()
    let res = await axios.get(`${config.axiosConf.baseURL}user/all/${page}`, options)
    state.usersRes.users = await res.data.results.users
    state.usersRes.page = page
    state.usersRes.pages = res.data.results.pages 
  }

}

const actions = {

  getCategories({commit}) {
    commit('getCategories')
  },

  getCampuses({commit}) {
    commit('getCampuses')
  },

  getNotifications({commit}) {
    commit('getNotifications')
  },

  getUsers({commit}, page) {
    commit('getUsers', page)
  }

}


export default {

  state,
  getters,
  mutations,
  actions

}