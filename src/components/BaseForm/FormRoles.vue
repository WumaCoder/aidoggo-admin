<template>
  <div v-if="value">
    <form-multi-select
      :label="label"
      option-label="name"
      option-value="id"
      :asyncLoad="asyncLoad"
      v-model="tempVal"
      @add="add"
      @remove="remove"
    ></form-multi-select>
  </div>
</template>

<script>
import FormMultiSelect from "./FormMultiSelect";

export default {
  props: {
    value: Array,
    label: String,
    row: Object
  },
  components: { FormMultiSelect },
  data() {
    return {
      tempVal: []
    };
  },
  methods: {
    async asyncLoad() {
      const options = await this.$api.Role.gets({ page: "1:1000" }).then(res =>
        res.data.list.map(item => ({
          id: String(item.id),
          name: item.name
        }))
      );
      return options;
    },
    add(v) {
      this.$api.User.addRole(this.row.id, +v.value);
    },
    remove(v) {
      this.$api.User.delRole(this.row.id, +v.value);
    }
  },
  async created() {
    await this.$nextTick();
    this.tempVal.push(...(this.value || []).map(n => String(n.id)));
  }
};
</script>

<style></style>
