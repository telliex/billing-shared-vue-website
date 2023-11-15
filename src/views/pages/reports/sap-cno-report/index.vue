<template>
  <div class="p-4">
    <CollapseContainer :title="t('report.searchAreaTitle')">
      <BasicForm
        @register="registerForSearch"
        @submit="handleSearchSubmit"
        @reset="handleSearchReset"
      />
    </CollapseContainer>
    <BasicTable
      :title="formData.YearMonth + tableName"
      v-for="(table, index) in tableListRef"
      :key="index"
      :columns="table.columns"
      :dataSource="table.dataSource"
    >
      <template #toolbar>
        <!-- <a-button type="primary" @click="toggleCanResize">
          {{ !canResize ? t('report.autoFitHeight') : t('report.cancalFitHeight') }}
        </a-button> -->
        <a-button type="primary" @click="exportFile">{{ t('report.exportFile') }}</a-button>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { GetS3TargetUrl } from '/@/api/sys/system';
  import { getFinalActiveTime, writeFinalActiveTime } from '/@/api/sys/user';
  import { Guid } from 'js-guid';
  import { CollapseContainer } from '/@/components/Container';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  // hooks
  import { useI18n } from '/@/hooks/web/useI18n';
  import { jsonToSheetXlsx, ExcelData } from '/@/components/Excel';
  import { BasicTable, BasicColumn } from '/@/components/Table';
  // import { getBasicColumns, getBasicData } from './tableData';
  import { useMessage } from '/@/hooks/web/useMessage';
  // import queryString from 'query-string';
  import dayjs from 'dayjs';
  import * as XLSX from 'xlsx';
  import { dateUtil } from '/@/utils/dateUtil';
  import axios from 'axios';
  import { getFormSchema } from './formData';
  import { checkLoginTimeout } from '/@/utils/tools';
  import { logoutApi } from '/@/api/sys/user';
  const { t } = useI18n();

  //====Start========modify Area===========
  interface SearchItems {
    ReportType: string;
    YearMonth: string;
  }
  let tableName = ref(t('report.sapcnoReport.tableAreaTitle'));
  let reportType = 'sap_cno_contrast_table'; // report type & S3 prefix folder name,
  let S3Bucket = import.meta.env.VITE_GLOB_S3_REPORT; // S3 bucket name
  //====End========modify Area=============
  const schemas: FormSchema[] = getFormSchema();
  // const canResize = ref(false);
  const tableListRef = ref<
    {
      title: string;
      columns?: any[];
      dataSource?: any[];
    }[]
  >([]);
  // const loading = ref(false);
  let formData = reactive<SearchItems>({
    ReportType: reportType,
    YearMonth: '',
  });

  const [registerForSearch] = useForm({
    labelWidth: 100,
    size: 'small',
    autoFocusFirstItem: true,
    // submitOnChange: true,
    schemas,
    actionColOptions: {
      span: 24,
    },
    submitButtonOptions: {
      postIcon: 'ant-design:search-outlined',
      iconSize: 12,
    },
    showResetButton: false,
    resetButtonOptions: {
      postIcon: 'ant-design:reload-outlined',
      iconSize: 12,
    },
  });
  // const [registerForExportFile] = useModal();
  const loadingRef = ref<Boolean>(false);
  const { createMessage } = useMessage();

  // control table height
  // function toggleCanResize() {
  //   canResize.value = !canResize.value;
  // }
  // export file
  function exportFile() {
    // 默認Object.keys(data[0])作為header
    let timeStamp = dayjs().format('YYYYMMDD');
    jsonToSheetXlsx({
      data: tableListRef.value[0].dataSource || [],
      filename: `sap_cno_${timeStamp}.xlsx`,
      write2excelOpts: {
        bookType: 'xlsx',
      },
    });
  }

  function loadDataSuccess(excelDataList: ExcelData[]) {
    tableListRef.value = [];
    console.log(excelDataList);
    if (excelDataList[0].results.length == 0) {
      createMessage.warning('No data！');
    }
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
          const workbook = XLSX.read(data, { type: 'array', cellDates: true });
          // console.log(workbook);
          /* DO SOMETHING WITH workbook HERE */
          const excelData = getExcelData(workbook);
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

  function handleSearchReset() {
    formData.ReportType = reportType;
    formData.YearMonth = '';
  }

  async function handleSearchSubmit(values: SearchItems) {
    // deal with
    let UserInfo = await getFinalActiveTime();
    if (!UserInfo || UserInfo.length === 0) {
      logoutApi();
      return false;
    }

    let checkTimeout = checkLoginTimeout(UserInfo[0]);
    if (checkTimeout) {
      await writeFinalActiveTime();
    } else {
      logoutApi();
      return false;
    }

    // createMessage.success('click search,values:' + JSON.stringify(values));
    let S3ReportClass = reportType;
    let S3FileName = `${S3ReportClass}_${dayjs(values.YearMonth).format('YYYYMM').toString()}.csv`;
    let S3Month = dayjs(values.YearMonth).format('MM').toString();
    let S3Year = dayjs(values.YearMonth).format('YYYY').toString();

    let S3Location = await GetS3TargetUrl({
      trace_id: Guid.newGuid().toString(),
      bucket_region: import.meta.env.VITE_GLOB_S3_REGION,
      bucket_name: S3Bucket,
      object_key: `sync_report/${S3ReportClass}/${S3Year}${S3Month}/${S3FileName}`,
      duration: '10',
    }).catch((err) => {
      console.log(err);
      // createMessage.warning('該條件下未有資料！');
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
      readerData(fileData.data);
    }
  }

  onMounted(async () => {
    // const parsed: any = queryString.parse(location.search.replace(/\//, ''));
    // setFieldsValue({
    //   ReportType: reportType,
    //   YearMonth: parsed.qdate ? dayjs(parsed.qdate).format('YYYY-MM') : null,
    // });
    // setTimeout(() => {
    //   clearValidate();
    // }, 10);
  });
</script>
<script lang="ts">
  export default {
    name: 'SapcnoReport',
  };
</script>
