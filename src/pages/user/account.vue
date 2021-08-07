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
        avatar: {
          is: "form-avatar",
          size: "100px",
          changeble: true
        },
        id: {
          is: "q-input",
          label: "ID",
          readonly: true
        },
        email: {
          is: "q-input",
          type: "email"
        },
        nick: {
          is: "q-input",
          type: "text"
        },
        name: {
          is: "q-input",
          type: "text",
          label: "姓名"
        },
        sex: {
          is: "q-select",
          default: "未知",
          options: ["未知", "男", "女"]
        },
        auth: {
          is: "form-auth"
        },
        roles: {
          is: "form-roles"
        },
        setting: {
          is: "form-setting"
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
          name: "avatar",
          required: true,
          label: "画像",
          field: row => row.avatar,
          format: val => `${val}`,
          is: "form-avatar"
        },
        {
          name: "nick",
          required: true,
          label: "昵称",
          field: row => row.nick,
          format: val => `${val}`,
          sortable: true,
          searchModify: "@="
        },
        {
          name: "name",
          required: true,
          label: "姓名",
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
          searchModify: "@="
        },
        {
          name: "email",
          required: true,
          label: "邮箱",
          field: row => row.email,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "sex",
          required: true,
          label: "性别",
          field: row => row.sex,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "auth",
          required: true,
          label: "绑定方式",
          field: row => row.auth,
          format: val => `${this.bindAuth(val).join(" ")}`
        },
        {
          name: "createdAt",
          required: true,
          label: "创建时间",
          field: row => row.createdAt,
          format: val => `${val}`
        },
        {
          name: "updatedAt",
          required: true,
          label: "更新时间",
          field: row => row.updatedAt,
          format: val => `${val}`
        }
      ]
    };
  },
  methods: {
    async onSelect(p) {
      return await this.$api.User.gets(p).then(res => res.data);
    },
    async onUpdate(id, data) {
      return await this.$api.User.update(id, data);
    },
    async onCreate(data) {
      return await this.$api.User.create(data);
    },
    async onDelete(id) {
      return await this.$api.User.del(id);
    },
    bindAuth(auth) {
      return [auth.local ? "本地" : "", auth.weapp ? "微信" : ""];
    }
  }
};
</script>

<style></style>
