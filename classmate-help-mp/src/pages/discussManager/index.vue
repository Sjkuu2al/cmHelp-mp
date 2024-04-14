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
          <view class="pContent">{{ item.title }}</view>
          <view class="comment">
            <button @click.stop="changeStatus(item.id, 0)" type="warn">
              {{ "删除" }}
            </button>
          </view>
        </view>
      </view>
    </uni-section>
    <view class="placeholder"></view>
    <uni-section title="不展示" type="line">
      <view class="discuss-list">
        <view
          class="card"
          v-for="item in list1"
          :key="item.id"
          @click="openDetail(item.id)"
        >
          <view class="pContent">{{ item.title }}</view>
          <view class="comment">
            <button @click.stop="changeStatus(item.id, 1)" type="primary">
              {{ "恢复" }}
            </button>
          </view>
        </view>
      </view>
    </uni-section>
  </view>
</template>

<script setup lang="ts">
import { getDiscussListByUserId, changeDiscussStatus } from "@/api/discuss.js";
import { onMounted, ref } from "vue";

let getList = () => {
  list.value.length = 0;
  list1.value.length = 0;
  getDiscussListByUserId(1).then((res) => {
    res.forEach((item) => {
      if (item.status === 1) {
        list.value.push(item);
      } else {
        list1.value.push(item);
      }
    });
  });
};
let changeStatus = (id, status) => {
  uni.showModal({
    title: `是否确认更改当前帖子状态?`,
    cancelText: "取消",
    confirmText: "确认",
    success: async (ans) => {
      if (ans.confirm) {
        changeDiscussStatus(id, status).then((res) => {
          getList();
        });
      } else {
        return;
      }
    },
  });
};

let list = ref([]);
let list1 = ref([]);
let openDetail = (id: number) => {
  uni.navigateTo({ url: `/pages/discussDetail/index?type=1&id=${id}` });
};
onMounted(() => {
  getList();
});
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
    display: grid;
    grid-template-columns: 2fr 1fr;
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
