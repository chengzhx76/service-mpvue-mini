import { getRequest, postRequest } from '@/utils/request'

export function test (param) {
  return getRequest('test?y=2', param, 'x=1')
}

export function list (service, page, pageSize) {
  const type = service.type
  const origin = service.origin
  const dest = service.dest
  const time = service.time
  const number = service.number
  const pageNum = page.pageNum

  return getRequest(`mp/list/${type}?origin=${origin === undefined ? '' : origin}&dest=${dest === undefined ? '' : dest}&time=${time === undefined ? '' : time}&num=${number === undefined ? '' : number}&page=${pageNum === undefined ? '' : pageNum}&count=${pageSize === undefined ? '' : pageSize}`)
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

export function getTravel (travelId) {
  return getRequest(`mp/travel/${travelId}`)
}

export function getCites (city) {
  return getRequest(`mp/cites?city=${city}`)
}

export function authorization (data, token, code) {
  const loginForm = {
    encryptedData: data ? data.encryptedData : '',
    iv: data ? data.iv : '',
    rawData: data ? data.rawData : '',
    signature: data ? data.signature : '',
    userInfo: data ? data.userInfo : '',
    token: token,
    code: code
  }

  return postRequest('mp/auth', loginForm)
}

export function getUserByUid (uid) {
  return getRequest(`mp/user/${uid}`)
}

export function getRelease (time, pageNum, pageSize) {
  return getRequest(`mp/user/release?time=${time === undefined ? '' : time}&page=${pageNum === undefined ? '' : pageNum}&count=${pageSize === undefined ? '' : pageSize}`)
}
