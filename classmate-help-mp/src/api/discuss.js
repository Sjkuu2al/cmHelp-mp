import { useHttp } from "../utils/request";

export let getDiscussList = (pageNum, pageSize) => {
  return useHttp({ url: "/discuss/getList", data: { pageNum, pageSize } });
};

export let getDiscussDetail = (id) => {
  return useHttp({ url: "/discuss/getById	", data: { id } });
};
export let createDiscuss = (discuss) => {
  return useHttp({
    url: "/discuss/create",
    data: discuss,
    method: "POST",
  });
};
export let changeDiscussStatus = (id, status) => {
  return useHttp({ url: "/discuss/status", data: { id, status } });
};
export let editDiscuss = (discuss) => {
  return useHttp({ url: "/discuss/edit", data: { discuss }, method: "POST" });
};
export let pvDiscuss = (id) => {
  return useHttp({ url: "/discuss/pv", data: { id } });
};
