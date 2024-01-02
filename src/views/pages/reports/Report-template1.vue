<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-10-11 06:25:45
 * @LastEditors: Telliex
 * @LastEditTime: 2022-10-12 08:48:03
-->
<template>
  <div class="p-4">
    <CollapseContainer title="Filter by">
      <BasicForm @register="register" @submit="handleSearchSubmit" @reset="handleReset" />
    </CollapseContainer>
    <BasicTable
      title="特調成本報表"
      v-for="(table, index) in tableListRef"
      :key="index"
      :columns="table.columns"
      :dataSource="table.dataSource"
    >
      <template #toolbar>
        <a-button type="primary" @click="toggleCanResize">
          {{ !canResize ? '自適應高度' : '取消自適應' }}
        </a-button>

        <a-button type="primary" @click="openModal"> 導出 </a-button>
      </template>
    </BasicTable>
    <ExpExcelModal @register="registerForExportFile" @success="exportFile" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, onMounted } from 'vue';
  import { GetS3TargetUrl } from '/@/api/sys/system';
  import { Guid } from 'js-guid';
  import { CollapseContainer } from '/@/components/Container';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
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
  import queryString from 'query-string';
  import dayjs from 'dayjs';
  import * as XLSX from 'xlsx';
  import { dateUtil } from '/@/utils/dateUtil';
  import axios from 'axios';

  interface SearchItems {
    ReportType: string;
    YearMonth: string;
  }

  const schemas: FormSchema[] = [
    // {
    //   field: 'reportType',
    //   component: 'Select',
    //   label: '報表類型:',
    //   colProps: {
    //     span: 6,
    //   },
    //   componentProps: {
    //     options: [
    //       {
    //         label: '月報表',
    //         value: 'month',
    //         key: 'month',
    //       },
    //       {
    //         label: '日報表',
    //         value: 'day',
    //         key: 'day',
    //       },
    //     ],
    //     onChange: (e: any) => {
    //       console.log(e);
    //       formData.type = e;
    //     },
    //   },
    // },
    {
      field: 'ReportType',
      component: 'Select',
      label: '報表種類:',
      // ifShow: () => formData.type === 'month',
      componentProps: {
        options: [
          {
            label: '特調成本',
            value: 'dop_cost_report',
            key: 'dop_cost_report',
          },
        ],
        onChange: (e: any) => {
          console.log(e);
        },
      },
      colProps: {
        span: 6,
      },
    },
    {
      field: 'YearMonth',
      component: 'DatePicker',
      label: '時間:',
      // ifShow: () => formData.type === 'month',
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
    // {
    //   field: 'day',
    //   ifShow: () => formData.type === 'day',
    //   component: 'DatePicker',
    //   label: '日期:',
    //   componentProps: {
    //     onChange: (e: any) => {
    //       console.log(e);
    //     },
    //   },
    //   colProps: {
    //     span: 6,
    //   },
    // },
  ];

  export default defineComponent({
    components: { BasicTable, ExpExcelModal, BasicForm, CollapseContainer },
    setup() {
      const canResize = ref(false);
      const loading = ref(false);
      const formData = reactive<SearchItems>({
        ReportType: '',
        YearMonth: '',
      });

      const [register, { setFieldsValue }] = useForm({
        labelWidth: 100,
        schemas,
        actionColOptions: {
          span: 24,
        },
      });

      const loadingRef = ref<Boolean>(false);

      const { createMessage } = useMessage();

      function toggleCanResize() {
        canResize.value = !canResize.value;
      }
      // export file
      function exportFile({ filename, bookType }: ExportModalResult) {
        // 默認Object.keys(data[0])作為header
        jsonToSheetXlsx({
          data: tableListRef.value[0].dataSource || [],
          filename,
          write2excelOpts: {
            bookType,
          },
        });
      }
      const [registerForExportFile, { openModal }] = useModal();

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

      function shapeWorkSheel(sheet: XLSX.WorkSheet, range: XLSX.Range) {
        let str = ' ',
          char = 65,
          customWorkSheet = {
            t: 's',
            v: str,
            r: '<t> </t><phoneticPr fontId="1" type="noConversion"/>',
            h: str,
            w: str,
          };
        if (!sheet || !sheet['!ref']) return [];
        let c = 0,
          r = 1;
        while (c < range.e.c + 1) {
          while (r < range.e.r + 1) {
            if (!sheet[String.fromCharCode(char) + r]) {
              sheet[String.fromCharCode(char) + r] = customWorkSheet;
            }
            r++;
          }
          r = 1;
          str += ' ';
          customWorkSheet = {
            t: 's',
            v: str,
            r: '<t> </t><phoneticPr fontId="1" type="noConversion"/>',
            h: str,
            w: str,
          };
          c++;
          char++;
        }
      }

      /**
       * @description: 第一行作为头部
       */
      function getHeaderRow(sheet: XLSX.WorkSheet) {
        if (!sheet || !sheet['!ref']) return [];
        const headers: string[] = [];
        // A3:B7=>{s:{c:0, r:2}, e:{c:1, r:6}}
        const range: XLSX.Range = XLSX.utils.decode_range(sheet['!ref']);
        shapeWorkSheel(sheet, range);
        const R = range.s.r;
        /* start in the first row */
        for (let C = range.s.c; C <= range.e.c; ++C) {
          /* walk every column in the range */
          const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
          /* find the cell in the first row */
          let hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
          if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
          headers.push(hdr);
        }
        return headers;
      }

      /**
       * @description: 获得excel数据
       */
      function getExcelData(workbook: XLSX.WorkBook) {
        const excelData: ExcelData[] = [];
        // const { dateFormat, timeZone } = props;
        let timeZone = 8;
        let dateFormat = 'YYYY-MM-DD';
        for (const sheetName of workbook.SheetNames) {
          const worksheet = workbook.Sheets[sheetName];
          const header: string[] = getHeaderRow(worksheet);
          let results = XLSX.utils.sheet_to_json(worksheet, {
            raw: true,
            dateNF: dateFormat, //Not worked
          }) as object[];
          results = results.map((row: object) => {
            for (let field in row) {
              if (row[field] instanceof Date) {
                if (timeZone === 8) {
                  row[field].setSeconds(row[field].getSeconds() + 43);
                }
                if (dateFormat) {
                  row[field] = dateUtil(row[field]).format(dateFormat);
                }
              }
            }
            return row;
          });

          excelData.push({
            header,
            results,
            meta: {
              sheetName,
            },
          });
        }
        return excelData;
      }

      /**
       * @description: 读取excel数据
       */
      function readerData(rawFile: File) {
        loadingRef.value = true;
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = async (e) => {
            try {
              const data = e.target && e.target.result;
              console.log('data');
              console.log(data);
              const workbook = XLSX.read(data, { type: 'array', cellDates: true });
              // console.log(workbook);
              /* DO SOMETHING WITH workbook HERE */
              const excelData = getExcelData(workbook);
              console.log('excelData', excelData);
              loadDataSuccess(excelData);
              // emit('success', excelData);
              resolve('');
            } catch (error) {
              console.log(error);
              reject(error);
              // emit('error');
            } finally {
              loadingRef.value = false;
            }
          };
          reader.readAsArrayBuffer(rawFile);
        });
      }
      onMounted(() => {
        const parsed: any = queryString.parse(location.search.replace(/\//, ''));
        console.log('parsed');
        console.log(parsed);
        setFieldsValue({
          ReportType: 'dop_cost_report',
          YearMonth: parsed.qdate ? dayjs(parsed.qdate).format('YYYY-MM') : '',
        });
      });

      return {
        schemas,
        columns: getBasicColumns(),
        data: getBasicData(),
        canResize,
        loading,
        toggleCanResize,
        registerForExportFile,
        register,
        openModal,
        exportFile,
        handleReset: () => {
          formData.ReportType = '';
          formData.YearMonth = '';
        },
        handleSearchSubmit: async (values: SearchItems) => {
          console.log('Search Items values', values);
          createMessage.success('click search,values:' + JSON.stringify(values));
          let S3ReportClass = values.ReportType;
          let S3FileName = `${S3ReportClass}_${dayjs(values.YearMonth)
            .format('YYYYMM')
            .toString()}.xlsx`;
          let S3Month = dayjs(values.YearMonth).format('MM').toString();
          let S3Year = dayjs(values.YearMonth).format('YYYY').toString();
          let S3Bucket = 'data-platform-data-bucket-ecv-dev';

          let S3Location = await GetS3TargetUrl({
            trace_id: Guid.newGuid().toString(),
            bucket_region: import.meta.env.VITE_GLOB_S3_REGION,
            bucket_name: S3Bucket,
            object_key: `report=${S3ReportClass}/yyyy=${S3Year}/mm=${S3Month}/${S3FileName}`,
            duration: '10',
          }).catch((err) => {
            console.log(err);
            createMessage.warning('該條件下未有資料！');
          });

          console.log('S3Location:', S3Location);
          // download file & read file
          if (S3Location) {
            const fileData: any = await axios({
              url: S3Location,
              method: 'GET',
              data: {},
              responseType: 'blob',
            }).catch((err) => {
              console.log(err);
              createMessage.warning('檔案解析錯誤！');
            });
            console.log('fileData.data');
            console.log(fileData.data);
            readerData(fileData.data);
          }
        },
        loadDataSuccess,
        tableListRef,
      };
    },
  });
</script>
