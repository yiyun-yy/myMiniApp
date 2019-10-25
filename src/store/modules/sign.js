import { addSign, getInterViewList, getDetailList, upDateDetailList } from '../../service/index'
import Moment from 'moment'
const state = {
  interViewList: [],
  dialogTitle: '',
  detailData: []
}
const mutations = {
  //展现面试列表信息
  setInterViewList(state, payload) {
    console.log(payload, '---payload')
    payload.data.map(item => {
      return item.start_time = Moment(Number(item.start_time)).format('YYYY-MM-DD HH:mm:ss')
    })
    payload.data.map(item => {
      let regex = /^{/
      if (regex.test(item.address)) {
        item.address = JSON.parse(item.address).address
      } else {
        item.address = item.address
      }
      return item
    })
    if (payload.direction == 'bottom') {
      state.interViewList = payload.data;
    } else {
      payload.data.map(item => {
        state.interViewList.push(item)
      })
    }
  },
  //展现目前无面试信息
  setDialogTitle(state, payload) {

    state.dialogTitle = payload
  },
  //跳转详情页的数据
  setDetailData(state, payload) {
    payload.map(item => {
      item.start_time = Moment(Number(item.start_time)).format('YYYY-MM-DD HH:mm:ss')
      if (/^{/.test(item.address)) {
        item.address = JSON.parse(item.address).address
      } else {
        item.address = item.address
      }
      if (item.remind === -1) {
        item.remind = '未提醒'
      } else {
        item.remind = '已提醒'
      }
      if (item.status === -1) {
        item.status = "未开始"
      } else if (item.status === 0) {
        item.status = "已打卡"
      } else {
        item.status = "已放弃"
      }
      return item
    })
    state.detailData = payload[0];
  },
  setInterViewLists(state, payload) {
    state.interViewList = [];
  }
}

const actions = {
  async _addSign({ commit }, params) {
    let result = await addSign(params)
    console.log(result)
    if (result.code === 0) {
      wx.showModal({
        title: "温馨提示",
        content: result.msg,
        showCancel: true,
        cancelText: "取消",
        cancelColor: "#000000",
        confirmText: "确定",
        confirmColor: "#3CC51F",
        success: result => {
          if (result.confirm) {
            wx.navigateTo({
              url: '/pages/interviewList/index'
            })
          }
        },
        fail: () => { },
        complete: () => { }
      });

    } else {
      wx.showToast({
        title: '请求失败',
        icon: 'none',
      });
    }
  },
  async _getInterViewList({ commit }, params) {
    console.log(params, "lalalparams")
    let result = null;
    if (params.direction === 'bottom') {
      result = await getInterViewList(params.params);
    } else if ((params.direction === 'top')) {
      result = await getInterViewList(params.params);
      if (result.code === 0) {
        if (result.data.length === 0) {
          commit('setDialogTitle', '当前没有面试列表!')
        } else if (result.data.length < params.params.pageSize) {
          commit('setInterViewList', {
            data: result.data,
            direction: 'top'
          })
          wx.showToast({
            title:'数据已加载完毕',
            icon:'none'
          })
        } else {
          if (params.direction === 'top') {
            commit('setInterViewList', {
              data: result.data,
              direction: 'top'
            })
          } else {
            commit('setInterViewList', {
              data: result.data,
              direction: 'bottom'
            })
          }

        }
      }
    } else {
      result = await getInterViewList(params);
    }
    if (result.code === 0) {
      if (result.data.length === 0) {
        console.log(0)
        commit('setDialogTitle', '当前没有面试列表!')
      } else if (result.data.length < params.pageSize) {
        console.log(1)
        commit('setInterViewList', result.data)
      } else {
        console.log(2)
        if (params.direction === 'top') {
          commit('setInterViewList', {
            data: result.data,
            direction: 'top'
          })
        } else {
          commit('setInterViewList', {
            data: result.data,
            direction: 'bottom'
          })
        }

      }
    }
  },
  async _getDetailList({ commit }, payload) {
    let result = await getDetailList(payload);
    console.log(result)
    if (result.code === 0) {
      commit('setDetailData', result.data)
    }
  },
  async _upDateDetailList({ commit }, payload) {
    console.log(payload)
    let result = await upDateDetailList(payload)
    console.log(result, 'updata')
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}