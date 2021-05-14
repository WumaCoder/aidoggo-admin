<template>
  <div v-if="Object.keys(value).length">
    <div class="q-field__label q-mb-sm">{{ label }}</div>
    <q-markup-table
      v-for="(item, key) in checkboxValue"
      :key="key"
      class="q-mb-md"
      flat
      bordered
    >
      <thead>
        <tr>
          <th :colspan="Object.keys(item.fields).length">
            <div class="column items-start no-wrap">
              <div class="text-h5">{{ key }}</div>
              <div class="q-pr -sm" v-if="item">
                <q-checkbox @input="value[key].weight = onClick(item.values)" v-model="item.values.create" label="增" color="teal" />
                <q-checkbox @input="value[key].weight = onClick(item.values)"  v-model="item.values.select" label="查" color="cyan" />
                <q-checkbox @input="value[key].weight = onClick(item.values)"  v-model="item.values.update" label="改" color="orange" />
                <q-checkbox @input="value[key].weight = onClick(item.values)"  v-model="item.values.delete" label="删" color="red" />
              </div>
            </div>
          </th>
        </tr>
        <tr>
          <th
            class="text-center"
            v-for="(item, key) in item.fields"
            :key="key"
            v-text="key"
          ></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-center" v-for="(item, key1) in item.fields" :key="key1">
            <q-checkbox @input="value[key].fields[key1] = onClick(item)" v-model="item.create" label="增" color="teal" />
          </td>
        </tr>
        <tr>
          <td class="text-center" v-for="(item, key1) in item.fields" :key1="key1">
            <q-checkbox @input="value[key].fields[key1] = onClick(item)" v-model="item.select" label="查" color="cyan" />
          </td>
        </tr>
        <tr>
          <td class="text-center" v-for="(item, key1) in item.fields" :key1="key1">
            <q-checkbox @input="value[key].fields[key1] = onClick(item)" v-model="item.update" label="改" color="orange" />
          </td>
        </tr>
        <tr>
          <td class="text-center" v-for="(item, key1) in item.fields" :key1="key1">
            <q-checkbox @input="value[key].fields[key1] = onClick(item)" v-model="item.delete" label="删" color="red" />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
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
      type: Object,
      default: () => ({})
    },
    label: String
  },
  data() {
    return {
      checkboxValue: {},
      weights: [
        {
          operate: "create",
          value: 1
        },
        {
          operate: "select",
          value: 2
        },
        {
          operate: "update",
          value: 4
        },
        {
          operate: "delete",
          value: 8
        }
      ]
    };
  },
  methods: {
    /**
     * 权限值解析器
     * @param val number 权限值
     */
    weightParser(val) {
      const operates = {
        create: false,
        select: false,
        update: false,
        delete: false
      };
      const starts = this.weights.filter(({ value }) => value <= val);
      for (let i = 0; i < starts.length; i++) {
        const element = starts[starts.length - i - 1];
        val -= element.value;
        if (val >= 0) {
          operates[element.operate] = true;
        }
      }

      return operates;
    },
    findWeightValue(operate){
      return this.weights.find(item => item.operate == operate).value;
    },
    transformToWeight(operates){
      const keys = Object.keys(operates);
      return keys.reduce((total,key)=>{ 
        if(operates[key]){
          total += this.findWeightValue(key);
        }
        return total;
      },0);
    },
    onClick(v){
      return this.transformToWeight(v);
    }
  },
  async created() {
    await this.$nextTick();
    const value = this.value;
    const keys = Object.keys(value);
    keys.forEach(key => {
        const fieldValus = Object.keys(value[key].fields).reduce((obj,key1)=>{
        obj[key1] = this.weightParser(value[key].fields[key1]);
        return obj;
      },{});
      this.$set(this.checkboxValue,key, {values:this.weightParser(value[key].weight),fields:fieldValus})
    });
  }
};
</script>
