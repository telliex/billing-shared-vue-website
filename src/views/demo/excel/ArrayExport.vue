<template>
  <PageWrapper title="導出示例" content="根據數組格式的數據進行導出">
    <BasicTable title="基礎表格" :columns="columns" :dataSource="data">
      <template #toolbar>
        <a-button @click="aoaToExcel"> 導出 </a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { aoaToSheetXlsx } from '/@/components/Excel';
  import { arrHeader, arrData, columns, data } from './data';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    components: { BasicTable, PageWrapper },
    setup() {
      function aoaToExcel() {
        // 保證data順序與header一致
        aoaToSheetXlsx({
          data: arrData,
          header: arrHeader,
          filename: '二維數組方式導出excel.xlsx',
        });
      }

      return {
        aoaToExcel,
        columns,
        data,
      };
    },
  });
</script>
