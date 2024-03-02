<template>
  <view class="shop-page">
    <div class="top-filter">
      <div class="search-box">
        <input
          class="search-input"
          placeholder="请输入关键词"
          v-model="keyword"
        />
      </div>
      <div class="filter-box"></div>
    </div>
    <div class="shop-list"></div>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

let keyword = ref("");
</script>

<style lang="scss" scoped>
.shop-page {
  height: 90%;
  padding: 30rpx;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 260rpx 1fr;
  gap: 40rpx;
  .top-filter {
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 40rpx;
    .search-box {
      height: 80rpx;
      padding: 30rpx 40rpx;
      .search-input {
        border-radius: 50rpx;
        border: 2px solid rgb(223, 223, 223);
        background-color: rgb(240, 239, 239);
        padding-left: 40rpx;
      }
    }
    .filter-box {
      flex-grow: 1;
    }
  }
  .shop-list {
    background-color: white;
  }
}
</style>
