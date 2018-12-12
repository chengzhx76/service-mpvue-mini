import { authorization } from '@/api/api'

const user = {
  state: {
    uid: '',
    avatar: '',
    gender: 0,
    nickName: '',
    token: '',
    admin: false
  },
  mutations: {
    SET_USER: (state, user) => {
      state.uid = user.uid
      state.avatar = user.avatarUrl
      state.gender = user.gender
      state.nickName = user.nickName
    },
    SET_UID: (state, uid) => {
      state.uid = uid
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_IS_ADMIN: (state, admin) => {
      state.admin = admin
    }
  },
  actions: {
    AuthUser ({ commit }, code) {
      return new Promise((resolve, reject) => {
        authorization('', '', code).then(res => {
          commit('SET_TOKEN', res.data.token)
          commit('SET_UID', res.data.uid)
          commit('SET_IS_ADMIN', res.data.admin)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUser ({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        authorization(data.info, state.token, data.code).then(res => {
          commit('SET_USER', res.data)
          commit('SET_TOKEN', res.data.token)
          commit('SET_IS_ADMIN', res.data.admin)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddUser ({ state, commit }, userInfo) {
      return new Promise((resolve, reject) => {
        authorization({ userInfo }, state.token).then(res => {
          commit('SET_USER', res.data)
          commit('SET_TOKEN', res.data.token)
          commit('SET_IS_ADMIN', res.data.admin)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
