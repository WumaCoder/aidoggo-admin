import axios from "../axios/AxiosConfig";

export function gets(p) {
  return axios.get(`/discern`, { params: p });
}

export function update(id, data) {
  return axios.put(`/discern/${id}`, data);
}

export function create(data) {
  return axios.post(`/discern`, data);
}

export function del(id) {
  return axios.delete(`/discern/${id}`);
}
