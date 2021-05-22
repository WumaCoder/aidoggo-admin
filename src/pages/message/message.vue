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
        sendUserId: {
          is: "q-input",
          type: "text"
        },
        targetUserId: {
          is: "q-input",
          type: "text"
        },
        title: {
          is: "q-input",
          type: "text"
        },
        type: {
          is: "q-select",
          type: "text",
          options: ["普通消息", "公共消息"]
        },
        body: {
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
          name: "sendUserId",
          required: true,
          label: "发送用户ID",
          field: row => row.sendUserId,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "targetUserId",
          required: true,
          label: "目标用户ID",
          field: row => row.targetUserId,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "type",
          required: true,
          label: "类型",
          field: row => row.type,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "title",
          required: true,
          label: "标题",
          field: row => row.title,
          sortable: true,
          searchModify: "@Like"
        },
        {
          name: "createdAt",
          required: true,
          label: "发送时间",
          field: row => row.createdAt,
          sortable: true,
          searchModify: "@Like"
        }
      ]
    };
  },
  methods: {
    async onSelect(p) {
      return await this.$api.Message.gets(p).then(res => res.data);
    },
    async onUpdate(id, data) {
      return await this.$api.Message.update(id, data);
    },
    async onCreate(data) {
      return await this.$api.Message.create(data);
    },
    async onDelete(id) {
      return await this.$api.Message.del(id);
    }
  }
};
</script>

<style></style>
