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
    async onSelect(p) {
      return await this.$api.Config.gets(p).then(res => res.data);
    },
    async onUpdate(id, data) {
      return await this.$api.Config.update(id, data);
    },
    async onCreate(data) {
      return await this.$api.Config.create(data);
    },
    async onDelete(id) {
      return await this.$api.Config.del(id);
    }
  }
};
</script>

<style></style>
