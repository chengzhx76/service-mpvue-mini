import Vue from 'vue'
import App from './App'

import './iconfont/fontawesome.css'
import './styles/index.css'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
