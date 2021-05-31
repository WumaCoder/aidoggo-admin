import { getPostUrl, getDownUrl } from "../api/Minio.js";
import parse from "url-parse";

export async function getUploadUrl(fileName) {
  const data = await getPostUrl(fileName).then(res => res.data);
  return data;
}

export async function getImageUrl(pathUrl) {
  const url = parse(pathUrl);

  const [isMinioImage, , fileName, ext] =
    url.pathname.match(/\/([\w\d]+)\/([\w\d]+)(\.[\w\d]+)$/) || [];

  if (!isMinioImage) {
    return pathUrl;
  }

  const data = await getDownUrl(fileName + ext).then(res => res.data);
  return data;
}

export async function multiTransfromUrl(images, key = "url") {
  for (let i = 0; i < images.length; i++) {
    images[i][key] = await getImageUrl(images[i][key]);
  }
}
