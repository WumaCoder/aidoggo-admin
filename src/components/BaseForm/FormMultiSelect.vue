<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-start ">
      <q-select
        class="full-width"
        filled
        v-model="value"
        use-chips
        :label="label"
        :options="options"
        :option-label="optionLabel"
        :option-value="optionValue"
        :emit-value="true"
        :map-options="true"
        multiple
        :loading="loading"
        @virtual-scroll="onScrollBottom"
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
    optionLabel: String,
    optionValue: String
  },
  data() {
    return {
      options: [],
      loading: false
    };
  },

  methods: {
    async onScrollBottom(e) {
      this.loading = true;
      if (this.asyncLoad) {
        this.options = await this.asyncLoad(e);
      }
      this.loading = false;
    }
  },
  mounted() {
    this.onScrollBottom();
  }
};
</script>
