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
      :isCreateBtn="false"
    ></CRUD>
  </base-content>
</template>

<script>
import CRUD from "components/CRUD.vue";

export default {
  components: { CRUD },
  data() {
    return {
      form: {},
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
          name: "userId",
          required: true,
          label: "用户",
          field: row => row.userId,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "status",
          required: true,
          label: "状态",
          field: row => this.$Status[row.discern.status],
          sortable: true
        },
        {
          name: "url",
          required: true,
          label: "图片",
          bindProps: row => ({
            value: row.url,
            style: { width: "100%", height: "200px" }
          }),
          is: "cell-image"
        },
        {
          name: "status-btns",
          required: true,
          bindProps: row => ({
            status: row.discern.status,
            onPass: () => {
              this.$api.Discern.update(row.discern.id, { status: 2 });
              row.discern.status = 2;
            },
            onNoPass: () => {
              this.$api.Discern.update(row.discern.id, { status: 3 });
              row.discern.status = 3;
            }
          }),
          sortable: true,
          searchModify: "@Like",
          is: "cell-btns"
        }
      ]
    };
  },
  methods: {
    async onSelect(p) {
      return await this.$api.Image.gets(p).then(res => res.data);
    },
    async onUpdate(id, data) {
      return await this.$api.Image.update(id, data);
    },
    async onCreate(data) {
      return await this.$api.Image.create(data);
    },
    async onDelete(id) {
      return await this.$api.Image.del(id);
    }
  }
};
</script>

<style></style>
