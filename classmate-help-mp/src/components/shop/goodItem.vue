<template>
  <view class="item-box" @click="openDetail()">
    <image :src="img" />
    <view class="intro">
      <view class="title">{{ title }}</view>
      <view class="price">￥{{ price }}</view>
      <view class="info">{{ intro }}</view>
    </view>
  </view>
</template>
<script setup lang="ts">
const props = defineProps({
  id: Number,
  img: String,
  title: String,
  price: String,
  intro: String,
});
let openDetail = () => {
  uni.navigateTo({ url: `/pages/shopDetail/index?type=1&id=${props.id}` });
};
</script>

<style lang="scss" scoped>
.item-box {
  padding-top: 30rpx;
  padding-left: 30rpx;
  padding-bottom: 30rpx;
  max-height: 260rpx;
  display: grid;
  grid-template-columns: 200rpx 1fr;
  grid-template-rows: 1fr;
  image {
    height: 200rpx;
    width: 200rpx;
    object-fit: cover;
  }
  .intro {
    display: grid;
    grid-template-rows: 80rpx 1fr 1fr;
    height: 100rpx;
    padding-left: 30rpx;
    .title {
      font-size: 44rpx;
      font-weight: bolder;
    }
    .price {
      font-size: 40rpx;
      font-weight: bold;
    }
    .info {
      font-size: 32rpx;
      color: gray;
    }
  }
}
</style>
