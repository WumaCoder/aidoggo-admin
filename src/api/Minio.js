import axios from "../axios/AxiosConfig";

export function getPostUrl(fileName) {
  return axios.get("/uploadUrl", {
    params: {
      fileName
    }
  });
}

export function getPutUrl(fileName) {
  return axios.get(`/putUrl`, { params: { fileName } });
}

export function getDownUrl(fileName) {
  return axios.get("/downUrl", {
    params: {
      fileName
    }
  });
}
