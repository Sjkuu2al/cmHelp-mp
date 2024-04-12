<template>
  <view class="discuss-page" v-if="type === '1'">
    <view class="card">
      <view class="intro">
        <view class="pInfo">
          <view class="pImg"><image src="/static/11.jpg" /></view>
          <view class="pUser">{{ form.title }}</view>
        </view>

        <view class="content">{{ form.intro }}</view>
        <view class="btn-box">
          <view class="time">{{ form.date }}</view>
        </view>
      </view>
    </view>

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
        <view class="title">标题</view>
        <input
          class="line"
          focus
          placeholder="请输入帖子标题"
          v-model="form.title"
        />
      </view>
      <view class="edit-part">
        <view class="title">内容</view>
        <textarea
          v-model="form.intro"
          placeholder="请输入商品简介"
          class="line"
          :style="{ height: '500rpx', width: '100%' }"
        />
      </view>
      <view class="btns">
        <button type="primary" form-type="submit">提交</button>
      </view>
    </form>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getDiscussDetail, pvDiscuss ,createDiscuss} from "@/api/discuss.js";
import {
  getCommentByOid,
  createComment,
  getCommentOwnerName,
} from "@/api/comment.js";

import { onLoad } from "@dcloudio/uni-app";

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
let id = ref();
let type = ref();
let form = ref<discuss>({});
// 评论
let targetComment;
let commentList = ref([]);
let dialogTitle = ref("评论");
let com = ref("");
let inputDialog = ref();
let inputClose = ref();
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
    type: 2,
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
    pvDiscuss(id.value);
  }
});
let init = () => {
  commentList.value = [];
  getDiscussDetail(id.value).then((res) => {
    res.date = res.date.substring(0, 10);
    form.value = res;
  });
  getCommentByOid(id.value, 2).then((res) => {
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
  if (data.title && data.intro) {
    if (type.value === "2") {
      
      createDiscuss(data).then((res) => {
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
</script>

<style lang="scss" scoped>
.discuss-page {
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
      width: 100%;

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
      .content {
        flex: 1;
      }
      .btn-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .comment-btn {
          border: 1px solid gray;
          border-radius: 10rpx;
          padding: 10rpx 20rpx;
          &:active {
            background-color: rgb(230, 230, 230);
          }
        }
      }
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
