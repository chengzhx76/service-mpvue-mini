import { getRequest, postRequest } from '@/utils/request'

export function getConfig (type) {
  return getRequest(`mp/config?type=${type}`)
}

export function updateConfig (key, value) {
  const config = {
    key,
    value
  }
  return postRequest('mp/config', config)
}

export function refreshConfig () {
  return postRequest('mp/refresh')
}
