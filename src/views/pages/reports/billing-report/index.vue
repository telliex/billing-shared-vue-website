<script lang="ts" setup name="Billing_Report">
  import BasicReportForExcel from '../components/basicReportForExcel/index.vue';
  import { useFormSchema } from './formData';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const routePath = route.fullPath.split('/').pop() as string;

  const { reportInfo, schemas } = useFormSchema(routePath);
  const { tableName, reportType, s3Bucket, bucketRegion } = reportInfo;
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
