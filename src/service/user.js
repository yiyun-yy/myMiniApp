import request from '../util/request'

// 登陆接口
export function code2Session(params){
  return request.post('/user/code2session', params)
}

// 解密数据
export function decryptPhone(params){
  return request.post('/user/decrypt', params);
}