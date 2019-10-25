<template>
  <div>
    面试列表
    <p>1</p>
    <p>2</p>
    <p>1</p>
  </div>
</template>

<script>
export default {
  onPullDownRefresh() {
    console.log("触发下拉刷新");
    setTimeout(() => {
      wx.stopPullDownRefresh();
      console.log("结束上拉");
    }, 1000);
  },
  onReachBottom() {
    console.log("触发上拉加载...");
  }
};
</script>

<style lang="scss" scoped>
p {
  height: 1000rpx;
}
</style>