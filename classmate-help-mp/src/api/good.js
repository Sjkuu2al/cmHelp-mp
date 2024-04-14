import { useHttp } from "../utils/request";

export let getGoodList = (pageNum, pageSize, type, title) => {
  return useHttp({
    url: "/good/getList",
    data: { pageNum, pageSize, type, title },
  });
};
export let getGoodListById = (owner) => {
  return useHttp({ url: "/good/getListById", data: { owner } });
};

export let getGoodDetail = (id) => {
  return useHttp({ url: "/good/getById	", data: { id } });
};
export let createGood = (good) => {
  return useHttp({
    url: "/good/create",
    data: good,
    method: "POST",
  });
};
export let changeGoodStatus = (id, status) => {
  return useHttp({ url: "/good/status", data: { id, status } });
};
export let editGood = (good) => {
  return useHttp({ url: "/good/edit", data: good, method: "POST" });
};
