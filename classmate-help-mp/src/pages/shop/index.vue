<template>
  <view class="shop-page">
    <view class="top-filter">
      <view class="search-box">
        <input
          class="search-input"
          placeholder="请输入关键词"
          v-model="keyword"
        />
      </view>
      <view class="filter-box">
        <image src="@/static/i-book.png" />
        <image src="@/static/i-clothes.png" />
        <image src="@/static/i-phone.png" />
        <image src="@/static/i-hzp.png" />
      </view>
    </view>
    <view class="shop-list">
      <goodItem />
      <goodItem />
      <goodItem />
      <goodItem />
      <goodItem />
    </view>
    <view class="createbtn" @click="toCreate()">+</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import goodItem from "@/components/shop/goodItem.vue";
let keyword = ref("");
let toCreate = () => {
  uni.navigateTo({ url: "/pages/shopDetail/index?type=0" });
};
</script>

<style lang="scss" scoped>
.shop-page {
  position: relative;
  height: 80%;
  padding: 30rpx;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 260rpx 1fr;
  gap: 40rpx;
  .top-filter {
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 10rpx;
    box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
    .search-box {
      height: 60rpx;
      padding: 30rpx 40rpx 0rpx;
      .search-input {
        border-radius: 50rpx;
        border: 2px solid rgb(223, 223, 223);
        background-color: rgb(240, 239, 239);
        padding-left: 40rpx;
      }
    }
    .filter-box {
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      image {
        width: 100rpx;
        height: 100rpx;
      }
    }
  }
  .shop-list {
    display: flex;
    flex-direction: column;
    gap: 40rpx;
    border-radius: 10rpx;
    box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
    background-color: white;
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
