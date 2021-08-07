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
            :showButton="showButtons"
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
      flat
      :hide-header="false"
      :grid="isGrid"
      :data="data"
      :columns="columns"
      :pagination.sync="pagination"
      :loading="loading"
      :filter="searchValue"
      :selected.sync="selected"
      @row-click="onRowClick"
      @request="onRequest"
    >
      <template v-if="showButtons || Object.keys(form).length" v-slot:top-left>
        <q-btn-group class="q-mr-sm">
          <q-btn
            v-if="isCreateBtn"
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
      <template v-if="showSearchBox" v-slot:top-right>
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
      <template v-slot:body-cell="props">
        <q-td :props="props">
          <component
            :is="props.col.is || 'cell-text'"
            :value="props.value"
            v-bind="props.col.bindProps && props.col.bindProps(props.row)"
          ></component>
        </q-td>
      </template>
      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
          @click="onRowClick($event, props.row)"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-card-section>
              <q-checkbox
                dense
                v-model="props.selected"
                :label="props.row.name"
              />
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-item
                v-for="col in props.cols.filter(col => col.name !== 'desc')"
                :key="col.name"
              >
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                  <q-item-label caption>
                    <component
                      :is="col.is || 'cell-text'"
                      v-bind="
                        col.bindProps
                          ? col.bindProps(props.row)
                          : { value: col.value }
                      "
                    ></component>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import FormBox from "./FormBox.vue";
import BaseForm from "./BaseForm";

export default {
  components: {
    FormBox,
    ...BaseForm
  },
  props: {
    isGrid: {
      type: Boolean,
      default: false
    },
    showSearchBox: {
      type: Boolean,
      default: true
    },
    isCreateBtn: {
      type: Boolean,
      default: true
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
        const rets = await this.onSelect(this.tranfromCrudParams(props));
        this.data = rets.list;
        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;
        this.pagination.sortBy = sortBy;
        this.pagination.descending = descending;
        this.pagination.rowsNumber = rets.count ?? rets.total;
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
              await this.onUpdate(this.updateId, formData);
              const index = this.data.findIndex(
                item => item.id === this.updateId
              );
              this.$set(this.data, index, {
                id: this.updateId,
                ...this.data[index],
                ...formData
              });
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
        for (let i = 0; i < this.selected.length; i++) {
          const item = this.selected[i];
          await this.onDelete(item.id);
          const id = item.id;
          const index = this.data.findIndex(item => item.id === id);
          if (index !== -1) {
            this.data.splice(index, 1);
            this.pagination.rowsNumber--;
          }
        }

        this.loading = false;
        this.$q.notify("删除数据成功");
      } catch (e) {
        console.dir(e);
        const message = e.message;
        this.$q.notify({ message, color: "red" });
      }
    },
    async onClickCreate() {
      this.dialog = true;
      this.dialogType = "new";
    },
    async onRowClick(e, row) {
      if (!Object.keys(this.form).length) {
        return;
      }
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
    },
    tranfromCrudParams({ pagination, filterField, filter }) {
      const crudParams = {
        page: `${pagination.page}:${pagination.rowsPerPage}`,
        order: `${pagination.sortBy}:${pagination.descending ? "DESC" : "ASC"}`
      };
      if (filter) {
        const col = this.findColumn(filterField) || { searchModify: "@=" };
        crudParams.where = `${filterField}${col.searchModify}:${filter}`;
      }
      return crudParams;
    },
    findColumn(key) {
      return this.columns.find(res => res.name === key);
    }
  },
  created() {
    // get initial data from server (1st page)
    this.searchField = this.columns.length > 0 ? this.columns[0].name : "id";
    this.onRequest({
      pagination: this.pagination,
      filter: this.searchValue
    });
  }
};
</script>
