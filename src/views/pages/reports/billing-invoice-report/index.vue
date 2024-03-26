<script lang="ts" setup name="InvcoiceReport">
  import BasicReportForExcel from '../components/basicReportForExcel/index.vue';
  import { ref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { getFormSchema } from './formData';
  import { FormSchema } from '/@/components/Form/index';

  const { t } = useI18n();

  const schemas: FormSchema[] = getFormSchema();

  const tableName = ref(t('report.invcoiceReport.tableAreaTitle'));
  const reportType = ref('billing_invoice_report_hk'); // [M] report type & S3 prefix folder name
  const s3Bucket = import.meta.env.VITE_GLOB_S3_REPORT; // [M] S3 bucket name
  const bucketRegion = import.meta.env.VITE_GLOB_S3_REGION;
</script>

<template>
  <div>
    <BasicReportForExcel
      :tableName="tableName"
      :reportType="reportType"
      :s3Bucket="s3Bucket"
      :bucketRegion="bucketRegion"
      :schemas="schemas"
    />
  </div>
</template>