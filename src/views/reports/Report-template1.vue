<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-10-11 06:25:45
 * @LastEditors: Telliex
 * @LastEditTime: 2022-10-12 08:48:03
-->
<template>
  <div class="p-4">
    <CollapseContainer title="查詢欄位">
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
    >
      <template #toolbar>
        <a-button type="primary" @click="toggleCanResize">
          {{ !canResize ? '自適應高度' : '取消自適應' }}
        </a-button>

        <a-button type="primary" @click="openModal"> 導出 </a-button>
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
  import { BasicTable, BasicColumn } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { getBasicColumns, getBasicData } from './tableData';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { optionsListApi } from '/@/api/demo/select';
  import { cloneDeep } from 'lodash-es';

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
      field: 'reportType',
      component: 'Select',
      label: '報表類型:',
      colProps: {
        span: 6,
      },
      componentProps: {
        options: [
          {
            label: '月報表',
            value: 'month',
            key: 'month',
          },
          {
            label: '日報表',
            value: 'day',
            key: 'day',
          },
        ],
        onChange: (e: any) => {
          console.log(e);
          formData.type = e;
        },
      },
    },
    {
      field: 'month',
      component: 'DatePicker',
      label: '月份:',
      ifShow: () => formData.type === 'month',
      componentProps: {
        picker: 'month',
        onChange: (e: any) => {
          console.log(e);
        },
      },
      colProps: {
        span: 6,
      },
    },
    {
      field: 'day',
      ifShow: () => formData.type === 'day',
      component: 'DatePicker',
      label: '日期:',
      componentProps: {
        onChange: (e: any) => {
          console.log(e);
        },
      },
      colProps: {
        span: 6,
      },
    },
  ];

  export default defineComponent({
    components: { BasicTable, ExpExcelModal, BasicForm, ApiSelect, CollapseContainer },
    setup() {
      const canResize = ref(false);
      const loading = ref(false);
      const pagination = ref<any>(false);

      const { createMessage } = useMessage();
      const keyword = ref<string>('');

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

      return {
        schemas,
        columns: getBasicColumns(),
        data: getBasicData(),
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
