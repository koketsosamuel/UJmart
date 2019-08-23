import jsCookies from 'js-cookie'

const state = {
  loggedIn: false,
  position: 'user',
  _id: null,
  token: null
}

const getters = {

  authInfo: (state) => state

}

const mutations = {

  authenticate: (state, authData) => {
    state.loggedIn = true
    state.position = authData.pos
    state._id = authData._id
    state.token = jsCookies.getJSON('4u7h3n71c4710n').token
  },

  DeAuth: (state) => {
    state.loggedIn = false
    state.position = ''
    jsCookies.remove('4u7h3n71c4710n')

  }

}


const actions = {

  authenticate({commit}, authData) {
    commit('authenticate', authData)
  },

  DeAuth({commit}) {
    commit('DeAuth')
  }

}

export default {
  state,
  getters,
  mutations,
  actions
}