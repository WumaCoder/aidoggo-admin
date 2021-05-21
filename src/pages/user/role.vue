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
            return await this.$api.Role.gets({ page: "1:1000" }).then(res =>
              res.data.list.map(item => ({
                id: String(item.id),
                name: item.name
              }))
            );
          }
        },
        routers: {
          is: "form-multi-select",
          optionLabel: "description",
          // optionValue: "id",
          async asyncLoad() {
            const routes = await this.$api.Service.getRoutes().then(
              res => res.data
            );
            return routes.map(n => {
              n.id = String(n.id);
              delete n.service;
              const p = (n.protocol = "http");
              const m = n.method;
              const r = n.matched;
              n.description = `${p} ${m}${r}`;
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
          field: row => row.rejectIds,
          format: val => `(${val.length || "0"})`
          // is: "form-chips"
        },
        {
          name: "routers",
          required: true,
          label: "权限路由",
          field: row => row.routers,
          format: val => `点击详细(${val.length})`
        }
      ]
    };
  },
  methods: {
    async onSelect(p) {
      return await this.$api.Role.gets(p).then(res => res.data);
    },
    async onUpdate(id, data) {
      return await this.$api.Role.update(id, data);
    },
    async onCreate(data) {
      return await this.$api.Role.create(data);
    },
    async onDelete(id) {
      return await this.$api.Role.del(id);
    }
  }
};
</script>

<style></style>
