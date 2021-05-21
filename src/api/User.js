import axios from "../axios/AxiosConfig";
import Vue from "vue";

export function getUserRouter() {
  return axios({
    url: Vue.prototype.$PUBLIC_PATH + "data/asyncRouterDemo",
    method: "get",
    responseType: "text"
  });
}

export function gets(p) {
  return axios.get(`/user`, { params: p });
}

export function update(id, data) {
  return axios.put(`/user/${id}`, data);
}

export function del(id) {
  return axios.delete(`/user/${id}`);
}

export function create(data) {
  return axios.post(`/user`, data);
}
