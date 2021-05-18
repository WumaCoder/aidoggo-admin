<template>
  <base-content>
    <CRUD
      :form="form"
      :columns="columns"
      :onSelect="onSelect"
      :isGrid="true"
    ></CRUD>
  </base-content>
</template>

<script>
import CRUD from "components/CRUD.vue";

const routes = [
  {
    id: 1,
    name: "AI服务",
    uri: "172.0.2.1",
    expose: "5000/tcp",
    type: 0,
    image: "serive-ai:1.0.0",
    cid: "adfaf7a8d7f89",
    routes: []
  },
  {
    id: 2,
    name: "Auth服务",
    uri: "172.0.2.1",
    expose: "6000/tcp",
    type: 0,
    image: "serive-auth:1.0.0",
    cid: "adfaf7a8d7f89",
    routes: [
      {
        id: 1,
        method: "GET",
        matched: "/login"
      },
      {
        id: 2,
        method: "GET",
        matched: "/login"
      },
      {
        id: 3,
        method: "GET",
        matched: "/login"
      }
    ]
  }
];
export default {
  components: { CRUD },
  data() {
    return {
      form: {
        name: {
          is: "q-input",
          type: "text"
        },
        uri: {
          is: "q-input",
          type: "url"
        },
        expose: {
          is: "q-input",
          type: "text"
        },
        image: {
          is: "q-input",
          type: "text"
        },
        routes: {
          is: "form-routes"
        },
        cid: {
          is: "form-docker-status"
        }
      },
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          field: row => row.id,
          format: val => `${val}`,
          sortable: true,
          searchModify: "@="
        },
        {
          name: "name",
          required: true,
          label: "名称",
          field: row => row.name,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "uri",
          required: true,
          label: "地址",
          field: row => row.uri,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "expose",
          required: true,
          label: "端口",
          field: row => row.expose,
          format: val => `${val}`,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "type",
          required: true,
          label: "类型",
          field: row => (row.type ? "业务" : "核心"),
          sortable: true,
          searchModify: "@Like",
          is: "q-chip"
        },
        {
          name: "image",
          required: true,
          label: "镜像",
          field: row => row.image,
          format: val => `${val}`,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "cid",
          required: true,
          label: "容器ID",
          field: row => row.cid,
          format: val => `${val}`,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "routes",
          required: true,
          label: "路由",
          field: row => row.routes,
          format: val => `点击查看(${val.length})`,
          searchModify: "@Like"
        }
      ]
    };
  },
  methods: {
    async onSelect() {
      return {
        list: routes,
        total: 13
      };
    }
  }
};
</script>

<style></style>
