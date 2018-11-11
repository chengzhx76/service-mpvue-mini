const Fly = require('flyio/dist/npm/wx')
const service = new Fly()

service.config.timeout = 60000
service.config.baseURL = 'http://rap2api.taobao.org/app/mock/16644/'

service.interceptors.request.use(
  config => {
    config.headers['X-Token'] = 'xxx'
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)
export default service
