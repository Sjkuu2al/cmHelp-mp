<template>
  <view class="notice-box">
    <uni-section title="公告列表" type="line">
      <uni-collapse accordion>
        <uni-collapse-item title="2024.03.02公告">
          <view class="content">
            <text class="text"
              >2024.03.02公告同时只会保留一个组件的打开状态，其余组件会自动关闭。</text
            >
          </view>
        </uni-collapse-item>
        <uni-collapse-item title="2024.02.24公告">
          <view class="content">
            <text class="text"
              >2024.03.02公告同时只会保留一个组件的打开状态，其余组件会自动关闭。</text
            >
          </view>
        </uni-collapse-item>
        <uni-collapse-item title="2024.01.14公告">
          <view class="content">
            <text class="text"
              >2024.03.02公告同时只会保留一个组件的打开状态，其余组件会自动关闭。</text
            >
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </uni-section>
  </view>
</template>

<script setup lang="ts"></script>

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
