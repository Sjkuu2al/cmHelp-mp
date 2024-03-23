<template>
  <view class="mine">
    <view class="card">
      <view class="info">
        <view class="left">
          <view class="normal">Sikuu2al</view>
          <view class="small">uid:1754951327</view>
        </view>
        <view class="right">
          <image src="@/static/11.jpg"></image>
        </view>
      </view>
      <view class="count"></view>
    </view>
    <view class="to-list">
      <view class="to-btn" @click="toPage('/pages/shopManager/index')">
        商品管理
      </view>
      <view class="to-btn" @click="toPage('/pages/discussManager/index')">
        帖子管理
      </view>
    </view>
    <view class="list">
      <view class="option" @click="toPage('/pages/about/index')">
        <image src="@/static/i-about.png"></image>
        <view class="tip">关于我们</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const toPage = (url: String) => {
  uni.navigateTo({ url });
};
</script>

<style lang="scss" scoped>
.mine {
  height: 90%;
  padding: 50rpx;
  display: grid;
  grid-template-rows: 350rpx 100rpx 1fr;
  grid-template-columns: 1fr;
  gap: 50rpx;
  .card {
    height: 100%;
    width: 100%;
    background-color: rgb(255, 255, 255);
    box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
    border-radius: 10rpx;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    .info {
      height: 100%;
      padding-top: 60rpx;
      display: flex;
      .left {
        height: 100%;
        width: 60%;
        display: flex;
        flex-direction: column;
        padding-left: 60rpx;
        .normal {
          font-size: 66rpx;
          font-weight: bolder;
          padding-bottom: 10rpx;
          &:first-letter {
            font-size: 150%; /* 第一个字体放大150% */
          }
        }
        .small {
          font-size: 26rpx;
          color: gray;
        }
      }
      .right {
        width: 38%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        image {
          height: 100rpx;
          width: 100rpx;
        }
      }
    }
  }
  .to-list {
    height: 100%;
    display: flex;
    justify-content: space-between;
    .to-btn {
      height: 100%;
      width: 45%;
      background-color: white;
      border-radius: 10rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: gray;
      box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
    }
  }
  .list {
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 10rpx;
    padding: 20rpx;
    box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
    .option {
      display: flex;
      height: 80rpx;
      width: 100%;

      align-items: center;
      padding-bottom: 10rpx;
      border-bottom: 1px solid rgb(218, 218, 218);
      image {
        height: 60rpx;
        width: 60rpx;
      }
      .tip {
        height: 100%;
        padding-left: 15rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: gray;
      }
    }
  }
}
</style>
