import { getRequest, postRequest } from '@/utils/request'

export function test (param) {
  return getRequest('test?y=2', param, 'x=1')
}

export function list (service, page) {
  const type = service.type
  const origin = service.origin
  const dest = service.dest
  const time = service.time
  const number = service.number
  const pageNum = page.pageNum
  const count = page.count

  return getRequest(`mp/list/${type}?origin=${origin === undefined ? '' : origin}&dest=${dest === undefined ? '' : dest}&time=${time === undefined ? '' : time}&num=${number === undefined ? '' : number}&page=${pageNum === undefined ? '' : pageNum}&count=${count === undefined ? '' : count}`)
}

export function add (service) {
  console.log(service)
  const travel = {
    type: service.type,
    origin: service.origin.title,
    originLat: service.origin.lat,
    originLng: service.origin.lng,
    dest: service.dest.title,
    destLat: service.dest.lat,
    destLng: service.dest.lng,
    time: service.time,
    num: service.number,
    price: service.price,
    mobileNo: service.phone,
    returnTime: service.returnTime,
    via: service.via,
    remarks: service.remarks
  }
  return postRequest('mp/add', travel)
}

export function getCites (city) {
  return getRequest(`mp/cites?city=${city}`)
}

export function config (type) {
  return getRequest(`mp/config?type=${type}`)
}
