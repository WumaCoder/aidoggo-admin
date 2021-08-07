<template>
  <div @click="onClick">
    <q-field :label="label">
      <template v-slot:control>
        <q-img style="width:100%;height:300px;" :src="imageUrl" />
      </template>
    </q-field>
    <q-dialog v-model="isOpen">
      <q-uploader
        style="max-width: 300px"
        :url="tempUrl"
        :form-fields="formFields"
        label="上传图片"
        accept=".jpg, .png, image/*"
        @finish="onFinish"
      />
    </q-dialog>
  </div>
</template>

<script>
import { getUploadUrl, getImageUrl } from "../../utils/image";
export default {
  props: {
    value: String,
    label: String,
    changeble: Boolean
  },
  data() {
    return {
      isOpen: false,
      tempUrl: "",
      formFields: [],
      resultUrl: "",
      imageUrl: ""
    };
  },
  methods: {
    async onClick() {
      if (!this.changeble) {
        return;
      }
      this.formFields = [];
      this.isOpen = true;
      const uploader = await getUploadUrl(Date.now() + ".jpg");
      this.formFields = files => [
        ...toFormField(uploader.formData),
        { name: "file", value: files[0] }
      ];

      this.tempUrl = uploader.postURL;
      this.resultUrl = this.tempUrl + "/" + uploader.formData.key;
    },
    async onFinish() {
      this.imageUrl = await getImageUrl(this.resultUrl);
      this.$emit("input", this.resultUrl);
    }
  },
  async created() {
    await this.$nextTick();
    this.imageUrl = await getImageUrl(this.value);
  }
};

function toFormField(formData) {
  const temp = [];
  const keys = Object.keys(formData);
  keys.forEach(key => {
    temp.push({
      name: key,
      value: formData[key]
    });
  });
  return temp;
}
</script>

<style></style>
