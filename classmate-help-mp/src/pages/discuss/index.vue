<template>
  <view class="discuss-list">
    <div class="topbar">
      <div class="left">
        <view class="search-box">
          <input class="search-input" placeholder="请输入关键词" v-model="keyword" />
          <button type="primary">搜索</button>
        </view>
        <div class="type-box">
          <div :class="type === 1 ? 'check-type type' : 'type'"  @click="changeType(1)">悬赏求助</div>
          <div :class="type === 2 ? 'check-type type' : 'type'" @click="changeType(2)" >失物招领</div>
          <div :class="type === 3 ? 'check-type type' : 'type'" @click="changeType(3)" >吐槽议论</div>
        </div>
      </div>
      <view class="right">
        <view :class="check === 1 ? 'check tab' : 'tab'" @click="changeCheck(1)">
          最新
        </view>
        <view :class="check === 2 ? 'check tab' : 'tab'" @click="changeCheck(2)">
          热议
        </view>
      </view>
    </div>
    <!--  -->
    <view class="card" v-for="item in discussList" :key="item.id" @click="openDetail(item.id)">
      <view class="pInfo">
        <view class="pImg">
          <image src="@/static/11.jpg" />
        </view>
        <view class="pUser">{{ item.ownerName }}</view>
      </view>

      <view class="pContent">{{ item.title }}</view>
      <view class="comment">
        <image src="@/static/i-comment.png"></image>
        <view class="comment-count">33</view>
      </view>
    </view>
  </view>
  <view class="createbtn" @click="toCreate()">+</view>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { getDiscussList } from "@/api/discuss.js";
import { onShow, onReachBottom } from "@dcloudio/uni-app";
let check = ref<number>(1);

let changeCheck = (value: number) => {
  check.value = value;
};
let type = ref<number>(1);
let changeType= (value: number) => {
  type.value = value;
};


// 搜索款
let keyword = ref('123')

// 获取讨论列表
let getListData = async (init) => {
  if(init){
    page.pageNum = 0,
    page.pageSize = 5
  }
  await getDiscussList(page.pageNum, page.pageSize).then((res: any) => {
    res.forEach((item: any) => {
      discussList.value.push(item);
    });

  });
}
// 最新、最热帖切换
watch(check, (newVal) => {
  
});
// 最新、最热帖切换
watch(type, (newVal) => {
  
});


let toCreate = () => {
  uni.navigateTo({ url: "/pages/discussDetail/index?type=2" });
};
let openDetail = (id: number) => {
  uni.navigateTo({ url: `/pages/discussDetail/index?type=1&id=${id}` });
};
interface discuss {
  date?: null | string;
  id?: number | null;
  intro?: null | string;
  isDelete?: number | null;
  ownerId?: number | null;
  ownerName?: null | string;
  status?: number | null;
  title?: null | string;
  view?: number | null;
  [property: string]: any;
}
let discussList = ref<discuss[]>([]);
let page = {
  pageNum: 0,
  pageSize: 5, 
};
let haveMore = true;
let status = ref<string>("more");
onMounted(async () => {
  await getDiscussList(page.pageNum, page.pageSize).then((res: any) => {
    res.forEach((item: any) => {
      discussList.value.push(item);
    });

  });
});
onReachBottom(async () => {
  if (haveMore) {
    status.value = "loading";
    page.pageNum++;
    await getDiscussList(page.pageNum, page.pageSize).then((res: any) => {
      res.forEach((item: any) => {
        item.imgs = JSON.parse(item.imgs);
        discussList.value.push(item);
      });
    });
    status.value = "nomore";
    haveMore = false;
  } else {
  }
});

</script>

<style lang="scss" scoped>
.discuss-list {
  padding: 40rpx;
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: 40rpx;

  .topbar {
    display: grid;
    grid-template-columns: 8fr 2fr;
    height: 160rpx;
    gap: 30rpx;

    .left {
      display: grid;
      grid-template-rows: 1fr 1fr;
      border-radius: 10rpx;
      background-color: white;
      box-shadow: 4rpx 4rpx 4rpx rgb(241, 241, 241);
      height: 100%;

      .search-box {
        display: flex;
        align-items: center;
        height: 60rpx;
        padding: 30rpx 10rpx 0rpx;

        .search-input {
          border-radius: 50rpx;
          border: 2px solid rgb(223, 223, 223);
          background-color: rgb(240, 239, 239);
          padding-left: 40rpx;
   
        }
        button{
          height: 100%;
          font-size: 24rpx
        }
      }
      .type-box{
        padding:20rpx;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .type{
          padding: 10rpx;
          border:1rpx solid gray;
          border-radius: 10rpx;
          color:rgb(161, 161, 161);
        }
        .check-type{
          background-color: rgb(102, 181, 247);
          color: white;
        }
      }
    }

    .right {
      display: grid;
      grid-template-rows: 1fr 1fr;
      background-color: rgb(250, 250, 250);
      border-radius: 10rpx;
      border: 1rpx solid rgb(194, 194, 194);
      height: 100%;

      .tab {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .check {
        background-color: rgb(102, 181, 247);
        color: white;
      }

      .new {
        border-right: 2rpx solid gray;
      }
    }
  }

  .card {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgba(241, 249, 250, 0.904);
    border-radius: 10rpx;
    box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
    padding: 10rpx 10rpx 30rpx 10rpx;

    .pInfo {
      display: flex;
      align-items: center;
      padding-top: 10rpx;

      .pImg {
        height: 100rpx;
        width: 100rpx;

        image {
          height: 100%;
          width: 100%;
          border-radius: 50rpx;
        }
      }

      .pUser {
        font-size: 48rpx;
        font-weight: bolder;
        text-indent: 0.4em;
      }
    }

    .pContent {
      margin-top: 10rpx;
      font-size: 36rpx;
      text-indent: 2em;
    }

    .comment {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-top: 10rpx;
      padding-right: 40rpx;

      image {
        height: 50rpx;
        width: 50rpx;
      }
    }
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
