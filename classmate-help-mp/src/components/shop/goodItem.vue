<template>
  <view class="item-box" @click="openDetail()">
    <image src="@/static/i-book.png" />
    <view class="intro">
      <view class="title">数学书</view>
      <view class="info">这是一本数学书</view>
    </view>
  </view>
</template>
<script setup lang="ts">
let openDetail = () => {
  uni.navigateTo({ url: "/pages/shopDetail/index?type=1&id" });
};
</script>

<style lang="scss" scoped>
.item-box {
  padding-top: 30rpx;
  padding-left: 30rpx;
  padding-bottom: 30rpx;
  height: 260rpx;
  display: grid;
  grid-template-columns: 200rpx 1fr;
  grid-template-rows: 1fr;
  image {
    height: 200rpx;
    width: 200rpx;
  }
  .intro {
    height: 100%;
    display: grid;
    grid-template-rows: 60px 1fr;

    .title {
      font-size: 44rpx;
    }
    .info {
      font-size: 32rpx;
      color: gray;
    }
  }
}
</style>
