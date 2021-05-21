import axios from "../axios/AxiosConfig";

export function getTimeLine(id, limit) {
  return axios.get(`/model/${id}/counter/toDay`, { params: { limit } });
}

export function getCount(id) {
  return axios.get(`/model/${id}/counter`);
}

export function getLogs(crudParams) {
  return axios.get(`/log`, { params: crudParams });
}
