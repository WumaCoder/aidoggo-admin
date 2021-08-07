<template>
  <q-img :src="imageUrl"></q-img>
</template>

<script>
import { getImageUrl } from "../../utils/image";
export default {
  props: {
    value: String
  },
  data() {
    return {
      imageUrl: ""
    };
  },
  async created() {
    this.imageUrl = await getImageUrl(this.value);
  }
};
</script>
