import axios from "../axios/AxiosConfig";

export function gets(p) {
  return axios.get(`/image`, { params: p });
}

export function update(id, data) {
  return axios.put(`/image/${id}`, data);
}

export function create(data) {
  return axios.post(`/image`, data);
}

export function del(id) {
  return axios.delete(`/image/${id}`);
}
