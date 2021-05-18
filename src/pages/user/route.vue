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
import { toQSelectOptions } from "../../utils/enum";
import CRUD from "components/CRUD.vue";

const routes = [
  {
    id: 1,
    protocol: "0",
    method: "1",
    matched: "/user",
    type: 0,
    description: "获取用户"
  },
  {
    id: 2,
    protocol: "0",
    method: 1,
    matched: "/user",
    type: 0,
    description: "获取用户"
  },
  {
    id: 3,
    protocol: 0,
    method: 1,
    matched: "/user",
    type: 1,
    description: "获取用户"
  },
  {
    id: 4,
    protocol: 0,
    method: 1,
    matched: "/user",
    type: 0,
    description: "获取用户"
  }
];

export default {
  components: { CRUD },
  data() {
    return {
      form: {
        protocol: {
          is: "q-select",
          emitValue: true,
          mapOptions: true,
          default: "0",
          options: toQSelectOptions(this.$RouteProtocol)
        },
        method: {
          is: "q-select",
          emitValue: true,
          mapOptions: true,
          default: "0",
          options: toQSelectOptions(this.$RouteMethod)
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
          bindProps: row => ({ label: row.type === 0 ? "服务" : "页面" }),
          sortable: true,
          searchModify: "@Like",
          is: "q-chip"
        },
        {
          name: "protocol",
          required: true,
          label: "协议",
          field: row => row.protocol,
          format: val => `${this.$RouteProtocol[val]}`,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "method",
          required: true,
          label: "类型",
          field: row => row.method,
          format: val => `${this.$RouteMethod[val]}`,
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
