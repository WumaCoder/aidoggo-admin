import { getPostUrl, getDownUrl } from "../api/Minio.js";
import parse from "url-parse";

export async function getUploadUrl(fileName) {
  const data = await getPostUrl(fileName).then(res => res.data);
  return data;
}

export async function getImage(pathUrl) {
  const url = parse(pathUrl);

  const [, , fileName, ext] = url.pathname.match(
    /\/([\w\d]+)\/([\w\d]+)(\.[\w\d]+)$/
  );
  console.log(fileName, ext);
  const data = await getDownUrl(fileName + ext).then(res => res.data);
  return data;
}
