<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
uni.login({
  success(res) {
    if (res.code) {
      //发起网络请求
      uni.request({
        url: "/user/login",
        data: {
          code: res.code,
        },
      });
    } else {
      console.log("登录失败！" + res.errMsg);
    }
  },
});
</script>
<style>
page {
  height: 100%;
  background-color: rgb(245, 245, 245);
}
</style>
