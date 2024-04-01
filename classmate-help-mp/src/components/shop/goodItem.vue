<template>
  <view class="item-box" @click="openDetail()">
    <image :src="img" />
    <view class="intro">
      <view class="title">{{ title }}</view>
      <view class="price">￥{{ price }}</view>
      <view class="info">{{ intro }}</view>
    </view>
    <div class="live" v-if="edit">
      <button
        @click.stop="changeStatus(status)"
        :type="status === 1 ? 'warn' : 'primary'"
      >
        {{ status === 1 ? "下架" : "上架" }}
      </button>
    </div>
  </view>
</template>
<script setup lang="ts">
import { changeGoodStatus } from "@/api/good.js";
import { getCurrentInstance } from "vue";
const instance = getCurrentInstance();
const props = defineProps({
  id: Number,
  img: String,
  title: String,
  price: String,
  intro: String,
  edit: Boolean,
  status: Number,
});
let openDetail = () => {
  uni.navigateTo({ url: `/pages/shopDetail/index?type=1&id=${props.id}` });
};
let changeStatus = (status: Number) => {
  uni.showModal({
    title: `是否确认更改当前商品状态?`,
    cancelText: "取消",
    confirmText: "确认",
    success: async (ans) => {
      if (ans.confirm) {
        let status;
        if (props.status === 1) {
          status = 0;
        } else {
          status = 1;
        }
        await changeGoodStatus(props.id, status).then((res) => {
          if (res) {
            uni.showToast({ title: "变更成功" });
          }
          //
          instance.emit("change");
        });
      } else {
        return;
      }
    },
  });
};
</script>

<style lang="scss" scoped>
.item-box {
  padding-top: 30rpx;
  padding-left: 30rpx;
  padding-bottom: 30rpx;
  max-height: 260rpx;
  display: grid;
  grid-template-columns: 200rpx 1fr 160rpx;
  grid-template-rows: 1fr;
  image {
    height: 200rpx;
    width: 200rpx;
    object-fit: cover;
  }
  .intro {
    display: grid;
    grid-template-rows: 80rpx 1fr 1fr;
    height: 100rpx;
    padding-left: 30rpx;
    .title {
      font-size: 44rpx;
      font-weight: bolder;
    }
    .price {
      font-size: 40rpx;
      font-weight: bold;
    }
    .info {
      font-size: 32rpx;
      color: gray;
    }
  }
  .live {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30rpx;
  }
}
</style>
