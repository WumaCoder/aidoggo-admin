<template>
  <q-avatar :size="size">
    <img :src="value" />
  </q-avatar>
</template>

<script>
export default {
  props: {
    value: String,
    size: String
  }
};
</script>

<style></style>
