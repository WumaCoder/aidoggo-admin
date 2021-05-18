<template>
  <base-content>
    <CRUD
      :form="form"
      :columns="columns"
      :onSelect="onSelect"
      :isGrid="true"
      :isCreateBtn="false"
    ></CRUD>
  </base-content>
</template>

<script>
import CRUD from "components/CRUD.vue";

const data = [
  {
    id: 1,
    userId: 1,
    url:
      "https://tse1-mm.cn.bing.net/th?id=OIP.VwLkptC1sSNfTehCroMy4AHaEo&w=153&h=100&c=8&rs=1&qlt=90&dpr=2&pid=3.1&rm=2",
    status: 1
  }
];
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
          name: "url",
          required: true,
          label: "图片",
          field: row => row.url,
          sortable: true,
          searchModify: "@Like"
        },

        {
          name: "type",
          required: true,
          label: "状态",
          field: row => (row.type ? "通过" : "未通过"),
          sortable: true,
          searchModify: "@Like",
          is: "q-chip"
        }
      ]
    };
  },
  methods: {
    async onSelect() {
      return {
        list: data,
        total: 13
      };
    }
  }
};
</script>

<style></style>
