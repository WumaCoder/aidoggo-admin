<template>
  <q-card v-if="value" class="my-card" flat bordered>
    <q-card-section horizontal>
      <q-card-section style="width:100%">
        <q-list bordered separator>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>容器ID</q-item-label>
              <q-item-label caption>{{ value }}</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label>运行状态</q-item-label>
              <q-item-label caption>Running</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>端口映射</q-item-label>
              <q-item-label caption
                >IP: '0.0.0.0', PrivatePort: 3000, PublicPort: 3000, Type:
                'tcp'</q-item-label
              >
              <q-item-label caption
                >IP: '::', PrivatePort: 3000, PublicPort: 3000, Type: 'tcp'
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section>
              <q-item-label>运行时间</q-item-label>
              <q-item-label caption>11分钟</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions vertical class="justify-around q-px-md">
        <q-btn flat round color="primary" icon="play_arrow" />
        <q-btn flat round color="red" icon="stop" />
        <q-btn flat round color="accent" icon="restart_alt" />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    value: String
  },
  data() {
    return {};
  }
};
</script>

<style></style>
