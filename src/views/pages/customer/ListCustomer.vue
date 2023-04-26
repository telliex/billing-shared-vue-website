<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-10-11 06:25:45
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-24 07:01:03
-->
<template>
  <div class="p-4">
    <CollapseContainer :title="t('client.subtitleOfCustomerListPage')">
      <BasicForm
        autoFocusFirstItem
        :labelWidth="100"
        :schemas="schemas"
        :actionColOptions="{ span: 24 }"
        @submit="handleSubmit"
        @reset="handleReset"
      >
        <template #localSearch="{ model, field }">
          <ApiSelect
            :api="optionsListApi"
            showSearch
            v-model:value="model[field]"
            optionFilterProp="label"
            resultField="list"
            labelField="name"
            valueField="id"
          />
        </template>
        <template #addBtn>
          <a-button class="mr-2">{{ t('client.btnRestoreDefault') }}</a-button>
          <a-button>{{ t('client.btnDiscountCustomerList') }}</a-button>
        </template>
      </BasicForm>
    </CollapseContainer>

    <BasicTable
      title="表0"
      :columns="columns"
      :dataSource="data"
      titleHelpMessage=""
      :canResize="canResize"
      :loading="loading"
      showTableSetting
      :pagination="pagination"
      :actionColumn="{ width: 200, title: 'Action', dataIndex: 'action' }"
    >
      <template #toolbar>
        <a-button type="primary" @click="toggleCanResize">
          {{ !canResize ? t('client.btnFitTableHeight') : t('client.btnUnFitTableHeight') }}
        </a-button>

        <a-button type="primary" @click="openModal"> {{ t('client.btnExport') }} </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: 'Edit',
                onClick: handleEdit.bind(null, record),
              },
              {
                label: 'Permission',
                onClick: handlePermission.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <ExpExcelModal @register="register" @success="defaultHeader" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, computed, reactive } from 'vue';
  import { CollapseContainer } from '/@/components/Container';
  import { BasicForm, FormSchema, ApiSelect } from '/@/components/Form/index';
  import {
    jsonToSheetXlsx,
    ExpExcelModal,
    ExportModalResult,
    ExcelData,
  } from '/@/components/Excel';
  import { BasicTable, BasicColumn, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { getBasicColumns, getBasicData } from './tableData';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { optionsListApi } from '/@/api/demo/select';
  import { cloneDeep } from 'lodash-es';

  import { useI18n } from '/@/hooks/web/useI18n';

  const valueSelectA = ref<string[]>([]);
  const valueSelectB = ref<string[]>([]);
  const options = ref<Recordable[]>([]);
  const formData = reactive<{
    type: string;
    month?: string;
    day?: string;
  }>({
    type: '',
    month: '',
    day: '',
  });
  const optionsA = computed(() => {
    return cloneDeep(unref(options)).map((op) => {
      op.disabled = unref(valueSelectB).indexOf(op.value) !== -1;
      return op;
    });
  });
  const optionsB = computed(() => {
    return cloneDeep(unref(options)).map((op) => {
      op.disabled = unref(valueSelectA).indexOf(op.value) !== -1;
      return op;
    });
  });

  const schemas: FormSchema[] = [
    {
      field: 'AffiliatedUnits',
      component: 'Select',
      labelWidth: 150,
      label: 'Affiliated Units:',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: '1',
            value: '1',
            key: '1',
          },
          {
            label: '2',
            value: '2',
            key: '2',
          },
          {
            label: '3',
            value: '3',
            key: '3',
          },
        ],
        onChange: (e: any) => {
          console.log(e);
          // formData.type = e;
        },
      },
    },
    {
      field: 'Title',
      component: 'Select',
      labelWidth: 100,
      label: 'Title:',
      colProps: {
        span: 8,
      },
      componentProps: {
        options: [
          {
            label: 'CIO',
            value: 'CIO',
            key: 'CIO',
          },
          {
            label: 'MIS 工程師',
            value: 'MIS',
            key: 'MIS',
          },
          {
            label: '助理',
            value: 'assistant',
            key: 'assistant',
          },
        ],
        onChange: (e: any) => {
          console.log(e);
          // formData.type = e;
        },
      },
    },
    {
      field: 'SearchColumn',
      component: 'InputSearch',
      label: 'Search Column:',
      labelWidth: 150,
      colProps: {
        span: 8,
      },
      componentProps: {
        onChange: (e: any) => {
          console.log(e);
          // formData.type = e;
        },
      },
    },
    {
      field: 'btn',
      component: 'Input',
      label: '',
      colProps: {
        offset: 19,
      },
      slot: 'addBtn',
    },
  ];

  export default defineComponent({
    components: { BasicTable, ExpExcelModal, BasicForm, ApiSelect, CollapseContainer, TableAction },
    setup() {
      const canResize = ref(false);
      const loading = ref(false);
      const pagination = ref(true);
      const { t } = useI18n();

      const { createMessage } = useMessage();

      function toggleCanResize() {
        canResize.value = !canResize.value;
      }
      function defaultHeader({ filename, bookType }: ExportModalResult) {
        // 默认Object.keys(data[0])作为header
        jsonToSheetXlsx({
          data: getBasicData(),
          filename,
          write2excelOpts: {
            bookType,
          },
        });
      }
      const [register, { openModal }] = useModal();

      const tableListRef = ref<
        {
          title: string;
          columns?: any[];
          dataSource?: any[];
        }[]
      >([]);

      function loadDataSuccess(excelDataList: ExcelData[]) {
        tableListRef.value = [];
        console.log(excelDataList);
        for (const excelData of excelDataList) {
          const {
            header,
            results,
            meta: { sheetName },
          } = excelData;
          const columns: BasicColumn[] = [];
          for (const title of header) {
            columns.push({ title, dataIndex: title });
          }
          tableListRef.value.push({ title: sheetName, dataSource: results, columns });
        }
      }

      function handleEdit(record: Recordable) {
        console.log('Edit', record);
      }
      function handlePermission(record: Recordable) {
        console.log('Permission', record);
      }

      return {
        t,
        handleEdit,
        handlePermission,
        schemas,
        columns: getBasicColumns(), // 取自 tableData
        data: getBasicData(), // 取自 tableData
        canResize,
        loading,
        toggleCanResize,
        pagination,
        register,
        openModal,
        defaultHeader,
        handleReset: () => {
          formData.type = '';
          formData.month = '';
          formData.day = '';
        },
        handleSubmit: (values: any) => {
          console.log('values', values);
          createMessage.success('click search,values:' + JSON.stringify(values));
        },
        optionsListApi,
        optionsA,
        optionsB,
        valueSelectA,
        valueSelectB,
        loadDataSuccess,
        tableListRef,
      };
    },
  });
</script>
