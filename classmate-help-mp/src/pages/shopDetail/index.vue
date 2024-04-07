<template>
  <view class="detail-page" v-if="type === '1'">
    <view class="card">
      <view class="intro">
        <view class="title">&nbsp;&nbsp;{{ form.title }}</view>
        <view class="content"> &nbsp;&nbsp;{{ form.intro }} </view>
      </view>
      <view class="coast">￥{{ form.price }}</view>
    </view>
    <swiper
      class="image-box"
      circular
      indicator-dots
      autoplay
      :interval="3000"
      :duration="500"
    >
      <swiper-item v-for="item in form.imgs">
        <image class="image" :src="item"></image>
      </swiper-item>
    </swiper>

    <view class="msg">
      <view class="top-box">
        <view class="title">评论区</view>
        <view class="comment-btn" @click="openCommentDialog()">评论</view>
      </view>
      <view
        v-if="commentList.length > 0"
        class="msg-box"
        v-for="item in commentList"
        @click="openCommentDialog(item.id)"
        :key="item.id"
      >
        <view class="user"
          >{{ item.userName
          }}{{ item.fatherId ? `  回复  ${item.fatherName}` : "" }}:</view
        >
        <view class="content">{{ item.content }}</view>
        <view class="date">{{ item.date }}</view>
      </view>
      <view class="none-comment" v-else>暂无更多评论</view>
    </view>
    <view>
      <!-- 输入框示例 -->
      <uni-popup ref="inputDialog" type="dialog">
        <uni-popup-dialog
          ref="inputClose"
          mode="input"
          :title="dialogTitle"
          :value="com"
          placeholder="请输入内容"
          @confirm="dialogInputConfirm"
        ></uni-popup-dialog>
      </uni-popup>
    </view>
  </view>
  <!-- 新增/编辑表单 -->
  <view class="edit-page" v-else-if="type === '0' || type === '2'">
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
      <!-- todo:限制正整数 -->
      <view class="edit-part">
        <view class="title">商品价格</view>
        <input
          class="line"
          focus
          placeholder="请输入商品价格"
          v-model="form.price"
        />
      </view>
      <view class="edit-part">
        <view class="title">品类</view>
        <radio-group @change="radioChange">
          <label class="radio">
            <radio value="0" :checked="form.type === 0" />教材
          </label>
          <label class="radio">
            <radio value="1" :checked="form.type === 1" />衣物
          </label>
          <label class="radio">
            <radio value="2" :checked="form.type === 2" />电子
          </label>
          <label class="radio">
            <radio value="3" :checked="form.type === 3" />其他
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
          <view class="up-image" v-for="item in form.imgs" :key="item">
            <image :src="item"></image>
          </view>
          <view
            class="up-image"
            @click="uploadImg()"
            v-if="form.imgs.length < 3"
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
import { getGoodDetail, createGood, editGood } from "@/api/good.js";
import {
  getCommentByOid,
  createComment,
  getCommentOwnerName,
} from "@/api/comment.js";
import { onLoad } from "@dcloudio/uni-app";
import { ref, watch } from "vue";

let type = ref();
let id = ref();
interface formType {
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
let form = ref<formType>({
  owner: 1,
  title: "",
  type: 0,
  intro: "",
  imgs: [],
});
let commentList = ref([]);
// 评论弹窗相关
let dialogTitle = ref("评论");
let inputDialog = ref();
let com = ref("");
let inputClode = ref();
let targetComment;
let openCommentDialog = (id?: number) => {
  if (id) {
    dialogTitle.value = "回复评论";
    targetComment = id;
  } else {
    dialogTitle.value = "评论";
    targetComment = null;
  }
  inputDialog.value.open();
};
let dialogInputConfirm = async (value: string) => {
  let fatherName;
  if (targetComment) {
    await getCommentOwnerName(targetComment).then((res) => {
      fatherName = res;
    });
  }
  let comment = {
    fatherId: targetComment ? targetComment : null,
    fatherName,
    type: 1,
    ownerId: id.value,
    content: value,
    userId: 1,
    userName: "sikuu",
    date: new Date(),
  };
  createComment(comment).then(() => {
    init();
  });
  com.value = "";
  inputClose.value.val = "";
};

// 初始化数据
onLoad((e) => {
  // 选择性赋值（读取路由参数）
  if (e?.type) type.value = e.type;
  if (e?.id) id.value = e.id;
  if (id.value) {
    init();
  }
});

let init = () => {
  commentList.value = [];
  getGoodDetail(id.value).then((res) => {
    res.imgs = JSON.parse(res.imgs);
    form.value = res;
  });
  getCommentByOid(id.value, 1).then((res) => {
    res.forEach((item) => {
      item.date = item.date.substring(0, 10);
      commentList.value.push(item);
    });
  });
};
let formSubmit = () => {
  let data = {
    ...form.value,
    imgs: JSON.stringify(form.value.imgs),
    status: 1,
  };
  if (data.title && data.intro && data.price) {
    if (type.value === "0") {
      console.log("1313123213");
      editGood(data).then((res) => {
        if (res) {
          uni.showToast({ title: "编辑成功", duration: 3000 });
          uni.navigateBack();
        }
      });
    } else {
      createGood(data).then((res) => {
        if (res) {
          uni.showToast({ title: "新增成功", duration: 3000 });
          uni.navigateBack();
        }
      });
    }
  } else {
    uni.showToast({ title: "请完善信息", duration: 3000, icon: "error" });
  }
};
let radioChange = (e: any) => {
  form.value.type = e.detail.value;
};
// 选择图片
let uploadImg = () => {
  uni.chooseImage({
    count: 3,
    sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ["album"], //从相册选择
    success: function (res) {
      if (res.tempFilePaths.length) {
        form.value.imgs = form.value.imgs.concat(res.tempFilePaths);
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

      .comment-btn {
        border: 1px solid gray;
        border-radius: 10rpx;
        padding: 10rpx 20rpx;

        &:active {
          background-color: rgb(230, 230, 230);
        }
      }
    }
    .none-comment {
      padding: 30rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: gray;
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
