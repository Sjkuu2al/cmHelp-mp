import { useHttp } from "../utils/request";

export let getNoticeList = () => {
  return useHttp({ url: "/notice/getList" });
};
