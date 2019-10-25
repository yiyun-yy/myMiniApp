<script>
import { mapActions ,mapState} from "vuex";
export default {
  computed: mapState({
    phone:store=>store.user.inputContent.phone
  }),
  methods: {
    ...mapActions({
      login: "user/login"
    })
  },
  onLaunch: function() {
    if(this.phone){
       this.$store.commit('user/setPhoneBtn',false)
    }
    wx.login({
      complete: res => {
        console.log("res...", res);
        if (res.code) {
          this.login({ code: res.code });
          if(!res.code.phone){
            this.$store.commit('user/setPhoneBtn',true)
          }else{
            this.$store.commit('user/setPhoneBtn',false)
          }
        } else {
          wx.showToast({
            title: res.errMsg, //提示的内容,
            icon: "none" //图标,
          });
        }
      }
    });
  },
  globalData: {
    test: ""
  }
};
</script>

<style>
/* #ifndef APP-PLUS-NVUE */
/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
@import "./common/uni.css";

/* 以下样式用于 hello uni-app 演示所需 */
page {
  background-color: #ffffff;
  height: 100%;
  font-size: 30upx;
  line-height: 1.8;
}

.uni-header-logo {
  padding: 30upx;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10upx;
}

.uni-header-image {
  width: 100px;
  height: 100px;
}

.uni-hello-text {
  color: #7a7e83;
}

.uni-hello-addfile {
  text-align: center;
  line-height: 300upx;
  background: #fff;
  padding: 50upx;
  margin-top: 10px;
  font-size: 38upx;
  color: #808080;
}

/* #endif*/
</style>
