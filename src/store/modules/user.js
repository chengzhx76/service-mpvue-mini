import { authorization } from '@/api/api'

const user = {
  state: {
    avatar: '',
    gender: 0,
    nickName: '',
    token: ''
  },
  mutations: {
    SET_USER: (state, user) => {
      state.avatar = user.avatarUrl
      state.gender = user.gender
      state.nickName = user.nickName
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    AuthUser ({ commit }, code) {
      return new Promise((resolve, reject) => {
        authorization('', '', code).then(res => {
          commit('SET_TOKEN', res.data.token)
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
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
