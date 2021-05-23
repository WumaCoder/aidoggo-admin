import { DefEnum } from "../utils/enum";
import api from "../api";
// import something here

export const ServiceType = DefEnum(["核心", "业务", "中心"]);

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ Vue } /* {"app","router", Vue ... } */) => {
  // something to do
  Vue.prototype.$ServiceType = ServiceType;
  Vue.prototype.$api = api;
};
