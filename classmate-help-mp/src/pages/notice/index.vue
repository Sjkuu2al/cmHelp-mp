<template>
  <view class="notice-box">
    <uni-section title="公告列表" type="line">
      <uni-collapse accordion v-for="item in noticeList">
        <uni-collapse-item :title="item.title" :key="item.id">
          <view class="content">
            <text class="text">{{ item.content }}</text>
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </uni-section>
  </view>
</template>

<script setup lang="ts">
import { getNoticeList } from "@/api/notice.js";
import { getUserById } from "@/api/user.js";
import { ref } from "vue";
let noticeList = ref<Array<any>>([]);
getNoticeList().then((res: any) => {
  noticeList.value = res;
  console.log("noticeList :>> ", noticeList);
});
getUserById(1);
</script>

<style lang="scss" scoped>
.notice-box {
  height: 90%;
  padding: 30rpx;
  .content {
    padding: 30rpx;
    .text {
      padding-left: 36rpx;
      font-size: 36rpx;
    }
  }
}
</style>
