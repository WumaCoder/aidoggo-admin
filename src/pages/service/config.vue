<template>
  <base-content>
    <CRUD
      :form="form"
      :columns="columns"
      :onSelect="onSelect"
      :isGrid="false"
    ></CRUD>
  </base-content>
</template>

<script>
import CRUD from "components/CRUD.vue";

const routes = [
  {
    id: 1,
    name: "AUTH_SERVICE_PORT",
    value: "3306",
    type: 1,
    description: "认证服务端口"
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
        value: {
          is: "q-input",
          type: "text"
        },
        type: {
          is: "q-input",
          type: "text"
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
          name: "name",
          required: true,
          label: "键",
          field: row => row.name,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "value",
          required: true,
          label: "值",
          field: row => row.value,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "type",
          required: true,
          label: "类型",
          field: row => (row.type ? "动态" : "环境"),
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "description",
          required: true,
          label: "描述",
          field: row => row.description,
          sortable: true,
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
