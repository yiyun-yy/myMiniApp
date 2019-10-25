<template>
  <div>
    <div class="PersonalCenterHeader">
      <img src="../../static/我的 (1).png" alt />
      <p>{{phone}}</p>
    </div>
    <div class="PersonalCenterSelect">
      <div
        class="select-content"
        v-for="item in selectData"
        :key="item.id"
        @click="handGoPage(item.id)"
      >
        <div class="select-left">
          <img :src="item.src" alt />
        </div>
        <div class="select-center">{{item.title}}</div>
        <div class="select-right">></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      selectData: [
        {
          src: "../../static/秒表.png",
          title: "我的面试",
          id: 1
        },
        {
          src: "../../static/警告.png",
          title: "客服中心",
          id: 2
        }
      ]
    };
  },
  computed: mapState({
    phone: store => store.user.phone
  }),
  methods: {
    handGoPage(id) {
      if (id === 1) {
        wx.navigateTo({
          url: "/pages/interviewList/index"
        });
      }else{
        wx.navigateTo({
          url: "/pages/CustomerService/index"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
%juzhong {
  display: flex;
  align-items: center;
  justify-content: center;
}
.PersonalCenterHeader {
  background-color: #f9f9f9;
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 40px;
    height: 40px;
    margin-bottom: 20px;
  }
}
.select-content {
  display: flex;
  .select-left {
    flex: 1;
    height: 50px;
    line-height: 50px;
    @extend %juzhong;
    padding-left: 10px;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .select-center {
    flex: 6;
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .select-right {
    flex: 3;
    display: flex;
    align-items: center;
    padding-right: 15px;
    justify-content: flex-end;
  }
}
</style>