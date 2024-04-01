import { useHttp } from "../utils/request";

export let getCommentByOid = (ownerId, type) => {
  return useHttp({ url: "/comment/getByOid", data: { ownerId, type } });
};

export let getCommentByFid = (fatherId) => {
  return useHttp({ url: "/comment/getByFid", data: { fatherId } });
};

export let createComment = (comment) => {
  return useHttp({ url: "/comment/create", method: "POST", data: comment });
};

export let deleteComment = (id) => {
  return useHttp({ url: "/comment/delete", data: { id } });
};
