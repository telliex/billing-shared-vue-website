<template>
  <div>
    <BasicReport
      :formDataObject="formDataObject"
      :tableName="tableName"
      :reportType="reportType"
      :s3Bucket="s3Bucket"
      :formData="formData"
      :bucketRegion="bucketRegion"
      :searchResetFn="handleSearchReset"
      :childFormValue="handleChildFormValue"
      :objectKeyString="objectKeyString"
    />
  </div>
</template>
<script lang="ts" setup name="InvcoiceReport">
  //[for need to modify area]
  import { ref, reactive } from 'vue';
  import BasicReport from '../components/basicReport/index.vue';
  import { getFormSchema } from './formData';
  import { FormSchema } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();
  import dayjs from 'dayjs';
  const schemas: FormSchema[] = getFormSchema();
  //====Start========modify Area=========== [for need to modify area]

  interface SearchItems {
    ReportType: string;
    YearMonth: string;
  }

  const formDataObject = reactive({
    labelWidth: 100,
    size: 'small',
    autoFocusFirstItem: true,
    submitOnChange: false,
    schemas,
    actionColOptions: {
      span: 24,
    },
    submitButtonOptions: {
      postIcon: 'ant-design:search-outlined',
      iconSize: 12,
    },
    showCustomButton: true, // download
    customButtonOptions: {
      postIcon: 'ant-design:cloud-download-outlined',
      iconSize: 12,
    },
    showResetButton: false,
    resetButtonOptions: {
      postIcon: 'ant-design:reload-outlined',
      iconSize: 12,
    },
  });
  let tableName = ref(t('report.invcoiceReport.tableAreaTitle')); //[for need to modify area]
  let reportType = ref('billing_invoice_report_hk'); // [M] report type & S3 prefix folder name,
  let s3Bucket = import.meta.env.VITE_GLOB_S3_REPORT; // [M] S3 bucket name

  let formData = reactive<SearchItems>({
    ReportType: reportType.value,
    YearMonth: '',
  });

  const bucketRegion = import.meta.env.VITE_GLOB_S3_REGION;
  const objectKeyString = ref('');
  //====End========modify Area=============
  function handleSearchReset() {
    formData.ReportType = reportType.value;
    formData.YearMonth = '';
  }
  function handleChildFormValue(values: SearchItems) {
    let S3ReportClass = reportType.value;
    let S3Month = dayjs(values.YearMonth).format('MM').toString();
    let S3Year = dayjs(values.YearMonth).format('YYYY').toString();
    let fileMonth = dayjs(values.YearMonth).format('YYYYMM').toString(); // [for need to modify area]
    let S3FileName = `${S3ReportClass}_${fileMonth}.csv`; // [for need to modify area]
    objectKeyString.value = `sync_report/${S3ReportClass}/${S3Year}${S3Month}/${S3FileName}`;
    return objectKeyString.value;
  }
</script>
