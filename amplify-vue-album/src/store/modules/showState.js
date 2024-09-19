// ログイン状態の管理やユーザー名を参照したりするのに使用する。
const state = {
    showCheckbox:false
}

const getters = {
    getState: state => state.showCheckbox,
}

const mutations = {
    CHANGE_SELECTION() {
        console.log('CHANGE_SELECTION',state.showCheckbox , !state.showCheckbox);
        state.showCheckbox = !state.showCheckbox
    }
}

const actions = {
    activechange({ commit }) {
        commit('CHANGE_SELECTION')
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}

