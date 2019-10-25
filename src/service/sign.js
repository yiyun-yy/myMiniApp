
import request from '../util/request'

// 登陆接口
export function addSign(params) {
  return request.post('/sign', params)
}

// 获取面试列表
export function getInterViewList(params) {
  console.log(params,'params---')
  return request.get('/sign', {
    ...params
  })
}

// 获取详情列表信息
export function getDetailList(params) {
  console.log(params)
  return request.get(`/sign?id=${params}`)
}

// 获取详情列表信息
export function upDateDetailList(params) {
  console.log(params)
  return request.put(`/sign/${params.id}`, {
    ...params.params
  })
}