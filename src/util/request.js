import store from '../store'
var Fly = require("flyio/dist/npm/wx")
var fly = new Fly;

fly.config = {
  baseURL: 'http://123.206.55.50:7001/',
  timeout: 3000
}
console.log(store)
//添加请求拦截器
fly.interceptors.request.use((request) => {
  //打印出请求体
  console.log(request.body)
  if (store.state.user.openid) {
    request.headers["openid"] = store.state.user.openid;
  }
  //终止请求
  //var err=new Error("xxx")
  //err.request=request
  //return Promise.reject(new Error(""))

  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    //只将请求结果的data字段返回
    return response.data
  },
  (err) => {
    console.log(err)
    //发生网络错误后会走到这里
    //return Promise.resolve("ssss")
  }
)

export default fly