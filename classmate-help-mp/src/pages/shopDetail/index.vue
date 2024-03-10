<template>
  <view class="detail-page">
    <div class="card">
      <div class="intro">
        <div class="title">&nbsp;&nbsp;高等数学第一册</div>
        <div class="content">
          &nbsp;&nbsp;大一学校统一购买的，很新没有什么笔记.
        </div>
      </div>
      <div class="coast">￥30</div>
    </div>
    <image class="image" src="@/static/photo1.png"></image>

    <div class="msg">
      <div class="title">评论区</div>
      <div class="msg-box">
        <div class="user">sikuu</div>
        <div class="content">我想要,可以商量价格吗?</div>
        <div class="date">2023-05-11</div>
      </div>
      <div class="msg-box">
        <div class="user">sikuu</div>
        <div class="content">我想要,可以商量价格吗?</div>
        <div class="date">2023-05-11</div>
      </div>
      <div class="msg-box">
        <div class="user">sikuu</div>
        <div class="content">我想要,可以商量价格吗?</div>
        <div class="date">2023-05-11</div>
      </div>
    </div>
  </view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.detail-page {
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20rpx;
  .image {
    width: 100%;
    height: 600rpx;
    border-radius: 10rpx;
    background-color: white;
    box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
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
      width: 60%;
      .title {
        font-size: 48rpx;
        font-weight: bolder;
      }
      .content {
      }
    }
    .coast {
      width: 30%;
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
