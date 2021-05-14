<template>
  <div>
    <q-dialog
      v-model="dialog"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
      v-if="Object.keys(form).length"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row">
          <div class="text-h6">
            {{ { new: "新建", upt: "修改" }[dialogType] }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section style="max-height: 70vh;" class="scroll">
          <form-box
            ref="form"
            :form="form"
            :columns="columns"
            @submit="onSubmitForm"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-table
      :title="title"
      :selection="showButtons ? 'multiple' : 'none'"
      row-key="id"
      binary-state-sort
      :hide-header="false"
      :grid="false"
      :data="data"
      :columns="columns"
      :pagination.sync="pagination"
      :loading="loading"
      :filter="searchValue"
      :selected.sync="selected"
      @row-click="onRowClick"
      @request="onRequest"
    >
      <template v-if="showButtons" v-slot:top-left>
        <q-btn-group class="q-mr-sm">
          <q-btn
            color="primary"
            label="新建"
            size="13px"
            outline
            @click="onClickCreate"
          />
        </q-btn-group>
        <q-btn-group>
          <q-btn
            color="red"
            label="删除选中"
            size="13px"
            :outline="selected.length === 0"
            :disabled="selected.length === 0"
            @click="onClickDelete"
          />
        </q-btn-group>
      </template>
      <template v-slot:top-right>
        <q-input
          outlined
          dense
          debounce="1000"
          v-model="searchValue"
          placeholder="查询"
        >
          <template v-slot:before>
            <q-select
              dense
              filled
              emit-value
              map-options
              borderless
              hide-dropdown-icon
              option-value="name"
              v-model="searchField"
              :options="columns"
            />
          </template>
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
  </div>
</template>

<script>
import FormBox from "./FormBox";
export default {
  components: {
    FormBox
  },
  props: {
    props: {
      type: Object,
      default: null
    },
    showButtons: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    },
    columns: {
      type: Array,
      default: () => []
    },
    form: {
      type: Object,
      default: () => ({})
    },
    onSelect: {
      type: Function,
      default: () => []
    },
    onCreate: {
      type: Function,
      default: () => null
    },
    onDelete: {
      type: Function,
      default: () => null
    },
    onUpdate: {
      type: Function,
      default: () => null
    }
  },
  data() {
    return {
      searchField: "",
      searchValue: "",
      dialog: false,
      dialogType: "new",
      loading: false,
      pagination: {
        sortBy: "id",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      selected: [],
      data: [],
      original: []
    };
  },
  methods: {
    async onRequest(props) {
      try {
        const { page, rowsPerPage, sortBy, descending } = props.pagination;
        props.filterField = this.searchField;
        this.loading = true;
        const rets = await this.onSelect(props);
        this.data = rets.data;
        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;
        this.pagination.sortBy = sortBy;
        this.pagination.descending = descending;
        this.pagination.rowsNumber = rets.count;
        this.loading = false;
      } catch (e) {
        console.dir(e);
        const message =
          (e.graphQLErrors && e.graphQLErrors[0].message.message) || e.message;
        this.$q.notify({ message, color: "red" });
      }
    },
    async onSubmitForm(formData) {
      try {
        switch (this.dialogType) {
          case "new":
            {
              const data = await this.onCreate(formData);
              this.data.push(data);
              this.$q.notify("添加数据成功");
            }
            break;
          case "upt":
            {
              const data = await this.onUpdate(this.updateId, formData);
              const index = this.data.findIndex(
                item => item.id === this.updateId
              );
              this.$set(this.data, index, data);
              this.dialog = false;
              this.$q.notify("修改数据成功");
            }
            break;
        }
      } catch (e) {
        console.dir(e);
        const message =
          (e.graphQLErrors && e.graphQLErrors[0].message.message) || e.message;
        this.$q.notify({ message, color: "red" });
      }
    },
    async onClickDelete() {
      try {
        this.loading = true;
        await this.onDelete(this.selected);
        this.selected.forEach(item => {
          const id = item.id;
          const index = this.data.findIndex(item => item.id === id);
          if (index !== -1) {
            this.data.splice(index, 1);
            this.pagination.rowsNumber--;
          }
        });
        this.loading = false;
        this.$q.notify("删除数据成功");
      } catch (e) {
        console.dir(e);
        const message =
          (e.graphQLErrors && e.graphQLErrors[0].message.message) || e.message;
        this.$q.notify({ message, color: "red" });
      }
    },
    async onClickCreate() {
      this.dialog = true;
      this.dialogType = "new";
    },
    async onRowClick(e, row) {
      this.dialog = true;
      this.dialogType = "upt";
      this.updateId = row.id;
      await this.$nextTick();
      this.$refs.form.onResetFormData(row);
    },
    onRefresh() {
      this.onRequest({
        pagination: this.pagination,
        filter: this.searchValue
      });
    }
  },
  created() {
    // get initial data from server (1st page)
    this.searchField = this.columns[0].name;
    this.onRequest({
      pagination: this.pagination,
      filter: this.searchValue
    });
  }
};
</script>
