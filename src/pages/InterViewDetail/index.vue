<template>
  <div>
    <form action>
      <div class="input-item">
        <label for>面试地址:</label>
        <input type="text" :value="detailData.address" />
      </div>
      <div class="input-item">
        <label for>面试时间:</label>
        <input type="text" :value="detailData.start_time" />
      </div>
      <div class="input-item">
        <label for>联系方式:</label>
        <input type="text" :value="detailData.phone" />
      </div>
      <div class="input-item">
        <label for>是否提醒:</label>
        <input type="text" :value="detailData.remind" />
      </div>
      <div class="input-item">
        <label for>面试状态:</label>
        <input type="text" :value="detailData.status" />
      </div>
      <div class="input-item" v-if="isShow">
        <label for>取消提醒:</label>
        <switch @change="handChange"></switch>
      </div>
      <div class="btns" v-if="isShow">
        <button size="mini">去打卡</button>
        <button size="mini" @click="handGiveUp">放弃面试</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      currentId: "",
      isShow:true,
    };
  },
  mounted() {
    this.currentId = this.$mp.query.id;
  },
  methods: {
    handGiveUp() {
      let status = '';
      let remind = '';
      if(this.detailData.status==='未开始'){
        status=-1
      }else if(this.detailData.status==='已打卡'){
        status=0
      }else{
        status=1
      }
      if(this.detailData.remind==='未提醒'){
        remind = -1
      }else if(this.detailData.remind==='已提醒'){
        remind = 0
      }else{
        remind = 1
      }
      wx.showModal({
        title: "温馨提示",
        content: "确定要放弃本次面试吗？",
        showCancel: true,
        cancelText: "取消",
        cancelColor: "#000000",
        confirmText: "确定",
        confirmColor: "#3CC51F",
        success: result => {
          if (result.confirm) {
            this.$store.dispatch("sign/_upDateDetailList", {
              id: this.currentId,
              params: {
                status:status,
                remind:remind,
              }
            });
            this.isShow=false;
          }
        },
        fail: () => {},
        complete: () => {}
      });
    },
    handChange(e) {
      console.log(e);
    }
  },
  computed: mapState({
    detailData: store => store.sign.detailData
  }),
  created() {
    wx.setNavigationBarTitle({
      title: this.detailData.company
    });
  }
};
</script>
<style lang="scss" scoped>
%juzhong {
  display: flex;
  align-items: center;
  justify-content: center;
}
.input-item {
  display: flex;
  height: 44px;
  border-bottom: 1px solid #ccc;
  padding: 5px;
  align-items: center;
  label {
    flex: 2;
    @extend %juzhong;
  }
  input {
    flex: 8;
    padding-left: 10px;
  }
  switch {
    flex: 8;
    padding-left: 10px;
  }
}
.btns {
  width: 100%;
  text-align: center;
  margin-top: 20px;
  button {
    color: #fff;
    width: 40%;
    height: 44px;
    text-align: center;
    line-height: 44px;
    font-weight: 800;
    margin-right: 5%;
  }
  button:nth-child(1) {
    background: #3b7bba;
  }
  button:nth-child(2) {
    background: #cc5849;
  }
}
</style>