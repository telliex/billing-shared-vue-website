<template>
  <PowerBIReport
    :currentPageReportName="currentPageReportName"
    :currentPageReportIdKey="currentPageReportIdKey"
    :currentPageTableNameKey="currentPageTableNameKey"
    :powerBILambdaURL="powerBILambdaURL"
  />
</template>
<script lang="ts" setup name="SalesMonthlyRevenue">
  import PowerBIReport from './components/powerBIReport/index.vue';
  let currentPageReportName = 'sales_cdn_revenue'; // need to change
  let currentPageReportIdKey = 'POWERBI_CDN_REPORTId'; // need to change
  let currentPageTableNameKey = 'POWERBI_CDN_TABLENAME'; // need to change
  let powerBILambdaURL = import.meta.env.VITE_GLOB_POWERBI_LAMBDA_API_URL;
</script>
<style lang="less"></style>
