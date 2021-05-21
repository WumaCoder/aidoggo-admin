<template>
  <base-content>
    <CRUD
      :form="form"
      :columns="columns"
      :onSelect="onSelect"
      :onUpdate="onUpdate"
      :onCreate="onCreate"
      :onDelete="onDelete"
      :isGrid="true"
    ></CRUD>
  </base-content>
</template>

<script>
import CRUD from "components/CRUD.vue";

export default {
  components: { CRUD },
  data() {
    return {
      form: {
        name: {
          is: "q-input",
          type: "text"
        },
        host: {
          is: "q-input",
          type: "url"
        },
        port: {
          is: "q-input",
          type: "url"
        },
        rpcPort: {
          is: "q-input",
          type: "url",
          label: "远程调用接口"
        },
        expose: {
          is: "q-input",
          type: "text",
          label: "暴露端口"
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
          name: "host",
          required: true,
          label: "地址",
          field: row => row.host,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "port",
          required: true,
          label: "端口",
          field: row => row.port,
          format: val => `${val}`,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "type",
          required: true,
          label: "类型",
          field: row => row.type,
          bindProps: row => ({ label: row.type === 0 ? "核心" : "业务" }),
          sortable: true,
          searchModify: "@Like",
          is: "q-chip"
        },
        {
          name: "image",
          required: true,
          label: "镜像",
          field: row => row.image,
          format: val => `${val || "-"}`,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "cid",
          required: true,
          label: "容器ID",
          field: row => row.cid,
          format: val => `${val || "-"}`,
          sortable: true,
          searchModify: "@Like"
        }
        // {
        //   name: "routes",
        //   required: true,
        //   label: "路由",
        //   field: row => row.routes,
        //   format: val => `点击查看(${val.length})`,
        //   searchModify: "@Like"
        // }
      ]
    };
  },
  methods: {
    async onSelect(p) {
      return await this.$api.Service.gets(p).then(res => res.data);
    },
    async onUpdate(id, data) {
      return await this.$api.Service.update(id, data);
    },
    async onCreate(data) {
      return await this.$api.Service.create(data);
    },
    async onDelete(id) {
      return await this.$api.Service.del(id);
    }
  }
};
</script>

<style></style>
