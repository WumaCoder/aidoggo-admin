<template>
  <div v-if="value.length">
    <div class="q-field__label q-mb-sm">{{ label }}</div>
    <q-list>
      <q-item v-for="(item, index) in value" :key="index"  v-if="item.user">
        <q-item-section avatar top>
          <q-avatar color="primary" text-color="white" >
            <img :src="item.user.avatar" alt="">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{item.user.name}}</q-item-label>
          <q-item-label caption>{{item.user.username}}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon :name="status[item.status].icon" :color="status[item.status].color" />
        </q-item-section>
        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
          <strong>[投递消息] </strong>{{item.message || '没有消息'}} </br>
          <strong>[投递状态] </strong>{{item.status}} </br>
          <strong>[投递时间] </strong>{{(new Date(item.createdAt*1)).toLocaleString() }} </br>
          <strong>[变更时间] </strong>{{(new Date(item.updatedAt*1)).toLocaleString()}} </br>
        </q-tooltip>
      </q-item>
    </q-list>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type:String,
        default: ''
      },
      value: {
        type:Array,
        default: () => ([])
      }
    },
    data() {
      return {
        status:{
          PASS:{
            color:'green',
            icon:'done'
          },
          BE_BEING:{
            color:'yellow',
            icon:'schedule'
          },
          NO_PASS:{
            color:'red',
            icon:'block'
          }
        }
      }
    },
  }
</script>