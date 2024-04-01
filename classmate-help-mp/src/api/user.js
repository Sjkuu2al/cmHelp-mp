import { useHttp } from "../utils/request";

export let getUserById = (id) => {
  return useHttp({ url: "/user/getById", data: { id } });
};

export let getUserByTel = (tel) => {
  return useHttp({ url: "/user/getById", data: { tel } });
};
