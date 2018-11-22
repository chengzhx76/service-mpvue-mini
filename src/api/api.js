import { getRequest, postRequest } from '@/utils/request'

export function test (param) {
  return getRequest('test?y=2', param, 'x=1')
}

export function list (service, page) {
  const type = service.type
  const origin = service.origin
  const dest = service.dest
  const date = service.date
  const number = service.number
  const pageSize = page.pageSize
  const count = page.count

  return getRequest(`mp/list/${type}?origin=${origin === undefined ? '' : origin}&dest=${dest === undefined ? '' : dest}&date=${date === undefined ? '' : date}&num=${number === undefined ? '' : number}&page=${pageSize === undefined ? '' : pageSize}&count=${count === undefined ? '' : count}`)
}

export function add (service) {
  return postRequest('mp/add', service)
}
