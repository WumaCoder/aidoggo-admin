<template>
  <div>
    <q-btn-group spread>
      <q-btn color="red" @click="onNoPass" label="不通过" icon="do_disturb" />
      <q-btn color="green" @click="onPass" label="通过" icon="check_circle" />
    </q-btn-group>
  </div>
</template>

<script>
export default {
  props: {
    status: Number,
    onPass: Function,
    onNoPass: Function
  }
};
</script>
