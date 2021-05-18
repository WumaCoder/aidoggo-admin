import BaseContent from "components/BaseContent/BaseContent";

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({ Vue } /* { app, router, Vue ... } */) => {
  // something to do
  Vue.component("BaseContent", BaseContent);
};
