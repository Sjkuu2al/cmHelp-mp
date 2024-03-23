<template>
  <view class="to-card" @click="toPage">
    <image class="background" :src="bgImage"></image>
    <view class="introduction">
      <view class="title">{{ introduction.title }}</view>
      <view class="content">{{ introduction.content }}</view>
      <view class="to" v-if="isTo">
        <image src="@/static/goto.png" />
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  bgImage: {
    type: String,
  },
  introduction: {
    type: Object,
    required: true,
  },
  isTo: {
    type: Boolean,
    default: true,
  },
  toUrl: {
    type: String,
  },
});

const toPage = () => {
  if (props.isTo && props.toUrl) uni.navigateTo({ url: props.toUrl });
};
</script>

<style lang="scss" scoped>
.to-card {
  height: 100%;
  width: 100%;
  background-color: rgba(241, 249, 250, 0.904);
  border-radius: 10rpx;
  box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
  display: grid;
  grid-template-columns: 280rpx 1fr;
  grid-template-rows: 1fr;
  .background {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .introduction {
    display: flex;
    flex-direction: column;
    .title {
      font-size: 44rpx;
      font-weight: bolder;
      padding-top: 20rpx;
      padding-bottom: 30rpx;
    }
    .content {
      font-size: 24rpx;
      widows: 60rpx;
      word-wrap: break-word;
      color: gray;
    }
    .to {
      flex-grow: 1;
      position: relative;
      image {
        position: absolute; /* 将 .b 绝对定位 */
        bottom: 0; /* 距离 .a 底部的距离 */
        right: 0; /* 距离 .a 右侧的距离 */
        height: 40rpx;
        width: 40rpx;
        padding: 40rpx;
      }
    }
  }
}
</style>
