import axios from "../axios/AxiosConfig";

export function gets(p) {
  return axios.get(`/config`, { params: p });
}

export function update(id, data) {
  return axios.put(`/config/${id}`, data);
}

export function create(data) {
  return axios.post(`/config`, data);
}

export function del(id) {
  return axios.delete(`/config/${id}`);
}
