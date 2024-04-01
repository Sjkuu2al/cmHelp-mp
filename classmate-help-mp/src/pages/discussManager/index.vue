<template>
  <view class="index">
    <uni-section title="展示中" type="line">
      <view class="discuss-list">
        <view
          class="card"
          v-for="item in list"
          :key="item.id"
          @click="openDetail(item.id)"
        >
          <view class="pContent">{{ item.pContent }}</view>
          <view class="comment">
            <image src="@/static/i-comment.png"></image>
            <view class="comment-count">{{ item.CommentCount }}</view>
          </view>
        </view>
      </view>
    </uni-section>
    <view class="placeholder"></view>
    <uni-section title="不展示" type="line">
      <view class="discuss-list">
        <view
          class="card"
          v-for="item in list"
          :key="item.id"
          @click="openDetail(item.id)"
        >
          <view class="pContent">{{ item.pContent }}</view>
          <view class="comment">
            <image src="@/static/i-comment.png"></image>
            <view class="comment-count">{{ item.CommentCount }}</view>
          </view>
        </view>
      </view>
    </uni-section>
  </view>
</template>

<script setup lang="ts">
let list = [
  {
    id: 1,
    pUser: "发表者",
    pContent: "有人知道计算机三班的课表吗?",
    CommentCount: 23,
  },
  {
    id: 2,
    pUser: "sikuu",
    pContent: "明天什么时候开学?",
    CommentCount: 19,
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
    .comment {
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
.placeholder {
  height: 100rpx;
  width: 100%;
}
</style>
