import { useHttp } from "../utils/request";

export let getCommonByFid = (fatherId) => {
  return useHttp({ url: "/comment/get", data: { fatherId } });
};

export let createCommon = (common) => {
  return useHttp({ url: "/comment/create", method: "POST", data: { common } });
};

export let deleteCommon = (id) => {
  return useHttp({ url: "/comment/delete", data: { id } });
};
