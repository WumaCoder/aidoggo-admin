<template>
  <div>
    <q-dialog v-model="showDialog">
      <q-card style="width:100%">
        <q-card-section class="row">
          <div class="text-h6">审批</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 70vh;" class="scroll">
          <form-box
            ref="form"
            :columns="columns"
            :form="form"
            :show-button="false"
          />
        </q-card-section>

        <q-separator />
        <q-card-actions align="right">
          <q-btn
            @click="onClickApply('NO_PASS')"
            flat
            label="拒绝"
            color="red"
            v-close-popup
          />
          <q-space />
          <q-btn
            @click="onClickApply('PASS')"
            flat
            label="通过"
            color="green"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-table
      grid
      hide-header
      binary-state-sort
      no-data-label="没有审批数据"
      row-key="id"
      :data="data"
      :columns="columns"
      :pagination.sync="pagination"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      @row-click="onClickRow"
    >
      <template #top>
        <div class="fit row wrap justify-between items-start content-center">
          <span>
            Tip 点击下面的块进行审批
          </span>
          <q-btn @click="onClickRefresh">刷新</q-btn>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import FormBox from "./FormBox";
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    onSelect: {
      type: Function,
      default: () => () => ({ data: [], count: 0 })
    },
    onApply: {
      type: Function,
      default: () => () => 0
    },
    form: {
      type: Object,
      default: () => ({})
    }
  },
  components: { FormBox },
  data() {
    return {
      data: [],
      showDialog: false,
      currentId: 0,
      dialog: {
        // 弹窗显示的字段
      },
      filter: "",
      loading: false,
      pagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      }
    };
  },
  methods: {
    async onClickRefresh() {
      await this.onRequest({
        pagination: this.pagination
      });
      this.$q.notify({ message: "已经刷新", timeout: 500 });
    },
    async onClickRow(e, row) {
      this.showDialog = true;
      await this.$nextTick();
      this.$refs.form.onResetFormData(row);
      this.currentId = row.id;
    },
    async onRequest(props) {
      try {
        this.loading = true;
        const rets = await this.onSelect(props);
        this.data = rets.data;
        this.pagination.rowsNumber = rets.count;
        this.loading = false;
      } catch (e) {
        console.dir(e);
        const message =
          (e.graphQLErrors && e.graphQLErrors[0].message.message) || e.message;
        this.$q.notify({ message, color: "red" });
      }
    },
    removeRow(id) {
      const index = this.data.findIndex(item => item.id === id);
      if (index === -1) return;
      this.data.splice(index, 0);
    },
    async onClickApply(status) {
      try {
        await this.onApply(this.currentId, status, this.$refs.form.onSubmit());
        await this.onClickRefresh();
      } catch (e) {
        console.dir(e);
        const message =
          (e.graphQLErrors && e.graphQLErrors[0].message.message) || e.message;
        this.$q.notify({ message, color: "red" });
      }
    }
  },
  created() {
    this.onRequest({
      pagination: this.pagination
    });
  }
};
</script>
