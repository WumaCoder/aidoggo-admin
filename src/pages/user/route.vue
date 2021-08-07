<template>
  <base-content>
    <CRUD
      :form="form"
      :columns="columns"
      :onSelect="onSelect"
      :onUpdate="onUpdate"
      :onCreate="onCreate"
      :onDelete="onDelete"
      :isGrid="false"
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
        protocol: {
          is: "q-select",
          default: "http",
          options: ["http", "ws"]
        },
        method: {
          is: "q-select",
          emitValue: false,
          mapOptions: false,
          default: "get",
          options: ["get", "post", "delete", "put"]
        },
        matched: {
          is: "q-input",
          type: "url"
        },
        description: {
          is: "q-input",
          type: "text"
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
          name: "type",
          required: true,
          label: "类别",
          bindProps: row => ({ label: row.type === 0 ? "Router" : "API" }),
          sortable: true,
          searchModify: "@Like",
          is: "q-chip"
        },
        {
          name: "protocol",
          required: true,
          label: "协议",
          field: row => row.protocol,
          format: val => `${val}`,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "method",
          required: true,
          label: "类型",
          field: row => row.method,
          format: val => `${val}`,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "matched",
          required: true,
          label: "路由",
          field: row => row.matched,
          format: val => `${val}`,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "description",
          required: true,
          label: "描述",
          field: row => row.description,
          format: val => `${val}`,
          sortable: true,
          searchModify: "@Like"
        }
      ]
    };
  },
  methods: {
    async onSelect(p) {
      return await this.$api.Router.gets(p).then(res => res.data);
    },
    async onUpdate(id, data) {
      return await this.$api.Router.update(id, data);
    },
    async onCreate(data) {
      return await this.$api.Router.create(data);
    },
    async onDelete(id) {
      return await this.$api.Router.del(id);
    }
  }
};
</script>

<style></style>
