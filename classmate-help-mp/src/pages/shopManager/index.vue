<template>
  <view class="index">
    <uni-section title="上架中" type="line">
      <div class="good-list">
        <goodItem />
        <goodItem />
        <goodItem />
      </div>
    </uni-section>
    <div class="placeholder"></div>
    <uni-section title="已下架" type="line">
      <div class="good-list">
        <goodItem />
        <goodItem />
        <goodItem />
      </div>
    </uni-section>
  </view>
</template>

<script setup lang="ts">
import goodItem from "@/components/shop/goodItem.vue";
</script>

<style lang="scss" scoped>
.good-list {
  display: flex;
  flex-direction: column;
  gap: 40rpx;
  border-radius: 10rpx;
  box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
  background-color: white;
}
.placeholder {
  height: 100rpx;
  width: 100%;
}
</style>
