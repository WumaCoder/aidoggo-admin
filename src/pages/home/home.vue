<template>
  <base-content>
    <div class="container q-pa-lg q-col-gutter-md">
      <div class="row justify-between q-col-gutter-md">
        <div class="col-xs-12 col-md-3 q-gutter-md">
          <q-card class="newUser ">
            <q-card-section horizontal>
              <q-card-section class="col">
                <div class="text-subtitle2 text-white">
                  新增用户
                </div>
                <div class="text-h6 q-mt-sm q-mb-xs text-white">
                  <countTo
                    :startVal="1"
                    :endVal="
                      chartData.newUser[chartData.newUser.length - 1] || 0
                    "
                    :duration="1500"
                  />
                </div>
              </q-card-section>
              <q-card-section class="col">
                <div style="height: 100%;max-width: 150px">
                  <v-chart :options="charts.newUser(chartData.newUser)" />
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
          <q-card class="activeUser ">
            <q-card-section horizontal>
              <q-card-section class="col">
                <div class="text-subtitle2 text-white">
                  活跃用户
                </div>
                <div class="text-h6 q-mt-sm q-mb-xs text-white">
                  <countTo
                    :startVal="1"
                    :endVal="
                      chartData.activeUser[chartData.activeUser.length - 1] || 0
                    "
                    :duration="1500"
                  />
                </div>
              </q-card-section>
              <q-card-section class="col">
                <div style="height: 100%;width: 150px">
                  <v-chart :options="charts.activeUser(chartData.activeUser)" />
                </div>
              </q-card-section>
            </q-card-section>
          </q-card>
          <q-card class="totalUser ">
            <q-card-section horizontal>
              <q-card-section class="col">
                <div class="text-subtitle2 text-white">
                  现存用户
                </div>
                <div class="text-h6 q-mt-sm q-mb-xs text-white">
                  <countTo
                    :startVal="1"
                    :endVal="
                      chartData.totalUser[chartData.totalUser.length - 1] || 0
                    "
                    :duration="1500"
                  />
                </div>
              </q-card-section>
              <q-card-section class="col">
                <div style="height: 100%;width: 150px">
                  <v-chart :options="charts.totalUser(chartData.totalUser)" />
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
            <v-chart
              :options="charts.userLine(chartData.userLine)"
              autoresize
            />
          </q-card>
        </div>
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-xs-12 col-md-12">
          <q-card
            class="cimo-shadow text-center"
            style="width: 100%; padding: 3px"
          >
            <div class="q-pa-md">
              <CRUD
                title="日志"
                :columns="columns"
                :showButtons="false"
                :showSearchBox="false"
                :onSelect="onSelect"
              ></CRUD>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </base-content>
</template>

<script>
import countTo from "vue-count-to";
import { createTimeLine } from "../../assets/js/createTimeLine";
import { createLine } from "../../assets/js/createLine";
import CRUD from "../../components/CRUD";

export default {
  name: "home",
  components: {
    countTo,
    CRUD
  },
  data() {
    return {
      expanded: false,
      charts: {
        userLine: createTimeLine,
        newUser: createLine,
        activeUser: createLine,
        totalUser: createLine
      },
      chartData: {
        userLine: {
          newUser: [],
          activeUser: [],
          totalUser: []
        },
        newUser: [],
        activeUser: [],
        totalUser: []
      },
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          field: row => row.id,
          format: val => `${val}`,
          sortable: true,
          searchModify: "@="
        },
        {
          name: "createdAt",
          label: "时间",
          field: row => row.createdAt,
          searchModify: "@=",
          required: true
        },
        {
          name: "message",
          label: "消息",
          field: "message",
          searchModify: "@="
        },
        {
          name: "level",
          label: "级别",
          field: "level",
          searchModify: "@="
        },
        {
          name: "loc",
          label: "位置",
          field: "loc",
          searchModify: "@="
        }
      ]
    };
  },
  methods: {
    async onSelect(crud) {
      return await this.$api.Counter.getLogs(crud).then(res => res.data);
    },
    async fetchNewUser() {
      const res = await this.$api.Counter.getTimeLine(2, 10);
      this.chartData.userLine.newUser = res.data;
      this.chartData.newUser = res.data.map(n => n[1]).reverse();
    },
    async fetchActiveUser() {
      const res = await this.$api.Counter.getTimeLine(1, 10);
      this.chartData.userLine.activeUser = res.data;
      this.chartData.activeUser = res.data.map(n => n[1]).reverse();
    },
    async fetchTotal() {
      const res = await this.$api.Counter.getCount(3);
      this.chartData.newUser = [res.data.count];
    },
    async fetch() {
      this.fetchNewUser();
      this.fetchActiveUser();
      this.fetchTotal();
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang="css" scoped>
.my-card {
  width: 100%;
  min-height: 390px;
  height: 100%;
  /*max-width: 350px;*/
}

.newUser {
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

.newUser:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px #0db4afb8;
}

.activeUser {
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

.activeUser:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px #fca76c;
}

.totalUser {
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

.totalUser:hover {
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
