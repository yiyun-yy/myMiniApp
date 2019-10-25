<template>
  <div class="mapDiv">
    <div class="dialog" v-if="phoneBtn">
      <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"></button>
    </div>
    <map name="map" show-location="true" :longitude="longitude" :latitude="latitude"></map>
    <img class="mineIcon" src="../../static/我的 (1).png" alt="" @click="handGoMine">
    <button type="default" @click="goAdd">添加面试</button>
  </div>
</template>

<script>

import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      longitude: 116.29845,
      latitude: 39.95933
    };
  },
  computed:mapState({
    phoneBtn:store=>store.user.phoneBtn
  }),
  methods: {
    ...mapActions({
      decryptPhone: "user/decryptPhone"
    }),
    goAdd() {
      wx.navigateTo({
        url: "/pages/AddInterview/index"
      });
    },
    getPhoneNumber(res) {
      console.log(res, "phone--res");
      if (res.detail.errMsg === "getPhoneNumber:ok") {
        let { iv, encryptedData } = res.detail;
        this.$store.commit('user/setPhoneBtn',false)
        this.decryptPhone({ iv, encryptedData });
      } else {
        wx.showToast({
          title: "为了更好的体验,请先绑定手机号",
          icon: "none"
        });
      }
    },
    handGoMine(){
       wx.navigateTo({
        url: "/pages/PersonalCenter/index"
      });
    }
  },
  async created() {
    wx.getLocation({
      success: res => {
        this.$store.commit('user/getLocaltion',res)
        this.longitude = res.longitude;
        this.latitude = res.latitude;
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.mineIcon{
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 15%;
  right: 5%;
}
.dialog {
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: 100%;
  position: fixed;
  button {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
  }
}
.mapDiv {
  height: 100%;
}
.mapDiv map {
  width: 100%;
  height: 90%;
}
.mapDiv > button {
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
  color: #fff;
}
</style>