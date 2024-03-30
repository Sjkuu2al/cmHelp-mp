<template>
  <view class="discuss-list">
    <div class="type-bar">
      <div :class="check === 1 ? 'check tab' : 'tab'" @click="changeCheck(1)">
        最新
      </div>
      <div :class="check === 2 ? 'check tab' : 'tab'" @click="changeCheck(2)">
        热议
      </div>
    </div>
    <view
      class="card"
      v-for="item in list"
      :key="item.id"
      @click="openDetail(item.id)"
    >
      <div class="pInfo">
        <div class="pImg"><image :src="item.pImg" /></div>
        <view class="pUser">{{ item.pUser }}</view>
      </div>

      <view class="pContent">{{ item.pContent }}</view>
      <view class="common">
        <image src="@/static/i-common.png"></image>
        <view class="common-count">{{ item.commonCount }}</view>
      </view>
      <!-- <view class="reply" v-for="(rep, idx) in item.replyArr" :key="idx">
        <view class="rUser">{{ rep.rUser }}</view>
        <view class="rContent">{{ rep.rContent }}</view>
      </view> -->
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
let check = ref<number>(1);
let changeCheck = (value: number) => {
  check.value = value;
};
watch(check, (newVal) => {
  console.log(newVal);
  if (newVal === 1) {
    // 最新帖
  } else if (newVal === 2) {
    // 最热贴
  }
});
let list = [
  {
    id: 1,
    pUser: "发表者",
    pContent: "有人知道计算机三班的课表吗?",
    pImg: "/static/11.jpg",
    commonCount: 23,
  },
  {
    id: 2,
    pUser: "sikuu",
    pContent: "明天什么时候开学?",
    pImg: "/static/11.jpg",
    commonCount: 19,
  },
];
let openDetail = (id: number) => {
  uni.navigateTo({ url: `/pages/discussDetail/index?id=${id}` });
};
</script>

<style lang="scss" scoped>
.discuss-list {
  padding: 40rpx;
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: 40rpx;
  .type-bar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-radius: 10rpx;
    border: 2rpx solid black;
    height: 120rpx;
    .tab {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20rpx;
    }
    .check {
      background-color: rgb(166, 166, 245);
      color: white;
    }
    .new {
      border-right: 2rpx solid gray;
    }
  }
  .card {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgba(241, 249, 250, 0.904);
    border-radius: 10rpx;
    box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
    padding: 10rpx 10rpx 30rpx 10rpx;
    .pInfo {
      display: flex;
      align-items: center;
      padding-top: 10rpx;
      .pImg {
        height: 100rpx;
        width: 100rpx;

        image {
          height: 100%;
          width: 100%;
          border-radius: 50rpx;
        }
      }
      .pUser {
        font-size: 48rpx;
        font-weight: bolder;
        text-indent: 0.4em;
      }
    }
    .pContent {
      margin-top: 10rpx;
      font-size: 36rpx;
      text-indent: 2em;
    }
    .common {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-top: 10rpx;
      padding-right: 40rpx;
      image {
        height: 50rpx;
        width: 50rpx;
      }
    }
  }
}
</style>
