<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-09-30 08:02:53
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 02:54:41
-->
<template>
  <BasicTable @register="registerTable">
    <template #headerTop> </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getBasicColumns, getFormConfig } from './tableData';

  import { demoListApi } from '/@/api/demo/table';

  export default defineComponent({
    components: { BasicTable },
    setup() {
      const checkedKeys = ref<Array<string | number>>([]);
      const [registerTable] = useTable({
        title: '開啟搜索區域1',
        api: demoListApi,
        columns: getBasicColumns(),
        useSearchForm: true,
        formConfig: getFormConfig(),
        showTableSetting: true,
        tableSetting: { fullScreen: true },
        showIndexColumn: false,
        rowKey: 'id',
      });

      return {
        registerTable,

        checkedKeys,
      };
    },
  });
</script>
