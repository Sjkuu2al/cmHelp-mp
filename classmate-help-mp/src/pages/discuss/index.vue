<template>
  <view class="discuss-list">
    <view class="type-bar">
      <view :class="check === 1 ? 'check tab' : 'tab'" @click="changeCheck(1)">
        最新
      </view>
      <view :class="check === 2 ? 'check tab' : 'tab'" @click="changeCheck(2)">
        热议
      </view>
    </view>
    <view
      class="card"
      v-for="item in discussList"
      :key="item.id"
      @click="openDetail(item.id)"
    >
      <view class="pInfo">
        <view class="pImg"><image src="@/static/11.jpg" /></view>
        <view class="pUser">{{ item.ownerName }}</view>
      </view>

      <view class="pContent">{{ item.title }}</view>
      <view class="comment">
        <image src="@/static/i-comment.png"></image>
        <view class="comment-count">33</view>
      </view>
      </view> -->
    </view>
    <view class="createbtn" @click="toCreate()">+</view>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { getDiscussList } from "@/api/discuss.js";
import { onShow, onReachBottom } from "@dcloudio/uni-app";
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
let toCreate = () => {
  uni.navigateTo({ url: "/pages/discussDetail/index?type=2" });
};
let openDetail = (id: number) => {
  uni.navigateTo({ url: `/pages/discussDetail/index?type=1&id=${id}` });
};
interface discuss {
  date?: null | string;
  id?: number | null;
  intro?: null | string;
  isDelete?: number | null;
  ownerId?: number | null;
  ownerName?: null | string;
  status?: number | null;
  title?: null | string;
  view?: number | null;
  [property: string]: any;
}
let discussList = ref<discuss[]>([]);
let page = {
  pageNum: 0,
  pageSize: 5,
};
let haveMore = true;
let status = ref<string>("more");
onMounted(async () => {
  await getDiscussList(page.pageNum, page.pageSize).then((res: any) => {
    res.forEach((item: any) => {
      discussList.value.push(item);
    });
   
  });
});
onReachBottom(async () => {
  if (haveMore) {
    status.value = "loading";
    page.pageNum++;
    await getDiscussList(page.pageNum, page.pageSize).then((res: any) => {
      res.forEach((item: any) => {
        item.imgs = JSON.parse(item.imgs);
        discussList.value.push(item);
      });
    });
    status.value = "nomore";
    haveMore = false;
  } else {
  }
});
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
  .createbtn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: white;
    position: fixed;
    top: 85%;
    left: 75%;
    height: 100rpx;
    width: 100rpx;
    border-radius: 100rpx;
    box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
    background-color: rgb(145, 230, 170);
  }
}
</style>
