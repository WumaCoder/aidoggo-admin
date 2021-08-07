<template>
  <div v-if="value">
    <q-toggle label="是否公开" v-model="value.isPublic" color="green" />
    <q-toggle
      label="是否显示信息（电子邮箱、姓名、性别）"
      v-model="value.isShowInfo"
      color="red"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: Object
  },
  created() {
    if (!this.value) {
      this.$emit("input", { isPublic: false, isShowInfo: true });
    }
  }
};
</script>

<style></style>
