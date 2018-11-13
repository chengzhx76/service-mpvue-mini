import { getRequest } from '@/utils/request'

export function test () {
  return getRequest('app/test')
}

export function test2 (param) {
  return getRequest('app/test?y=2', param, 'x=1')
}

export function list (param) {
  return getRequest('list', param)
}
