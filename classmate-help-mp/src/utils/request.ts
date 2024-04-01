import { toast } from "./index.js";

// 1.引入Env变量
// const API = import.meta.env.VITE_APP_API;
const API = 'http://localhost:7000'

// 2.uniapp 拦截器
uni.addInterceptor("request", {
  invoke(options) {
    // 请求前对请求头操作 , 如添加校验请求头 Authorization
    options.url = API + options.url;

    if (uni.getStorageSync("token"))
      options.header["token"] = uni.getStorageSync("token");
  },
  success(response) {
    // 请求成功操作
    if (!response || !response.statusCode) {
      return Promise.reject("错误的消息内容。");
    }
    //处理状态码
    if (response.statusCode !== 200) {
      if (response.statusCode === 402) {
        toast("登录已过期，请重新登录");
        uni.clearStorageSync();
        setTimeout(() => {
          uni.navigateTo({
            url: "/pages/User/Login",
          });
        }, 1000);
      } else {
        console.log(response, "response");
        toast(response.message || "请求失败");
      }
      return Promise.resolve({
        data: { code: response.statusCode, message: "请求失败" },
      });
    } else {
      if (!response.data || !response.data.code) {
        return Promise.resolve(response);
      }
      //处理消息码
      if (response.data && response.data.code !== 200) {
        if (response.data.code === 402) {
          toast("请先登录");
          setTimeout(() => {
            //调转到登录页面
            uni.navigateTo({
              url: "/pages/User/Login",
            });
          }, 1000);
          return Promise.resolve(response);
        } else {
          toast(response.data.message || "无法发起请求");
          return Promise.resolve(response);
        }
      }
    }
    //返回消息
    return Promise.resolve(response);
  },
  fail(err) {
    // 请求网络异常操作
    toast('请求发生错误！')
  }

});

// // 3. 通用返回接口
// // 可放 types/global.d.ts [declare 声明]。这里方便展示
// interface Response<T = unknown> {
//   code: number;
//   status:string;
//   message: string;
//   result: T;
// }

/**
 * 默认状态码
 */
const STATUS_CODE = {
  SUCCESS: 200,
  FAIL: 400,
};

/**
 * 对 uni.request 进行工具封装
 *
 * @param option {{@link UniNamespace.RequestOptions}}
 */
const useHttp = <T>(option: UniNamespace.RequestOptions) => {
  return new Promise<T>((resolve, reject) => {
    uni.request({
      ...option,
      success(res) {
        // 业务判断成功
        const result = res.data as T;
        if(res.statusCode===200){
          resolve(result);
        }
        else{
          reject(res);
        }
  
      },
      fail(err) {
        // 请求网络异常操作
        reject(err);
      },
    });
  });
};

// GET 请求封装, Omit 排除 method 类型
const useHttpGet = <T>(option: Omit<UniNamespace.RequestOptions, "method">) => {
  return useHttp<T>({
    ...option,
    method: "GET",
  });
};

// POST 请求封装, Omit 排除 method 类型
const useHttpPost = <T>(
  option: Omit<UniNamespace.RequestOptions, "method">
) => {
  return useHttp<T>({
    ...option,
    method: "POST",
  });
};

export { useHttp, useHttpGet, useHttpPost, STATUS_CODE };

