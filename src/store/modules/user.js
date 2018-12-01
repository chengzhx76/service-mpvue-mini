import { saveUser } from '@/api/api'

const user = {
  state: {
    avatar: '',
    gender: 0,
    nickName: ''
  },
  mutations: {
    SET_USER: (state, user) => {
      state.avatar = user.avatarUrl
      state.gender = user.gender
      state.nickName = user.nickName
    }
  },
  actions: {
    // 用户名登录
    AddUser ({ commit }, userInfo) {
      console.log('===> ')
      console.log(userInfo)
      return new Promise((resolve, reject) => {
        saveUser().then(res => {
          commit('SET_USER', userInfo)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
