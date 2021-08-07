<template>
  <div v-if="value.length">
    <div class="q-field__label q-mb-sm">{{ label }}</div>
    <q-card>
        <q-item v-for="(item, index) in value" :key="index">
          <q-item-section><q-input borderless v-model="item.time">
            <template v-slot:prepend>
              <q-icon name="event" color="orange" />
            </template>
          </q-input></q-item-section>
          <q-item-section><q-input borderless v-model="item.event">
            <template v-slot:prepend>
              <q-icon name="ti-alert" color="green" />
            </template>
          </q-input></q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type:Array,
      default:()=>([])
    },
    label: String
  },
  data() {
    return {};
  }
};
</script>
