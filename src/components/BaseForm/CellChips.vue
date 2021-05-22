<template>
  <span>
    <q-chip
      v-for="item in value"
      :key="item"
      dense
      :icon="icon"
      v-text="item"
    ></q-chip>
  </span>
</template>

<script>
export default {
  props: {
    value: Array,
    icon: String
  }
};
</script>

<style></style>
