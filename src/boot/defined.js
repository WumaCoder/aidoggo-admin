import { DefEnum } from "../utils/enum";
import api from "../api";
// import something here

export const Sex = DefEnum(["未知", "男", "女"]);

export const RouteMethod = DefEnum([
  "GET",
  "HEAD",
  "POST",
  "PUT",
  "DELETE",
  "CONNECT",
  "OPTIONS",
  "TRACE",
  "PATCH"
]);

export const RouteProtocol = DefEnum(["HTTP", "WS"]);

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ Vue } /* {"app","router", Vue ... } */) => {
  // something to do
  Vue.prototype.$Sex = Sex;
  Vue.prototype.$RouteMethod = RouteMethod;
  Vue.prototype.$RouteProtocol = RouteProtocol;
  Vue.prototype.$api = api;
};
