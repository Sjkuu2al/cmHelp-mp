<template>
  <view class="shop-page">
    <view class="top-filter">
      <view class="search-box">
        <input
          class="search-input"
          placeholder="请输入关键词"
          v-model="title"
        />
        <button type="primary" @click="selectData">搜索</button>
      </view>
      <div class="type-box">
        <div
          :class="type === 1 ? 'check-type type' : 'type'"
          @click="changeType(1)"
        >
          学研教材
        </div>
        <div
          :class="type === 2 ? 'check-type type' : 'type'"
          @click="changeType(2)"
        >
          电子产品
        </div>
        <div
          :class="type === 3 ? 'check-type type' : 'type'"
          @click="changeType(3)"
        >
          衣物配饰
        </div>
        <div
          :class="type === 4 ? 'check-type type' : 'type'"
          @click="changeType(4)"
        >
          其他
        </div>
      </div>
    </view>
    <view class="shop-list">
      <goodItem
        v-for="item in goods"
        :id="item.id"
        :img="item.imgs ? item.imgs[0] : ''"
        :title="item.title!"
        :intro="item.intro!"
        :price="item.price!"
      />
      <uni-load-more :status="status"></uni-load-more>
    </view>
    <view class="createbtn" @click="toCreate()">+</view>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import goodItem from "@/components/shop/goodItem.vue";
import { getGoodList } from "@/api/good.js";
import { onReachBottom, onShow } from "@dcloudio/uni-app";

let toCreate = () => {
  uni.navigateTo({ url: "/pages/shopDetail/index?type=2" });
};
interface good {
  date?: null | string;
  id?: number | null;
  imgs?: string[] | null;
  intro?: null | string;
  isDelete?: number | null;
  owner?: number | null;
  status?: number | null;
  title?: null | string;
  price?: string;
  type?: number | null;
  view?: number | null;
  [property: string]: any;
}
// 筛选项
let type = ref(1);
let title = ref("");
let goods = ref<good[]>([]);
let page = {
  pageNum: 0,
  pageSize: 5,
};
let haveMore = true;
let status = ref<string>("more");
let changeType = (value: number) => {
  type.value = value;
};
let getList = async (init) => {
  if (init) {
    page.pageNum = 0;
    goods.value.length = 0;
  }
  await getGoodList(page.pageNum, page.pageSize, type.value, title.value).then(
    (res: any) => {
      res.forEach((item: any) => {
        item.imgs = JSON.parse(item.imgs);
        goods.value.push(item);
      });
      if (goods.value.length < (page.pageNum + 1) * page.pageSize) {
        status.value = "nomore";
        haveMore = false;
      } else {
        status.value = "more";
        haveMore = true;
      }
    }
  );
};

let selectData = () => {
  getList(true);
}; // 类型切换
watch(type, (newVal) => {
  getList(true);
});
onMounted(async () => {
  getList(true);
});
onReachBottom(async () => {
  if (haveMore) {
    status.value = "loading";
    page.pageNum++;
    getList(false);
  } else {
  }
});
</script>

<style lang="scss" scoped>
.shop-page {
  position: relative;
  height: 80%;
  padding: 30rpx;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100rpx 1fr;
  gap: 40rpx;
  .top-filter {
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 10rpx;
    box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
    .search-box {
      display: flex;
      height: 60rpx;
      padding: 30rpx 40rpx 0rpx;
      align-items: center;
      .search-input {
        border-radius: 50rpx;
        border: 2px solid rgb(223, 223, 223);
        background-color: rgb(240, 239, 239);
        padding-left: 40rpx;
        flex: 1;
      }
      button {
        margin-left: 20rpx;
        height: 100%;
        font-size: 24rpx;
      }
    }
    .type-box {
      background-color: white;
      padding: 20rpx;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .type {
        padding: 10rpx;
        border: 1rpx solid gray;
        border-radius: 10rpx;
        color: rgb(197, 197, 197);
      }
      .check-type {
        background-color: rgb(102, 181, 247);
        color: white;
      }
    }
  }
  .shop-list {
    margin-top: 100rpx;
    display: flex;
    flex-direction: column;
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
