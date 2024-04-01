<template>
  <view class="index">
    <uni-section title="上架中" type="line">
      <view class="good-list">
        <goodItem
          v-for="item in status"
          :id="item.id"
          :img="item.imgs ? item.imgs[0] : ''"
          :title="item.title!"
          :intro="item.intro!"
          :price="item.price!"
          :edit="true"
          :status="1"
          @change="refresh"
        />
      </view>
    </uni-section>
    <view class="placeholder"></view>
    <uni-section title="已下架" type="line">
      <view class="good-list">
        <goodItem
          v-for="item in unlive"
          :id="item.id"
          :img="item.imgs ? item.imgs[0] : ''"
          :title="item.title!"
          :intro="item.intro!"
          :price="item.price!"
          :edit="true"
          :status="0"
          @change="refresh"
        />
      </view>
    </uni-section>
  </view>
</template>

<script setup lang="ts">
import goodItem from "@/components/shop/goodItem.vue";
import { getGoodListById } from "@/api/good.js";
import { onMounted, ref } from "vue";
let status = ref([]);
let unlive = ref([]);
onMounted(async () => {
  await getGoodListById(1).then((res) => {
    res.forEach((item) => {
      item.imgs = JSON.parse(item.imgs);
      if (item.status == 1) {
        status.value.push(item);
      } else {
        unlive.value.push(item);
      }
    });
  });
});
let refresh = async () => {
  status.value = [];
  unlive.value = [];
  await getGoodListById(1).then((res) => {
    res.forEach((item) => {
      item.imgs = JSON.parse(item.imgs);
      if (item.status == 1) {
        status.value.push(item);
      } else {
        unlive.value.push(item);
      }
    });
  });
};
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
