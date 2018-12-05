const Fly = require('flyio/dist/npm/wx')
const service = new Fly()
import store from '@/store'

service.config.timeout = 60000
service.config.baseURL = 'https://chengzhx76.picp.vip/service/'
// service.config.baseURL = 'http://localhost:8086/service/'

service.interceptors.request.use(
  config => {
    config.headers['X-Token'] = store.getters.token
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log('err' + error)
    wx.showToast({
      title: '似乎没有网络~~',
      icon: 'none',
      duration: 1300
    })
    return Promise.reject(error)
  }
)

export function getRequest (url, param) {
  return service.get(url, param || {})
}
export function postRequest (url, param) {
  return service.post(url, param || {})
}

export default service
