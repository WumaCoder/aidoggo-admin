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
        type: {
          is: "q-input",
          type: "text"
        },
        tags: {
          is: "form-chips"
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
          searchModify: "@Like",
          is: "cell-chips"
        },
        {
          name: "type",
          required: true,
          label: "类型",
          field: row => row.type,
          sortable: true,
          searchModify: "@Like"
        }
        // {
        //   name: "createdAt",
        //   required: true,
        //   label: "创建时间",
        //   field: row => row.createdAt,
        //   sortable: true,
        //   searchModify: "@Like"
        // },
        // {
        //   name: "updatedAt",
        //   required: true,
        //   label: "更新时间",
        //   field: row => row.updatedAt,
        //   sortable: true,
        //   searchModify: "@Like"
        // }
      ]
    };
  },
  methods: {
    async onSelect(p) {
      return await this.$api.Material.gets(p).then(res => res.data);
    },
    async onUpdate(id, data) {
      return await this.$api.Material.update(id, data);
    },
    async onCreate(data) {
      return await this.$api.Material.create(data);
    },
    async onDelete(id) {
      return await this.$api.Material.del(id);
    }
  }
};
</script>

<style></style>
