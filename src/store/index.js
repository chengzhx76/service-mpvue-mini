import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import app from './modules/app'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user
  },
  getters,
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => wx.getStorageSync(key),
        setItem: (key, value) => wx.setStorageSync(key, value),
        removeItem: key => wx.clearStorage()
      }
    })
  ]
})

Vue.use({
  install (Vue, options) {
    Vue.prototype.$store = store
  }
})

export default store
