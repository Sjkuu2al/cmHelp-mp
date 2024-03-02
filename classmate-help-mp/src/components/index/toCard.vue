<template>
  <div class="to-card">
    <image class="background" :src="bgImage"></image>
    <div class="introduction">
      <div class="title">{{introduction.title}}</div>
      <div class="content">{{introduction.content}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  bgImage: {
    type: String,
  },
  introduction:{
    type: Object,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.to-card {
  height: 100%;
  width: 100%;
  background-color: rgba(241, 249, 250, 0.904);
  border-radius: 10rpx;
  box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
  display: grid;
  grid-template-columns: 280rpx 1fr;
  grid-template-rows: 1fr;
  .background {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .introduction {
    display: flex;
    flex-direction: column;
    .title {
      font-size: 44rpx;
      font-weight: bolder;
      padding-top: 20rpx;
      padding-bottom: 30rpx;
    }
    .content{
      font-size: 24rpx;
      widows: 60rpx;
      word-wrap: break-word;
      color:gray
    }
  }
}
</style>
