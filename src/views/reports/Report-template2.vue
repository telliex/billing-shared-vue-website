<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-10-11 06:25:45
 * @LastEditors: Telliex
 * @LastEditTime: 2022-10-17 10:37:02
-->
<template>
  <div class="p-4">
    <ImpExcel @success="loadDataSuccess" dateFormat="YYYY-MM-DD">
      <a-button v-if="hasPermission(RoleEnum.SUPER) || hasPermission(RoleEnum.DEVELOP)" class="m-3">
        導入
      </a-button>
    </ImpExcel>

    <BasicTable @register="registerTable" :loading="loading">
      <template #toolbar v-if="tableData.length ? true : false">
        <div class="w-80">
          <a-input-search
            v-model:value="filterValue"
            placeholder="input search text"
            enter-button
            @search="onSearch"
            allow-clear
        /></div>
        <a-button type="primary" @click="show('total')"> 下載原始報表 </a-button>
        <a-button type="primary" @click="show('current')"> 導出當前數據 </a-button>
      </template>
    </BasicTable>
    <ExpExcelModal @register="register" @success="defaultHeader" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, computed, onMounted } from 'vue';
  import {
    jsonToSheetXlsx,
    ExpExcelModal,
    ExportModalResult,
    ImpExcel,
    ExcelData,
  } from '/@/components/Excel';
  import axios from 'axios';
  import { BasicTable, BasicColumn, useTable, FormSchema } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { Authority } from '/@/components/Authority';
  import { usePermission } from '/@/hooks/web/usePermission';
  // import { demoListApi } from '/@/api/demo/table';
  // import { defHttp } from '/@/utils/http/axios';
  const formData = reactive<{
    type: string;
    month?: string;
    day?: string;
  }>({
    type: '',
    month: '',
    day: '',
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
    components: { BasicTable, ExpExcelModal, ImpExcel },
    setup() {
      const { hasPermission } = usePermission();
      const loading = ref(false);
      const filterValue = ref<string>('');
      const isFiltering = ref(false);
      const tableColumns = ref<any[]>([]);
      const downloadTable = ref<any[]>([]);
      const tableTitle = ref<string>('');
      const tableListRef = ref<
        {
          title: string;
          columns?: any[];
          dataSource?: any[];
        }[]
      >([]);

      const tableData = ref<any[]>([]);
      const orgiTableData = ref<any[]>([]);

      function defaultHeader({ filename, bookType }: ExportModalResult) {
        // 默认Object.keys(data[0])作为header
        jsonToSheetXlsx({
          data: downloadTable.value,
          filename,
          write2excelOpts: {
            bookType,
          },
        });
      }
      const [register, { openModal }] = useModal();

      function show(who: string) {
        if (who === 'current') {
          downloadTable.value = tableData.value;
        } else if (who === 'total') {
          downloadTable.value = orgiTableData.value;
        } else {
          downloadTable.value = [];
        }
        openModal();
      }

      function loadDataSuccess(excelDataList: ExcelData[]) {
        let index = 0;
        tableListRef.value = [];
        loading.value = true;
        console.log(excelDataList);
        for (const excelData of excelDataList) {
          const {
            header,
            results,
            meta: { sheetName },
          } = excelData;
          const columns: BasicColumn[] = [];
          for (const title of header) {
            columns.push({
              title,
              dataIndex: title,
              key: title,
              width: 150,
            });
          }
          tableListRef.value.push({ title: sheetName, dataSource: results, columns });
        }
        tableTitle.value = tableListRef.value[index].title;
        tableData.value = JSON.parse(JSON.stringify(tableListRef.value[index].dataSource));
        orgiTableData.value = JSON.parse(JSON.stringify(tableData.value));
        tableColumns.value = JSON.parse(JSON.stringify(tableListRef.value[index].columns));
        setTimeout(() => {
          loading.value = false;
        }, 1000);
      }

      const onSearch = (searchValue: string) => {
        loading.value = true;
        if (searchValue && searchValue.toString().trim()) {
          let temp: any[] = [];
          orgiTableData.value.forEach((item) => {
            let tempArray = Object.values(item);
            if (
              tempArray.some(
                (subitem:any) => subitem && subitem.toString().trim().indexOf(searchValue) !== -1,
              )
            ) {
              temp.push(item);
            }
          });
          tableData.value = temp;
          setTimeout(() => {
            loading.value = false;
          }, 1000);
          return;
        }
        tableData.value = orgiTableData.value;
        setTimeout(() => {
          loading.value = false;
        }, 1000);
      };

      const getFetch = () => {
        console.log('99999999');
        return axios.get(
          'http://internal-billing-dev-api-alb-1953497531.us-west-2.elb.amazonaws.com:3006/aws/v1.0/get-download-url',
          {
            params: {
              trace_id: '1CF432445E709FC18F4F1080B662A07C',
              bucket_region: 'us-east-2',
              bucket_name: 'billing-stage-accounting-report-us-east-2',
              object_key:
                'report_type=0/ym=202111/leadger_country=tw/tw_202111_Report_0_migration_opor.csv',
              duration: '10',
            },
          },
        );
      };
      const tableTools = computed(() => {
        return tableData.value.length !== 0;
      });
      const [registerTable] = useTable({
        title: tableTitle,
        // api: demoListApi,
        columns: tableColumns,
        dataSource: tableData,
        useSearchForm: true,
        formConfig: {
          labelWidth: 100,
          schemas: [...schemas],
        },
        showTableSetting: tableTools,
        tableSetting: { fullScreen: true },
        showIndexColumn: true,
        // rowKey: 'id',
      });

      onMounted(() => {
        getFetch().then((res) => {
          console.log(res);
        });
      });

      return {
        getFetch,
        tableData,
        loading,
        register,
        openModal,
        defaultHeader,
        loadDataSuccess,
        tableListRef,
        registerTable,
        onSearch,
        isFiltering,
        filterValue,
        show,
        Authority,
        RoleEnum,
        hasPermission,
      };
    },
  });
</script>
