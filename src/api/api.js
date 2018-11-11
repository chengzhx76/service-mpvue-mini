import request from '@/utils/request'

export function test (data) {
  console.log('1------>', data)
  return request({
    url: 'app/test',
    method: 'get',
    params: { data }
  })
}

export function test2 (data) {
  console.log('2------>', data)
  request.get('app/test')
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
