<template>
  <q-form @submit="onSubmit" @reset="onResetFormData" class="q-gutter-md">
    <component
      v-for="(item, key) in form"
      v-bind="item"
      :key="key"
      :is="item.is"
      :label="item.label || findColumn(key).label"
      :src="formData[key]"
      v-model="formData[key]"
      @input="$emit('change', $event, key, formData)"
    >
    </component>
    <template v-if="showButton">
      <q-btn label="提交" type="submit" color="primary" />
      <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" />
    </template>
  </q-form>
</template>

<script>
import { mapGetters } from "vuex";
import BaseForm from "./BaseForm";

export default {
  name: "FormBox",
  props: {
    form: {
      type: Object,
      default: () => ({})
    },
    columns: {
      type: Array,
      default: () => []
    },
    showButton: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      formData: {},
      window: window
    };
  },
  components: {
    ...BaseForm
  },
  computed: { ...mapGetters(["token"]) },
  methods: {
    onResetFormData(data = {}) {
      const keys = Object.keys(this.form);
      keys.forEach(key => {
        this.$set(this.formData, key, data[key] ?? this.form[key].default);
      });
    },
    onSubmit() {
      const keys = Object.keys(this.form);
      const temp = {};
      keys.forEach(key => {
        if (this.form[key].readonly) {
          return;
        }
        temp[key] = this.formData[key];
      });

      this.$emit("submit", temp);
      return temp;
    },
    findColumn(key) {
      return this.columns.find(item => item.name === key) || {};
    }
  },
  created() {
    this.onResetFormData();
  }
};
</script>
