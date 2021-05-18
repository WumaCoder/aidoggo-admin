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
    sendUserId: 1,
    targetUserId: 2,
    type: 1,
    title: "用户反馈",
    body: "非常好用",
    createdAt: "2021-01-22 22:33:00"
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
        type: {
          is: "q-input",
          type: "text"
        },
        tags: {
          is: "q-input",
          type: "text"
        },
        url: {
          is: "q-input",
          type: "text",
          label: "图片地址"
        },
        description: {
          is: "q-input",
          type: "textarea",
          label: "内容"
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
          label: "标题",
          field: row => row.name,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "tags",
          required: true,
          label: "标签",
          field: row => row.tags,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "type",
          required: true,
          label: "类型",
          field: row => (row.type ? "用户" : "识别"),
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "createdAt",
          required: true,
          label: "创建时间",
          field: row => row.createdAt,
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
