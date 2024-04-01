<template>
  <view class="detail-page" v-if="type === '1'">
    <view class="card">
      <view class="intro">
        <view class="title">&nbsp;&nbsp;高等数学第一册</view>
        <view class="content">
          &nbsp;&nbsp;大一学校统一购买的，很新没有什么笔记.
        </view>
      </view>
      <view class="coast">￥30</view>
    </view>
    <swiper
      class="image-box"
      circular
      indicator-dots
      autoplay
      :interval="3000"
      :duration="500"
    >
      <swiper-item>
        <image class="image" src="@/static/photo1.png"></image>
      </swiper-item>
      <swiper-item>
        <image class="image" src="@/static/photo1.png"></image>
      </swiper-item>
      <swiper-item>
        <image class="image" src="@/static/photo1.png"></image>
      </swiper-item>
    </swiper>

    <view class="msg">
      <div class="top-box">
        <view class="title">评论区</view>
        <div class="common-btn" @click="openCommonDialog()">评论</div>
      </div>
      <view class="msg-box" @click="openCommonDialog(12)">
        <view class="user">sikuu</view>
        <view class="content">我想要,可以商1量价格吗?</view>
        <view class="date">2023-05-11</view>
      </view>
      <view class="msg-box">
        <view class="user">vivvd</view>
        <view class="content">我的微信号是:148434123</view>
        <view class="date">2023-03-12</view>
      </view>
      <view class="msg-box">
        <view class="user">aasss</view>
        <view class="content">不错哦</view>
        <view class="date">2023-01-11</view>
      </view>
    </view>
    <view>
      <!-- 输入框示例 -->
      <uni-popup ref="inputDialog" type="dialog">
        <uni-popup-dialog
          ref="inputClose"
          mode="input"
          :title="dialogTitle"
          :value="common"
          placeholder="请输入内容"
          @confirm="dialogInputConfirm"
        ></uni-popup-dialog>
      </uni-popup>
    </view>
  </view>
  <!-- 新增/编辑表单 -->
  <view class="edit-page" v-else-if="type === '0'">
    <form @submit="formSubmit">
      <view class="edit-part">
        <view class="title">商品名</view>
        <input
          class="line"
          focus
          placeholder="请输入商品名"
          v-model="form.title"
        />
      </view>
      <view class="edit-part">
        <view class="title">品类</view>
        <radio-group @change="radioChange">
          <label class="radio">
            <radio value="0" :checked="form.radioType === '0'" />教材
          </label>
          <label class="radio">
            <radio value="1" :checked="form.radioType === '1'" />衣物
          </label>
          <label class="radio">
            <radio value="2" :checked="form.radioType === '2'" />电子
          </label>
          <label class="radio">
            <radio value="3" :checked="form.radioType === '3'" />其他
          </label>
        </radio-group>
      </view>
      <view class="edit-part">
        <view class="title">商品简介</view>
        <textarea
          v-model="form.intro"
          placeholder="请输入商品简介"
          class="line"
          :style="{ height: '500rpx', width: '100%' }"
        />
      </view>
      <view class="edit-part">
        <view class="title">商品图片</view>
        <view class="upload-image-box">
          <view class="up-image" v-for="item in form.imgList" :key="item">
            <image :src="item"></image>
          </view>
          <view
            class="up-image"
            @click="uploadImg()"
            v-if="form.imgList.length < 3"
            >+</view
          >
        </view>
      </view>
      <view class="btns">
        <button type="primary" form-type="submit">提交</button>
      </view>
    </form>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

let type = ref();
let id = ref();
interface formType {
  title: string;
  radioType: string;
  intro: string;
  imgList: string[];
}
let form = ref<formType>({
  title: "",
  radioType: "0",
  intro: "",
  imgList: [],
});

// 评论弹窗相关
let dialogTitle = ref("评论");
let inputDialog = ref();
let common = ref("");
let openCommonDialog = (id?: number) => {
  if (id) {
    console.log("id", id);
    dialogTitle.value = "回复评论";
  } else {
    dialogTitle.value = "评论";
  }
  inputDialog.value.open();
};
let dialogInputConfirm = (value: string) => {
  console.log("提交:", value);

  common.value = "";
};
onLoad((e) => {
  // 选择性赋值（读取路由参数）
  if (e?.type) type.value = e.type;
  if (e?.id) id.value = e.id;
  console.log("id.value :>> ", id.value);
});
let formSubmit = () => {
  console.log("成功提交");
};
let radioChange = (e: any) => {
  form.value.radioType = e.detail.value;
};
let uploadImg = () => {
  uni.chooseImage({
    count: 3, //默认9
    sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ["album"], //从相册选择
    success: function (res) {
      if (res.tempFilePaths.length) {
        form.value.imgList = form.value.imgList.concat(res.tempFilePaths);
      }
    },
  });
};
</script>

<style lang="scss" scoped>
.detail-page {
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20rpx;

  .image-box {
    width: 100%;
    height: 600rpx;
    border-radius: 10rpx;
    background-color: white;
    box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);

    .image {
      width: 100%;
      height: 600rpx;
      border-radius: 10rpx;
    }
  }

  .card {
    width: 100%;
    height: 300rpx;
    border-radius: 10rpx;
    box-sizing: border-box;
    padding: 30rpx;
    background-color: white;
    box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
    display: flex;

    .intro {
      display: flex;
      flex-direction: column;
      gap: 40rpx;
      width: 70%;

      .title {
        font-size: 48rpx;
        font-weight: bolder;
      }

      .content {
      }
    }

    .coast {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 60rpx;
      font-weight: bolder;
    }
  }

  .msg {
    width: 100%;

    background-color: white;
    box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
    padding: 20rpx;
    box-sizing: border-box;

    .top-box {
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 48rpx;
        font-weight: bolder;
      }

      .common-btn {
        border: 1px solid gray;
        border-radius: 10rpx;
        padding: 10rpx 20rpx;

        &:active {
          background-color: rgb(230, 230, 230);
        }
      }
    }

    .msg-box {
      display: flex;
      flex-direction: column;
      gap: 4rpx;
      border-bottom: 1px black solid;
      padding: 10rpx;
      box-sizing: border-box;
      &:active {
        background-color: rgb(242, 242, 242);
      }
      .user {
        font-size: 36rpx;
        font-weight: bold;
      }

      .date {
        align-self: flex-end;
      }
    }
  }
}

.edit-page {
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20rpx;

  .edit-part {
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    gap: 10rpx;

    .title {
      font-size: 48rpx;
      font-weight: bolder;
    }

    .line {
      height: 50rpx;
      font-size: 40rpx;
      background-color: white;
      box-shadow: 10rpx 5rpx 10rpx rgb(232, 232, 232);
    }

    .radio {
      font-size: 36rpx;
    }

    .upload-image-box {
      height: 200rpx;
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-flow: row;
      gap: 20rpx;

      .up-image {
        width: 100%;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 100rpx;

        image {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }
    }
  }

  .btns {
    display: flex;
    gap: 100%;
    justify-content: center;
    align-items: center;

    button {
      width: 600rpx;
    }
  }
}
</style>
