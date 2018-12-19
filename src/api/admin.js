import { getRequest, postRequest } from '@/utils/request'

// 管理员查看该用户下的所有行程信息
export function getTravelByUser (type, uid, pageNum, pageSize) {
  return getRequest(`user/travel/${type}?uid=${uid === uid ? '' : uid}&page=${pageNum === undefined ? '' : pageNum}&count=${pageSize === undefined ? '' : pageSize}`)
}
