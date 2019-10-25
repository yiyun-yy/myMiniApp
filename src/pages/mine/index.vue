<template>
  <div>
    <div class="form-input">
      <label for>北京</label>
      <input type="text" v-model="value" @blur="handBlur" placeholder="面试地址" />
    </div>
    <div class="map-list">
      <dl v-for="item in mapList" :key="item.id" @click="handClick(item.id)">
        <dt>
          <img src="http://pic.51yuansu.com/pic3/cover/00/75/56/58b85b83d66a1_610.jpg" alt />
        </dt>
        <dd>
          <p v-text="item.title"></p>
          <p v-text="item.address"></p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      value: ""
    };
  },
  computed: mapState({
    mapList: store => store.user.mapList
  }),
  mounted() {
    this.$store.commit('user/clearMapList')
  },
  methods: {
    ...mapActions({
      getMapListData: "user/getMapListData"
    }),
    handBlur() {
      this.getMapListData(this.value);
    },
    handClick(id){
      this.$store.commit('user/setAddress',id)
      wx.navigateTo({
        url:"/pages/AddInterview/index"
      })
    }
  }
};
</script>
<style lang="scss" scoped>
%juzhong {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-input {
  height: 44px;
  display: flex;
  align-items: center;
  font-size: 14px;
  border: 1px solid #ccc;
  padding: 0 10px;
  label {
    font-size: 14px;
    flex: 2;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #ccc;
  }
  input {
    flex: 8;
    margin-left: 10px;
  }
}
.map-list {
  dl {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ccc;
    display: flex;
    dt {
      flex: 2;
      @extend %juzhong;
      img {
        width: 30px;
        height: 30px;
      }
    }
    dd {
      flex: 8;
      p {
        width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>