import { authorization } from '@/api/api'

function setMutations (commit, data) {
  commit('SET_USER', data)
  commit('SET_TOKEN', data.token)
  commit('SET_UID', data.uid)
  commit('SET_MOBILE_NO', data.mobileNo)
  commit('SET_IS_ADMIN', data.admin)
  commit('SET_IS_FREEZE', data.freeze)
}

const user = {
  state: {
    uid: '',
    avatar: '',
    mobileNo: '',
    gender: 0,
    nickName: '',
    token: '',
    admin: false,
    freeze: false
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
    },
    SET_IS_FREEZE: (state, freeze) => {
      state.freeze = freeze
    },
    SET_MOBILE_NO: (state, mobileNo) => {
      state.mobileNo = mobileNo
    }
  },
  actions: {
    AuthUser ({ commit }, code) {
      return new Promise((resolve, reject) => {
        authorization('', '', code).then(res => {
          setMutations(commit, res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUser ({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        authorization(data.info, state.token, data.code).then(res => {
          setMutations(commit, res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddUser ({ state, commit }, userInfo) {
      return new Promise((resolve, reject) => {
        authorization({ userInfo }, state.token).then(res => {
          setMutations(commit, res.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
