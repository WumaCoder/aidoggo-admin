<template>
  <div v-if="value">
    <component
      v-for="(item, key) in form"
      v-bind="item"
      :key="key"
      :is="item.is"
      :label="item.label"
      :src="value[key]"
      v-model="value[key]"
    >
    </component>
  </div>
</template>

<script>
import BaseForm from "./BaseForm";

export default {
  name: "FormBlock",
  components: BaseForm,
  props: {
    form: Object,
    columns: {
      type: Array,
      default: () => []
    },
    value: {}
  },
  methods: {
    findColumn(key) {
      return this.columns.find(item => item.name === key) || {};
    }
  }
};
</script>

<style></style>
