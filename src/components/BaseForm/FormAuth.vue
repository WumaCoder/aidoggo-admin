<template>
  <div v-if="value">
    <template v-if="value.local">
      <q-input label="用户名" v-model="value.local.username" />
      <q-input label="密码" v-model="value.local.password" />
    </template>
    <template v-if="value.weapp">
      <q-input label="OpenId" v-model="value.weapp.openId" />
      <q-input label="SessionKey" v-model="value.weapp.sessionKey" />
    </template>
  </div>
</template>

<script>
export default {
  name: "FormAuth",
  props: {
    value: Object
  },
  data() {
    return {};
  },
  created() {
    if (!this.value) {
      this.$emit("input", {
        local: {
          username: "",
          password: ""
        }
      });
    }
  }
};
</script>

<style></style>
