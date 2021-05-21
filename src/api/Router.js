import axios from "../axios/AxiosConfig";

export function gets(p) {
  return axios.get(`/router`, { params: p });
}

export function update(id, data) {
  return axios.put(`/router/${id}`, data);
}

export function create(data) {
  return axios.post(`/router`, data);
}

export function del(id) {
  return axios.delete(`/router/${id}`);
}
