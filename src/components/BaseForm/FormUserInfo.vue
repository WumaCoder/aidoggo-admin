<template>
  <div v-if="value.name">
    <div class="q-field__label q-mb-sm">{{ label }}</div>
    <q-card>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img :src="value.avatar" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ value.name }}<q-badge :color="(value.gender == '男' ? 'blue' : 'pink')">{{value.gender}}</q-badge> </q-item-label>
          <q-item-label caption>{{value.username}}</q-item-label>
        </q-item-section>
      </q-item>
      <q-list>
        <q-item>
          <q-item-section>手机号</q-item-section>
          <q-item-section>{{value.phone}}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>微信号</q-item-section>
          <q-item-section>{{value.wx}}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>邮箱</q-item-section>
          <q-item-section>{{value.email}}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type:Object,
      default:()=>({})
    },
    label: String
  },
  data() {
    return {};
  }
};
</script>
