import axios from "../axios/AxiosConfig";

export function gets(p) {
  return axios.get(`/material`, { params: p });
}

export function update(id, data) {
  return axios.put(`/material/${id}`, data);
}

export function create(data) {
  return axios.post(`/material`, data);
}

export function del(id) {
  return axios.delete(`/material/${id}`);
}
