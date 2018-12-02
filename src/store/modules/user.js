import { saveUser, authorization } from '@/api/api'

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
    // 用户名登录
    AddUser ({ commit }, userInfo) {
      console.log('===>store.user.AddUser')
      console.log(userInfo)
      return new Promise((resolve, reject) => {
        saveUser().then(res => {
          commit('SET_USER', userInfo)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    AuthUser ({ commit }, code) {
      console.log('===>store.user.AuthUser')
      console.log(code)
      return new Promise((resolve, reject) => {
        authorization(code).then(res => {
          commit('SET_TOKEN', res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
