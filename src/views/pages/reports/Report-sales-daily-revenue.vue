<template>
  <PowerBIReport
    :currentPageReportName="currentPageReportName"
    :currentPageReportIdKey="currentPageReportIdKey"
    :currentPageTableNameKey="currentPageTableNameKey"
    :powerBILambdaURL="powerBILambdaURL"
    :targetColumn="targetColumn"
  />
</template>
<script lang="ts" setup name="SalesDailyRevenue">
  import PowerBIReport from './components/powerBIReport/index.vue';
  const currentPageReportName = 'sales_daily_revenue'; // need to change
  const currentPageReportIdKey = 'POWERBI_DAILYREVENUEREPORT_REPORTId'; // need to change
  const currentPageTableNameKey = 'POWERBI_DAILYREVENUEREPORT_TABLENAME'; // need to change
  const powerBILambdaURL = import.meta.env.VITE_GLOB_POWERBI_LAMBDA_API_URL;
  const targetColumn = 'ecloud_sales';
</script>
<style lang="less"></style>
