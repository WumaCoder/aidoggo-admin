import axios from "../axios/AxiosConfig";

export function gets(p) {
  return axios.get(`/message`, { params: p });
}

export function update(id, data) {
  return axios.put(`/message/${id}`, data);
}

export function create(data) {
  return axios.post(`/message`, data);
}

export function del(id) {
  return axios.delete(`/message/${id}`);
}
