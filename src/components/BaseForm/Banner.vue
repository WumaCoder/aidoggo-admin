<template>
  <div>
    <div class="q-field__label q-mb-sm">{{ label }}</div>
    <q-carousel
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
    >
      <q-carousel-slide
        v-for="(item, index) in value" :key="index"
        :name="index"
        :img-src="item" 
        />
    </q-carousel>
  </div>
</template>
<script>
  export default {
    props: {
      label: {
        type:String,
        default: 'Banner'
      },
      value:{
        type:Array,
        default:()=>[]
      },
    },
    data() {
      return {
        slide: 0
      }
    }
  }
</script>