<template>
  <div class="q-pa-ms">
    <q-field :label="label" stack-label>
      <template v-slot:control>
        <div class="self-center full-width no-outline" tabindex="0">
          <q-chip
            v-for="(item, index) in value"
            :key="index"
            :icon="icon"
            :value="true"
            :removable="true"
            @remove="del(index)"
            >{{ item }}</q-chip
          >
          <span class="cursor-pointer">
            <q-btn round size="sm" color="primary" icon="control_point" />
            <q-popup-edit v-model="tVal">
              <!-- <q-input v-model="tVal" dense autofocus counter /> -->
              <template
                v-slot="{
                  initialValue,
                  value,
                  emitValue
                }"
              >
                <q-input
                  autofocus
                  dense
                  :value="tVal"
                  hint="请输入标签"
                  :rules="[val => validate(tVal) || '不能为空']"
                  @input="emitValue"
                >
                  <template v-slot:after>
                    <q-btn
                      flat
                      dense
                      color="positive"
                      icon="check_circle"
                      @click.stop="add(value)"
                      :disable="validate(value) === false"
                    />
                  </template>
                </q-input>
              </template>
            </q-popup-edit>
          </span>
        </div>
      </template>
    </q-field>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: Array,
    icon: String
  },
  data() {
    return {
      tVal: "",
      tBool: true
    };
  },
  methods: {
    add(value) {
      const t = [...this.value];
      t.push(value);
      this.$emit("input", t);
    },
    del(index) {
      const t = [...this.value];
      t.splice(index, 1);
      this.$emit("input", t);
    },
    validate(value) {
      return value !== "";
    }
  }
};
</script>

<style></style>
