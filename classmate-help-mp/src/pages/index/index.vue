<template>
  <view class="index">
    <toCard :introduction="noticeIntro" :bgImage="notice" toUrl="/pages/notice/index"/>
    <toCard :introduction="exchangeIntro" :bgImage="exchange" toUrl="/pages/shop/index"/>
    <toCard :introduction="discussIntro" :bgImage="discuss" toUrl="/pages/discuss/index"/>
    <toCard :introduction="futureIntro" :bgImage="future" :isTo="false" />
  </view>
</template>

<script setup lang="ts">
import toCard from "@/components/index/toCard.vue";
import exchange from "@/static/exchange.png";
import discuss from "@/static/discuss.png";
import notice from "@/static/notice.png";
import future from "@/static/future.png";
const exchangeIntro = {
  title: "二手置换",
  content: "进行校园二手物品置换...",
};
const discussIntro = {
  title: "校园论坛",
  content: "校园热点事件讨论区...",
};
const noticeIntro = {
  title: "公告列表",
  content: "程序最新公告展示...",
};
const futureIntro = {
  title: "敬请期待",
  content: "更多功能开发中...",
};
</script>

<style lang="scss" scoped>
.index {
  height: 90%;
  padding: 70rpx;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: 1fr;
  gap: 50rpx;
}
</style>
