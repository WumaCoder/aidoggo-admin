import { DefEnum } from "../utils/enum";
import api from "../api";
// import something here

export const ServiceType = DefEnum(["核心", "业务", "中心"]);
export const Status = DefEnum([
  "正在自动审核",
  "正在手动审核",
  "审核通过",
  "审核未通过",
  "正在识别",
  "识别成功",
  "识别失败"
]);

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ Vue } /* {"app","router", Vue ... } */) => {
  // something to do
  Vue.prototype.$ServiceType = ServiceType;
  Vue.prototype.$Status = Status;
  Vue.prototype.$api = api;
};
