<template>
  <div v-if="value.name">
    <div class="q-field__label q-mb-sm">{{ label }}</div>
    <q-card>
      <q-list>
        <q-item>
          <q-item-section>店铺名称</q-item-section>
          <q-item-section>{{value.name}}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>店铺介绍</q-item-section>
          <q-item-section>{{value.intr}}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>店铺分数</q-item-section>
          <q-item-section>{{value.openScore}}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>创始人</q-item-section>
          <q-item-section>{{value.founder}}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>所属产业</q-item-section>
          <q-item-section>{{value.industry}}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>店铺类型</q-item-section>
          <q-item-section>{{value.type}}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>店铺地址</q-item-section>
          <q-item-section>{{value.address}}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script>
// id
// name
// intr
// tags
// openScore
// founder
// industry
// type
// address
export default {
  props: {
    value: {
      type:Object,
      default: () => ({})
    },
    label: String
  },
  data() {
    return {};
  }
};
</script>
