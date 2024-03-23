<template>
  <view class="discuss-page">
    <view class="card">
      <view class="intro">
        <view class="title">高等数学第一册</view>
        <view class="content"> 大一学校统一购买的，很新没有什么笔记. </view>
      </view>
    </view>

    <view class="msg">
      <view class="title">评论区</view>
      <view class="msg-box">
        <view class="user">sikuu</view>
        <view class="content">我想要,可以商量价格吗?</view>
        <view class="date">2023-05-11</view>
      </view>
      <view class="msg-box">
        <view class="user">vivvd</view>
        <view class="content">我的微信号是:148434123</view>
        <view class="date">2023-03-12</view>
      </view>
      <view class="msg-box">
        <view class="user">aasss</view>
        <view class="content">不错哦</view>
        <view class="date">2023-01-11</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.discuss-page {
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20rpx;
  .image-box {
    width: 100%;
    height: 600rpx;
    border-radius: 10rpx;
    background-color: white;
    box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
    .image {
      width: 100%;
      height: 600rpx;
      border-radius: 10rpx;
    }
  }
  .card {
    width: 100%;
    height: 300rpx;
    border-radius: 10rpx;
    box-sizing: border-box;
    padding: 30rpx;
    background-color: white;
    box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
    display: flex;

    .intro {
      display: flex;
      flex-direction: column;
      gap: 40rpx;
      width: 70%;
      .title {
        font-size: 48rpx;
        font-weight: bolder;
      }
      .content {
      }
    }
    .coast {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 60rpx;
      font-weight: bolder;
    }
  }
  .msg {
    width: 100%;

    background-color: white;
    box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
    padding: 20rpx;
    box-sizing: border-box;
    .title {
      font-size: 48rpx;
      font-weight: bolder;
    }
    .msg-box {
      display: flex;
      flex-direction: column;
      gap: 4rpx;
      border-bottom: 1px black solid;
      padding: 10rpx;
      box-sizing: border-box;
      .user {
        font-size: 36rpx;
        font-weight: bold;
      }
      .date {
        align-self: flex-end;
      }
    }
  }
}
</style>
