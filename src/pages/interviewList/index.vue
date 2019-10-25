<template>
  <div class="wrapper">
    <div class="navList">
      <li
        v-for="list in listData"
        :key="list.id"
        :class="currentIndex===list.id?'active':''"
        @click="handCurrentIndex(list.id)"
      >{{list.title}}</li>
    </div>
    <div class="interviewListTitle" v-if="interViewList.length===0">
      <div class="dialog">
        <span>{{dialogTitle}}</span>
      </div>
    </div>
    <div v-else class="interviewList">
      <div
        class="list-item"
        v-for="list in interViewList"
        :key="list.id"
        @click="handDetailPage(list.id)"
      >
        <div class="list-left">
          <p v-text="list.company"></p>
          <p v-text="list.address"></p>
          <p>面试时间:{{list.start_time}}</p>
        </div>
        <div class="list-right">
          <p>未开始</p>
          <p>未提醒</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  onPullDownRefresh() {
    this.page++;
    console.log("触发下拉刷新");
    setTimeout(() => {
      wx.stopPullDownRefresh();
      if (this.currentIndex === "") {
        this._getInterViewList({
          params: {
            page: this.page,
            pageSize: this.pageSize
          },
          direction: "bottom"
        });
      } else {
        this._getInterViewList({
          params: {
            company: "",
            status: this.currentIndex,
            remind: "",
            page: this.page,
            pageSize: this.pageSize
          },
          direction: "bottom"
        });
      }
    }, 1000);
  },
  onReachBottom() {
    this.page++;
    wx.showToast({
      title: "正在加载",
      icon: "none"
    });
    setTimeout(() => {
      if (this.currentIndex === "") {
        this._getInterViewList({
          params: {
            page: this.page,
            pageSize: this.pageSize
          },
          direction: "top"
        });
      } else {
        this._getInterViewList({
          params: {
            company: "",
            status: this.currentIndex,
            remind: "",
            page: this.page,
            pageSize: this.pageSize
          },
          direction: "top"
        });
      }
    }, 2000);
  },
  data() {
    return {
      currentIndex: -1,
      listData: [
        {
          title: "未开始",
          id: -1
        },
        {
          title: "已打卡",
          id: 0
        },
        {
          title: "已放弃",
          id: 1
        },
        {
          title: "全部",
          id: ""
        }
      ],
      page: 1,
      pageSize: 10
    };
  },
  computed: mapState({
    interViewList: store => store.sign.interViewList,
    dialogTitle: store => store.sign.dialogTitle
  }),
  mounted() {
    this._getInterViewList({
      company: "",
      status: this.currentIndex,
      remind: "",
      page: this.page,
      pageSize: this.pageSize
    });
  },
  methods: {
    ...mapActions({
      _getInterViewList: "sign/_getInterViewList",
      _getDetailList: "sign/_getDetailList"
    }),
    handCurrentIndex(id) {
      this.currentIndex = id;
      this.page = 1;
      if (id === "") {
        this._getInterViewList({
          page: this.page,
          pageSize: this.pageSize
        });
      } else {
        this._getInterViewList({
          status: this.currentIndex
        });
      }
      this.$store.commit('sign/setInterViewLists')
    },
    handDetailPage(id) {
      this._getDetailList(id);
      wx.navigateTo({
        url: `/pages/InterViewDetail/index?id=${id}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}
.dialog {
  position: absolute;
  width: 100%;
  margin-top: 50px;
  color: #a7a7a7;
  text-align: center;
}
.navList {
  width: 100%;
  display: flex;
  position: fixed;
  z-index: 99;
  top: 0;
  height: 44px;
  background-color: #ffffff;
  justify-content: space-around;
  border-top: 1px solid #ccc;
  li {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .active {
    border-bottom: 1px solid #3b7bba;
    color: #3b7bba;
  }
}
.interviewListTitle {
  position: relative;
  width: 100%;
  height: 100%;
  top: 10px;
  margin-top: 10px;
  background-color: #ffffff;
}
.interviewList {
  position: relative;
  width: 100%;
  height: 100%;
  top: 44px;
  margin-top: 10px;
  background-color: #ffffff;
}
.list-item {
  display: flex;
  .list-left {
    flex: 8;
    padding: 15px;
    font-size: 16px;
    p:nth-child(1) {
      font-weight: 800;
      font-size: 18px;
    }
    p:nth-child(2) {
      color: #999999;
    }
    p:nth-child(3) {
      color: #666666;
    }
  }
  .list-right {
    flex: 2;
    padding: 15px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    p {
      padding: 3;
      text-align: center;
      height: 30px;
      line-height: 30px;
      margin-bottom: 20px;
    }
    p:nth-child(1) {
      color: #95969a;
      background-color: #f6f6f6;
    }
    p:nth-child(2) {
      color: #e67672;
      background-color: #fdf1f1;
    }
  }
}
</style>