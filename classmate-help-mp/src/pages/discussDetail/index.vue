<template>
  <view class="discuss-page">
    <view class="card">
      <view class="intro">
        <view class="title">高等数学第一册</view>
        <view class="content"> 大一学校统一购买的，很新没有什么笔记. </view>
        <div class="btn-box">
          <div class="common-btn" @click="openCommonDialog()">评论</div>
        </div>
      </view>
    </view>

    <view class="msg">
      <view class="title">评论区</view>
      <view class="msg-box" @click="openCommonDialog(12)">
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

    <view>
      <!-- 输入框示例 -->
      <uni-popup ref="inputDialog" type="dialog">
        <uni-popup-dialog
          ref="inputClose"
          mode="input"
          :title="dialogTitle"
          :value="common"
          placeholder="请输入内容"
          @confirm="dialogInputConfirm"
        ></uni-popup-dialog>
      </uni-popup>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
let dialogTitle = ref("评论");
let inputDialog = ref();
let common = ref("");
let openCommonDialog = (id?: number) => {
  if (id) {
    dialogTitle.value = "回复评论";
  } else {
    dialogTitle.value = "评论";
  }
  inputDialog.value.open();
};
let dialogInputConfirm = (value: string) => {
  console.log("提交:", value);

  common.value = "";
};
</script>

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
      width: 100%;
      .title {
        font-size: 48rpx;
        font-weight: bolder;
      }
      .content {
        flex: 1;
      }
      .btn-box {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .common-btn {
          border: 1px solid gray;
          border-radius: 10rpx;
          padding: 10rpx 20rpx;
          &:active {
            background-color: rgb(230, 230, 230);
          }
        }
      }
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
      &:active{
        background-color: rgb(242, 242, 242);
      }
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
