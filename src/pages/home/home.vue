<template>
  <base-content>
    <div class="container q-pa-lg q-col-gutter-md">
      <div class="row justify-between q-col-gutter-md">
        <div class="col-xs-12 col-md-3 q-gutter-md">
          <q-card class="income ">
            <q-card-section horizontal>
              <q-card-section class="col">
                <div class="text-subtitle2 text-white">
                  新增用户
                </div>
                <div class="text-h6 q-mt-sm q-mb-xs text-white">
                  <countTo :startVal="1" :endVal="1" :duration="1500" />
                </div>
              </q-card-section>
              <q-card-section class="col">
                <div style="height: 100%;max-width: 150px">
                  <v-chart :options="income" />
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
          <q-card class="expense ">
            <q-card-section horizontal>
              <q-card-section class="col">
                <div class="text-subtitle2 text-white">
                  活跃用户
                </div>
                <div class="text-h6 q-mt-sm q-mb-xs text-white">
                  <countTo :startVal="1" :endVal="10" :duration="1500" />
                </div>
              </q-card-section>
              <q-card-section class="col">
                <div style="height: 100%;width: 150px">
                  <v-chart :options="expense" />
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
          <q-card class="total ">
            <q-card-section horizontal>
              <q-card-section class="col">
                <div class="text-subtitle2 text-white">
                  所有用户
                </div>
                <div class="text-h6 q-mt-sm q-mb-xs text-white">
                  <countTo :startVal="1" :endVal="11" :duration="1500" />
                </div>
              </q-card-section>
              <q-card-section class="col">
                <div style="height: 100%;width: 150px">
                  <v-chart class="" :options="total" />
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12 col-md-9">
          <q-card
            class="cimo-shadow col-11"
            style="height: 100%;min-height:390px;padding: 3px;"
          >
            <v-chart class="" :options="charts2Option" autoresize />
          </q-card>
        </div>
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-xs-12 col-md-3">
          <q-card
            class="cimo-shadow"
            style="height: 430px; width: 100%; padding: 3px"
          >
            <v-chart class="" :options="chartPie" autoresize />
          </q-card>
        </div>
        <div class="col-xs-12 col-md-3">
          <q-card
            class="cimo-shadow"
            style="height: 430px; width: 100%; padding: 3px"
          >
            <v-chart class="" :options="chartPiePhone" autoresize />
          </q-card>
        </div>
        <div class="col-xs-12 col-md-6">
          <q-card
            class="cimo-shadow text-center"
            style="height: 430px; width: 100%; padding: 3px"
          >
          <div class="q-pa-md">
            <q-table
              title="日志"
              :data="data"
              :columns="columns"
              row-key="name"
            />
          </div>
          </q-card>
        </div>
      </div>
    </div>
  </base-content>
</template>

<script>
import countTo from 'vue-count-to'
import BaseContent from '../../components/BaseContent/BaseContent'
import { thumbStyle } from 'components/BaseContent/ThumbStyle'
import chartPie from '../../assets/js/echarts-1'
import chartPiePhone from '../../assets/js/echarts-phone'
import chartPieSex from '../../assets/js/echarts-sex'
import chartPieAge from '../../assets/js/echarts-age'
import charts2Option from '../../assets/js/echarts-2'
import { income, expense, total } from '../../assets/js/echarts-3'
import chartZ from '../../assets/js/echarts-4'

export default {
  name: 'home',
  components: {
    BaseContent,
    countTo
  },
  data () {
    return {
      chartPiePhone,
      chartPieSex,
      chartPieAge,
      expanded: false,
      chartPie,
      chartZ,
      charts2Option,
      income,
      expense,
      total,
      thumbStyle,
      lorem:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      filter: '',
      columns: [
        {
          name: 'createdAt',
          label: '时间',
          field: 'createdAt'
        },
        {
          name: 'message',
          label: '消息',
          field: 'message'
        },
        {
          name: 'level',
          label: '级别',
          field: 'level'
        },
        {
          name: 'loc',
          label: '位置',
          field: 'loc'
        }
      ],
      data: [
        {
          createdAt: new Date(Date.now() + 2*Math.floor(Math.random() * 1000)).toLocaleString(),
          message: '管理员登录',
          level: 1,
          loc: '/login'
        },
        {
          createdAt: new Date(Date.now() + 2*Math.floor(Math.random() * 1000)).toLocaleString(),
          message: '管理员登录',
          level: 1,
          loc: '/login'
        },
        {
          createdAt: new Date(Date.now() + 2*Math.floor(Math.random() * 1000)).toLocaleString(),
          message: '管理员登录',
          level: 1,
          loc: '/login'
        },
        {
          createdAt: new Date(Date.now() + 2*Math.floor(Math.random() * 1000)).toLocaleString(),
          message: '管理员登录',
          level: 1,
          loc: '/login'
        },
        {
          createdAt: new Date(Date.now() + 2*Math.floor(Math.random() * 1000)).toLocaleString(),
          message: '管理员登录',
          level: 1,
          loc: '/login'
        },
        {
          createdAt: new Date(Date.now() + 2*Math.floor(Math.random() * 1000)).toLocaleString(),
          message: '管理员登录',
          level: 1,
          loc: '/login'
        },
        {
          createdAt: new Date(Date.now() + 2*Math.floor(Math.random() * 1000)).toLocaleString(),
          message: '管理员登录',
          level: 1,
          loc: '/login'
        },
      ]
    }
  },
  methods: {
    handleTableClick (e) {
      this.$router.push({
        path: 'tableDetail',
        query: {
          id: e.name
        }
      })
    }
  }
}
</script>
<style lang="css" scoped>
.my-card {
  width: 100%;
  min-height: 390px;
  height: 100%;
  /*max-width: 350px;*/
}

.income {
  width: 100%;
  background: linear-gradient(to right, #68e4bc 0%, #4ad0d1 99%);
  border-radius: 5px;
  font-size: 14px;
  padding: 11px 15px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #ffffff;
  box-shadow: 0 12px 12px -11px #0db4afb8;
  background-size: 200% auto;
}

.income:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px #0db4afb8;
}

.expense {
  width: 100%;
  background: linear-gradient(to left, #fcac94 0%, #f3a183 98%);
  border-radius: 5px;
  font-size: 14px;
  padding: 11px 15px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #ffffff;
  box-shadow: 0 12px 12px -11px #fca76c;
  background-size: 200% auto;
}

.expense:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px #fca76c;
}

.total {
  width: 100%;
  background: linear-gradient(90deg, #f073c8 0%, #ff6a95 99%);
  border-radius: 5px;
  font-size: 14px;
  padding: 11px 15px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: #ffffff;
  box-shadow: 0 12px 12px -11px rgba(240, 115, 200, 0.73);
  background-size: 200% auto;
}

.total:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px rgba(240, 115, 200, 0.73);
}

.btn-table {
  background: linear-gradient(to right, #36d1dc, #5b86e5);
  transition: all 0.3s ease-in-out;
}

.btn-table:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px #5b86e5;
}
</style>
