<template>
  <q-form @submit="onSubmit" @reset="onResetFormData" class="q-gutter-md">
    <component
      v-for="(item, key) in form"
      :key="key"
      :name="item.name || key"
      :type="item.type"
      :is="item.is"
      :label="item.label || findColumn(key).label"
      :options="item.options"
      :filled="item.filled"
      :emit-value="item.emitValue"
      :map-options="item.mapOptions"
      :false-value="item.falseValue"
      :true-value="item.trueValue"
      :option-value="item.optionValue"
      :option-label="item.optionLabel"
      :disable="item.disable"
      :readonly="item.readonly"
      :ratio="item.ratio"
      :style="item.style"
      :placeholder-src="item.placeholderSrc"
      :spinner-color="item.spinnerColor"
      :src="imgSrc(formData[key])"
      :nodes="
        item.nodesFormat ? item.nodesFormat(formData[key]) : formData[key]
      "
      :node-key="item.nodeKey"
      :label-key="item.labelKey"
      :no-nodes-label="item.noNodesLabel"
      @click="item.is === 'q-img' && window.open(imgSrc(formData[key]))"
      v-model="formData[key]"
      :accept="item.accept"
      :dense="$q.screen.lt.md"
      :toolbar="[
        ['left', 'center', 'right', 'justify'],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
      :url="item.url + '?token=' + token"
      :headers="item.headers"
      field-name="image"
    >
      <template v-if="!item.disable && !item.readonly" v-slot:append>
        <q-icon
          v-if="formData[key] !== null"
          class="cursor-pointer"
          name="clear"
          @click.stop="formData[key] = null"
        />
      </template>
      <template v-slot:error>
        <div class="absolute-full flex flex-center bg-negative text-white">
          图片加载出错
        </div>
      </template>
      <template v-if="!item.spinnerColor" v-slot:loading>
        <div class="text-subtitle1">
          Loading...
        </div>
      </template>
    </component>
    <template v-if="showButton">
      <q-btn label="提交" type="submit" color="primary" />
      <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" />
    </template>
  </q-form>
</template>

<script>
import { mapGetters } from "vuex";
import Banner from "./BaseForm/Banner";
import FormUserInfo from "./BaseForm/FormUserInfo";
import FormShopInfo from "./BaseForm/FormShopInfo";
import FormRegisters from "./BaseForm/FormRegisters";
import FormRole from "./BaseForm/FormRole";
import FormList from "./BaseForm/FormList";

export default {
  props: {
    form: {
      type: Object,
      default: () => ({})
    },
    columns: {
      type: Array,
      default: () => []
    },
    showButton: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      formData: {},
      window: window
    };
  },
  components: {
    Banner,
    FormUserInfo,
    FormShopInfo,
    FormRegisters,
    FormRole,
    FormList
  },
  computed: { ...mapGetters(["token"]) },
  methods: {
    imgSrc(src) {
      src = String(src);
      if (!/^(http:|https:)/gim.test(src)) {
        return null;
      }
      if (/ttl-private/gim.test(src)) {
        return src;
      }
      return src + "?token=" + this.token;
    },
    onResetFormData(data = {}) {
      const keys = Object.keys(this.form);
      keys.forEach(key => {
        this.$set(this.formData, key, data[key]);
      });
    },
    onSubmit() {
      const keys = Object.keys(this.form);
      const temp = {};
      keys.forEach(key => {
        if (this.form[key].readonly) {
          return;
        }
        temp[key] = this.formData[key];
      });

      this.$emit("submit", temp);
      return temp;
    },
    findColumn(key) {
      return this.columns.find(item => item.name === key) || {};
    }
  },
  created() {
    this.onResetFormData();
  }
};
</script>
