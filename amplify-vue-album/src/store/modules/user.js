// ログイン状態の管理やユーザー名を参照したりするのに使用する。
const state = {
  userInfo: {
    id: null,
    name: 'AAA',
    email: 'BBB',
    token: ''
  }
}

const getters = {
  getUserInfo: state => state.userInfo,
  isAuthenticated: state => !!state.userInfo.token
}

const mutations = {
  SET_USER_INFO(state, userInfo) {
    // TODO signin時に保存しておくこと
    state.userInfo = userInfo
  },
  CLEAR_USER_INFO(state) {
    // TODO signout時に保存しておくこと
    state.userInfo = { id: null, name: '', email: '', token: '' }
  }
}

const actions = {
  login({ commit }, userInfo) {
    commit('SET_USER_INFO', userInfo)
  },
  logout({ commit }) {
    commit('CLEAR_USER_INFO')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

