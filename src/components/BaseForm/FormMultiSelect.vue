<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-start ">
      <q-select
        class="full-width"
        filled
        :value="value"
        @input="$emit('input', $event)"
        use-chips
        :label="label"
        :options="tOptions"
        :option-label="optionLabel"
        :option-value="optionValue"
        :emit-value="true"
        :map-options="true"
        multiple
        :loading="loading"
        @virtual-scroll="onScrollBottom"
        @add="$emit('add', $event)"
        @remove="$emit('remove', $event)"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No Data
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: Array,
    asyncLoad: Function,
    options: Array,
    optionLabel: String,
    optionValue: String
  },
  data() {
    return {
      tOptions: this.options,
      loading: false
    };
  },

  methods: {
    async onScrollBottom(e) {
      this.loading = true;
      if (this.asyncLoad) {
        this.tOptions = await this.asyncLoad(e);
      }
      this.loading = false;
    }
  },
  mounted() {
    this.onScrollBottom();
  }
};
</script>
