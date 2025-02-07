<template>
  <div class="p-4" ref="wrapEl">
    <CollapseContainer :title="t('report.searchAreaTitle')">
      <BasicForm
        @register="registerForSearch"
        @submit="handleSearchSubmit"
        @reset="handleSearchReset"
        @custom="handleSearchCustom"
      />
    </CollapseContainer>
    <BasicTable
      :title="formData.YearMonth + tableName"
      v-for="(table, index) in tableListRef"
      :key="index"
      :columns="table.columns"
      :dataSource="table.dataSource"
    >
      <!-- <template #toolbar>
        <a-button type="primary" @click="exportFile" style="display: none">{{
          t('report.exportFile')
        }}</a-button>
      </template> -->
    </BasicTable>
  </div>
</template>
<script lang="ts" setup name="BasicReport">
  import { ref, reactive, onMounted } from 'vue';
  import { GetS3TargetUrl } from '/@/api/sys/system';
  // import { getFinalActiveTime, writeFinalActiveTime } from '/@/api/sys/user';
  import { Guid } from 'js-guid';
  import { CollapseContainer } from '/@/components/Container';
  import { BasicForm, useForm, FormSchema } from '/@/components/Form/index';
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
  // import { checkLoginTimeout } from '/@/utils/tools';
  // import { logoutApi, JWTlogoutApi } from '/@/api/sys/user';
  import { useLoading } from '/@/components/Loading';
  const { t } = useI18n();

  import { downloadByUrl } from '/@/utils/file/download'; // 使用 file-saver 來處理文件下載

  // loading module
  const wrapEl = ref<ElRef>(null);
  const [openWrapLoading, closeWrapLoading] = useLoading({
    target: wrapEl,
    props: {
      tip: 'Loading...',
      absolute: true,
    },
  });

  interface FormDataObject {
    labelWidth: number;
    size: string;
    autoFocusFirstItem: boolean;
    submitOnChange: boolean;
    schemas: FormSchema[];
    actionColOptions: {
      span: number;
    };
    submitButtonOptions: {
      postIcon: string;
      iconSize: number;
    };
    showCustomButton: boolean;
    customButtonOptions: {
      postIcon: string;
      iconSize: number;
    };
    showResetButton: boolean;
    resetButtonOptions: {
      postIcon: string;
      iconSize: number;
    };
  }
  const props = defineProps<{
    formDataObject: FormDataObject;
    tableName: string;
    // reportType: string;
    s3Bucket: string;
    formData: any;
    objectKeyString: string;
    bucketRegion: string;
    searchResetFn: Function;
    childFormValue: Function;
  }>();

  // const emit = defineEmits(['childFormValue']);

  let tableName = ref(props.tableName);
  // let reportType = ref(props.reportType);
  let s3Bucket = ref(props.s3Bucket);
  let objectKey = ref(props.objectKeyString);

  // const canResize = ref(false);
  const tableListRef = ref<
    {
      title: string;
      columns?: any[];
      dataSource?: any[];
    }[]
  >([]);
  // const loading = ref(false);
  let formData = reactive(props.formData);

  const [registerForSearch] = useForm(props.formDataObject);
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
    let timeStamp = dayjs().format('YYYYMMDDHHmmss');
    jsonToSheetXlsx({
      data: tableListRef.value[0].dataSource || [],
      filename: `dopcost-${timeStamp}.xlsx`,
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
        rawNumbers: false, // no need to remove the 0 of the number
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
    props.searchResetFn();
  }

  async function handleSearchSubmit(values: any) {
    openWrapLoading();
    // deal with
    // let UserInfo = await getFinalActiveTime();
    // if (!UserInfo || UserInfo.length === 0) {
    //   try {
    //     await logoutApi();
    //     await JWTlogoutApi();
    //   } catch {
    //     console.log('註銷 Token 失敗');
    //   }
    //   return false;
    // }

    // let checkTimeout = checkLoginTimeout(UserInfo[0]);
    // if (checkTimeout) {
    //   await writeFinalActiveTime();
    // } else {
    //   try {
    //     await logoutApi();
    //     await JWTlogoutApi();
    //   } catch {
    //     console.log('註銷 Token 失敗');
    //   }
    //   return false;
    // }
    const result = props.childFormValue(values);
    let S3Location = await GetS3TargetUrl({
      trace_id: Guid.newGuid().toString(),
      bucket_region: props.bucketRegion,
      bucket_name: s3Bucket.value,
      object_key: result, // [for need to modify area]
      duration: '10',
    }).catch((err) => {
      console.log(err);
      // createMessage.warning('該條件下未有資料！');
    });
    // download file & read file
    if (S3Location) {
      const fileData: any = await axios({
        url: S3Location,
        method: 'GET',
        data: {},
        responseType: 'blob',
      }).catch((err) => {
        console.log(err);
        createMessage.warning('File parsing error!');
      });
      await readerData(fileData.data);
      closeWrapLoading();
    } else {
      closeWrapLoading();
    }
  }

  async function handleSearchCustom(values: any) {
    openWrapLoading();
    // deal with
    // let UserInfo = await getFinalActiveTime();
    // if (!UserInfo || UserInfo.length === 0) {
    //   try {
    //     await logoutApi();
    //     await JWTlogoutApi();
    //   } catch {
    //     console.log('註銷 Token 失敗');
    //   }

    //   return false;
    // }

    // let checkTimeout = checkLoginTimeout(UserInfo[0]);
    // if (checkTimeout) {
    //   await writeFinalActiveTime();
    // } else {
    //   try {
    //     await logoutApi();
    //     await JWTlogoutApi();
    //   } catch {
    //     console.log('註銷 Token 失敗');
    //   }

    //   return false;
    // }

    const result = props.childFormValue(values);

    // createMessage.success('click search,values:' + JSON.stringify(values));
    let S3Location = await GetS3TargetUrl({
      trace_id: Guid.newGuid().toString(),
      bucket_region: props.bucketRegion,
      bucket_name: s3Bucket.value,
      object_key: result, // [for need to modify area]
      duration: '10',
    }).catch((err) => {
      console.log(err);
      // createMessage.warning('該條件下未有資料！');
    });

    // download file & read file
    if (S3Location) {
      // await downloadByUrl({
      //   url: S3Location[0],
      //   target: '_self',
      //   fileName: 'default.pdf',
      // });

      fetch(S3Location[0])
        .then((response) => {
          if (!response.ok) {
            throw new Error('網絡響應不是 ok 狀態');
          }
          // 將響應體轉換為 Blob
          return response.blob();
        })
        .then((blob) => {
          // 此時的 blob 就是你需要的 PDF 文件的 Blob 對象
          console.log(blob);

          // 你可以進行後續操作，比如創建一個用於下載的 URL
          const downloadUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = `${props.formData['ReportType']}-${
            props.formData['YearMonth']
          }.${props.objectKeyString.split('.').pop()}`;
          document.body.appendChild(a);
          a.click();
          URL.revokeObjectURL(downloadUrl); // 釋放 URL 對象
          document.body.removeChild(a);
        })
        .catch((error) => {
          console.error('獲取 PDF 失敗:', error);
        });

      closeWrapLoading();
    } else {
      closeWrapLoading();
    }
  }

  onMounted(async () => {});
</script>
