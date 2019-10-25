import { code2Session, decryptPhone } from '../../service/index'
import QQMapWX from "../../util/qqmap-wx-jssdk.min.js";


const state = {
  openid: '',
  phoneBtn: true,
  mapList: [],
  phone: '',
  latitude: "",
  longitude: "",
  inputContent: {
    address: "",
    company: "",
    phone: "",
    description: "",
    formId: "",
    start_time: ""
  },
}
const mutations = {
  //更新openid
  updateOpenid(state, payload) {
    state.openid = payload.openid;
    state.phone = payload.phone;
    console.log(state.phone)
  },
  //设置权限的显示和隐藏
  setPhoneBtn(state, payload) {
    state.phoneBtn = payload;
  },
  //模糊搜索列表的渲染
  setMapList(state, payload) {
    state.mapList = payload;
  },
  setAddress(state, payload) {
    let arr = state.mapList.filter(item => item.id === payload)
    state.inputContent.address = arr[0].address
  },
  clearMapList(state, payload) {
    state.mapList = [];
  },
  getLocaltion(state, payload) {
    console.log(payload)
    state.latitude = payload.latitude;
    state.longitude = payload.longitude;
  },
  changeStartTime(state, payload) {
    state.inputContent.start_time = payload
  }
}

const actions = {
  async login({ commit }, params) {
    const result = await code2Session(params)
    console.log(result, "result-----")
    if (result.data.openid) {
      commit('updateOpenid', result.data);
    }
  },
  async decryptPhone({ commit }, params) {
    const data = await decryptPhone(params)
    console.log(data)
  },
  async getMapListData({ commit }, params) {
    let qqmapsdk = new QQMapWX({
      key: "ZVUBZ-J46CU-7IPVI-2N6M4-2EIRV-V7FCM"
    });
    qqmapsdk.getSuggestion({
      //获取输入框值并设置keyword参数
      keyword: params, //用户输入的关键词，可设置固定值,如keyword:'KFC'
      //region:'北京', //设置城市名，限制关键词所示的地域范围，非必填参数
      success: (res) => {
        console.log(res, '地址模糊搜索----');
        //搜索成功后的回调
        commit('setMapList', res.data)
      }
    });
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}