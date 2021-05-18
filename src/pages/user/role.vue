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

const res = [
  {
    id: 1,
    name: "admin",
    description: "管理员",
    rejectIds: [2, 3],
    routes: [1]
  },
  {
    id: 2,
    name: "user",
    description: "用户",
    rejectIds: [],
    routes: []
  },
  {
    id: 3,
    name: "user1",
    description: "用户1",
    rejectIds: [1],
    routes: []
  }
];

const routes = [
  {
    id: 1,
    protocol: 0,
    method: 1,
    matched: "/user",
    description: "获取用户"
  },
  {
    id: 2,
    protocol: 0,
    method: 1,
    matched: "/user",
    description: "获取用户"
  },
  {
    id: 3,
    protocol: 0,
    method: 1,
    matched: "/user",
    description: "获取用户"
  },
  {
    id: 4,
    protocol: 0,
    method: 1,
    matched: "/user",
    description: "获取用户"
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
        description: {
          is: "q-input",
          type: "text"
        },
        rejectIds: {
          is: "form-multi-select",
          optionLabel: "name",
          optionValue: "id",
          async asyncLoad() {
            res.push({ id: 1, name: "t" });
            return res;
          }
        },
        routes: {
          is: "form-multi-select",
          optionLabel: "label",
          optionValue: "id",
          async asyncLoad() {
            return routes.map(n => {
              const p = this.$RouteProtocol[n.protocol];
              const m = this.$RouteMethod[n.method];
              const r = n.matched;
              n.label = `${p} ${m}${r}`;
              return n;
            });
          }
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
          label: "角色",
          field: row => row.name,
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
        },
        {
          name: "rejectIds",
          required: true,
          label: "互斥角色",
          field: row =>
            row.rejectIds
              .map(id => res.find(role => id === role.id))
              .map(role => role.name),
          format: val => val,
          is: "form-chips"
        },
        {
          name: "routes",
          required: true,
          label: "权限路由",
          field: row => row.routes,
          format: val => `点击详细(${val.length})`
        }
      ]
    };
  },
  methods: {
    async onSelect() {
      return {
        list: res,
        total: 13
      };
    }
  }
};
</script>

<style></style>
