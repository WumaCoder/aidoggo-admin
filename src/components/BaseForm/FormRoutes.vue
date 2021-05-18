<template>
  <div v-if="value">
    <q-table
      title="路由"
      :columns="columns"
      :data="value"
      row-key="id"
      flat
      :hide-pagination="true"
    ></q-table>
  </div>
</template>

<script>
export default {
  props: {
    value: Object
  },
  data() {
    return {
      columns: [
        {
          name: "id",
          label: "ID",
          field: "id"
        },
        {
          name: "method",
          label: "类型",
          field: "method"
        },
        {
          name: "matched",
          label: "路由",
          field: "matched"
        }
      ]
    };
  }
};
</script>

<style></style>
