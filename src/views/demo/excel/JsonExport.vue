<template>
  <PageWrapper title="導出示例" content="根據JSON格式的數據進行導出">
    <BasicTable title="基礎表格" :columns="columns" :dataSource="data">
      <template #toolbar>
        <a-button @click="defaultHeader"> 導出：默認頭部 </a-button>
        <a-button @click="customHeader"> 導出：自定義頭部 </a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable } from '/@/components/Table';
  import { jsonToSheetXlsx } from '/@/components/Excel';
  import { columns, data } from './data';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    components: { BasicTable, PageWrapper },
    setup() {
      function defaultHeader() {
        // 默認Object.keys(data[0])作為header
        jsonToSheetXlsx({
          data,
          filename: '使用key作為默認頭部.xlsx',
        });
      }

      function customHeader() {
        jsonToSheetXlsx({
          data,
          header: {
            id: 'ID',
            name: '姓名',
            age: '年齡',
            no: '編號',
            address: '地址',
            beginTime: '開始時間',
            endTime: '結束時間',
          },
          filename: '自定義頭部.xlsx',
          json2sheetOpts: {
            // 指定順序
            header: ['name', 'id'],
          },
        });
      }

      return {
        defaultHeader,
        customHeader,
        columns,
        data,
      };
    },
  });
</script>
