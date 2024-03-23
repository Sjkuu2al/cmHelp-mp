<template>
  <view class="discuss-list">
    <view
      class="card"
      v-for="item in list"
      :key="item.id"
      @click="openDetail(item.id)"
    >
      <view class="pUser">{{ item.pUser }}</view>
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
let list = [
  {
    id: 1,
    pUser: "发表者",
    pContent: "有人知道计算机三班的课表吗?",
    commonCount: 23,
    // replyArr: [
    //   {
    //     rUser: "回复者1",
    //     rContent: "我没有欸！",
    //   },
    //   {
    //     rUser: "回复者2",
    //     rContent: "我有哦联系我吧！",
    //   },

    //   {
    //     rUser: "回复者3",
    //     rContent: "你可以找老师问问！",
    //   },
    // ],
  },
  {
    id: 2,
    pUser: "sikuu",
    pContent: "明天什么时候开学?",
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
  .card {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgba(241, 249, 250, 0.904);
    border-radius: 10rpx;
    box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
    padding: 10rpx 10rpx 30rpx 10rpx;
    .pUser {
      font-size: 48rpx;
      font-weight: bolder;
      text-indent: 0.4em;
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
