import { getRequest } from '@/utils/request'

export function test () {
  return getRequest('app/test')
}

export function test2 (param) {
  return getRequest('app/test?y=2', param, 'x=1')
}

export function list (type, origin, dest, time, number) {
  return getRequest(`list/${type}?origin=${origin === undefined ? '' : origin}&dest=${dest === undefined ? '' : dest}&time=${time === undefined ? '' : time}&num=${number === undefined ? '' : number}`)
}
