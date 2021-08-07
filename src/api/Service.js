import axios from "../axios/AxiosConfig";

export function getRoutes() {
  return axios(`/routes`);
}

export function gets(p) {
  return axios.get(`/service`, { params: p });
}

export function update(id, data) {
  return axios.put(`/service/${id}`, data);
}

export function create(data) {
  return axios.post(`/service`, data);
}

export function del(id) {
  return axios.delete(`/service/${id}`);
}
