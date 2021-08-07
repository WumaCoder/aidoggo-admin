import axios from "../axios/AxiosConfig";

export function login(dto) {
  return axios.post(`/auth/login`, dto);
}
