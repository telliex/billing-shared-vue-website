<template>
  <div>
    <BasicReport
      :formDataObject="formDataObject"
      :tableName="tableName"
      :reportType="reportType"
      :s3Bucket="s3Bucket"
      :formData="formData"
      :s3YearOfDayjsFormat="s3YearOfDayjsFormat"
      :s3MonthOfDayjsFormat="s3MonthOfDayjsFormat"
      :s3FileNameOfDayjsFormat="s3FileNameOfDayjsFormat"
      :bucketRegion="bucketRegion"
      :searchResetFn="handleSearchReset"
    />
  </div>
</template>
<script lang="ts" setup name="DopCost">
  import { ref, reactive } from 'vue';
  import BasicReport from '../components/basicReport/index.vue';
  import { getFormSchema } from './formData';
  import { FormSchema } from '/@/components/Form/index';
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();
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
    showCustomButton: true,
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
  let tableName = ref(t('report.dopCost.tableAreaTitle'));
  let reportType = 'dop_cost_report'; // [M] report type & S3 prefix folder name,
  let s3Bucket = import.meta.env.VITE_GLOB_S3_REPORT; // [M] S3 bucket name

  let formData = reactive<SearchItems>({
    ReportType: reportType,
    YearMonth: '',
  });

  const s3YearOfDayjsFormat = 'YYYY';
  const s3MonthOfDayjsFormat = 'MM';
  const s3FileNameOfDayjsFormat = 'YYYYMM';
  const bucketRegion = import.meta.env.VITE_GLOB_S3_REGION;
  //====End========modify Area=============
  function handleSearchReset() {
    formData.ReportType = reportType;
    formData.YearMonth = '';
  }
</script>
