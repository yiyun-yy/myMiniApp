<template>
  <div>
    <form report-submit="true" @submit="subMit">
      <p class="title">面试信息</p>
      <div class="form-con">
        <div class="input-item">
          <label>公司名称</label>
          <input type="text" placeholder="请输入公司名称" v-model="inputContent.company" />
        </div>
        <div class="input-item">
          <label>公司电话</label>
          <input type="text" placeholder="请输入面试联系人电话" v-model="inputContent.phone" />
        </div>
        <div class="input-item">
          <label>面试时间</label>
          <picker
            mode="multiSelector"
            :range="dateRange"
            :value="info.date"
            @change="dateChange"
            @columnchange="columnChange"
          >
            <view class="date">{{dateShow}}</view>
          </picker>
          <icon @click="showTimeTip" class="tip" type="warn" color="#197DBF" size="24"></icon>
        </div>
        <div class="input-item">
          <label>面试地址</label>
          <input type="text" placeholder="请选择面试地址" @focus="handBlur" v-model="inputContent.address" />
        </div>
      </div>
      <p class="title">备注信息</p>
      <div class="form-con">
        <div class="textArea">
          <textarea
            class="text"
            v-model="inputContent.description"
            bindblur="bindTextAreaBlur"
            placeholder="备注信息(可选,100个字以内)"
          />
        </div>
      </div>
      <button formType="submit" class="submit">确认</button>
    </form>
  </div>
</template>
<script>
import { addSign } from "../../service/index";
const moment = require("moment");
import { mapState } from "vuex";

const range = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23
  ],
  ["00分", "10分", "20分", "30分", "40分", "50分"]
];
export default {
  data() {
    return {
      info: {
        date: [0, 0, 0]
      }
    };
  },
  created() {
    // 如果当前时间是十一点之后，过滤掉今天
    if (moment().hour() == 23) {
      this.info.date = [1, 0, 0];
    }
  },
  computed: {
    ...mapState({
      address: store => store.user.address,
      latitude: store => store.user.latitude,
      longitude: store => store.user.longitude,
      inputContent: store => store.user.inputContent
    }),
    // 处理面试日期
    dateRange() {
      let dateRange = [...range];
      // 如果时间是今天，过滤掉现在之前的小时
      if (!this.info.date[0]) {
        dateRange[1] = dateRange[1].filter(item => {
          return item > moment().hour();
        });
      } else {
        dateRange[1] = range[1];
      }
      // 格式化小时
      dateRange[1] = dateRange[1].map(item => {
        return item + "点";
      });
      // 计算当前日期之后的十天
      dateRange[0] = dateRange[0].map(item => {
        return (
          moment()
            .add(item, "days")
            .date() + "号"
        );
      });
      return dateRange;
    },
    // 显示的日期
    dateShow() {
      return moment()
        .add(
          moment().hour() == 23 ? this.info.date[0] - 1 : this.info.date[0],
          "d"
        )
        .add(this.info.date[1] + 1, "h")
        .minute(this.info.date[2] * 10)
        .format("YYYY-MM-DD HH:mm");
    }
  },
  methods: {
    subMit(e) {
      this.$store.dispatch("sign/_addSign", {
        company: this.inputContent.company,
        phone: this.inputContent.phone,
        description: this.inputContent.description,
        form_id: e.detail.formId,
        latitude: this.latitude,
        longitude: this.longitude,
        address: JSON.stringify({ address: this.inputContent.address }),
        // start_time: ~~(+new Date() / 60000) * 60000 + 65 * 60 * 1000
        start_time: this.inputContent.start_time
      });
    },
    bindTimeChange(e) {
      this.time = e.detail.value;
    },
    bindDateChange(e) {
      this.date = e.detail.value;
    },
    //当选择面试地址时进行页面的跳转
    handBlur() {
      wx.navigateTo({
        url: "/pages/mine/index"
      });
    },
    // 监听多列选择器每列变化
    columnChange(e) {
      let { column, value } = e.target;
      let date = [...this.info.date];
      date[column] = value;
      this.info.date = date;
    },
    dateChange(e) {
      let timer = moment(this.dateShow).unix() * 1000;
      this.$store.commit("user/changeStartTime", timer);
    }
  }
};
</script>

<style lang="scss" scoped>
.submit {
  color: #fff;
  background-color: #999999;
}
.title {
  font-size: 16px;
  height: 40px;
  padding-left: 10px;
  line-height: 40px;
  background-color: #f4f5f6;
}

.textArea {
  height: 100px;
  padding: 15px;
  .text {
    height: 100%;
    width: 100%;
    border: 1px solid #ccc;
    font-size: 14px;
  }
}
.input-item {
  padding-left: 10px;
  display: flex;
  height: 40px;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.input-item {
  font-size: 14px;
  label {
    color: #333;
  }
  input {
    margin-left: 20px;
    width: 70%;
    height: 100%;
  }
  icon {
    margin-left: 30px;
  }
  picker {
    width: 60%;
    margin-left: 20px;
    view {
      width: 100%;
      height: 40px;
      font-size: 14px;
      line-height: 40px;
    }
  }
}
</style>