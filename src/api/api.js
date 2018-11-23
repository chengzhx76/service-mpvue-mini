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
  const pageNum = page.pageNum
  const count = page.count

  return getRequest(`mp/list/${type}?origin=${origin === undefined ? '' : origin}&dest=${dest === undefined ? '' : dest}&time=${date === undefined ? '' : date}&num=${number === undefined ? '' : number}&page=${pageNum === undefined ? '' : pageNum}&count=${count === undefined ? '' : count}`)
}

export function add (service) {
  return postRequest('mp/add', service)
}
