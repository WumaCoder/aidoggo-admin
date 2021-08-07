import axios from "../axios/AxiosConfig";

export function gets(p) {
  return axios.get(`/role`, { params: p });
}

export function update(id, data) {
  return axios.put(`/role/${id}`, data);
}

export function create(data) {
  return axios.post(`/role`, data);
}

export function del(id) {
  return axios.delete(`/role/${id}`);
}
