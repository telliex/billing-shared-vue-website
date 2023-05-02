<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-10-06 10:25:16
 * @LastEditors: Telliex
 * @LastEditTime: 2022-10-17 00:44:57
-->
<template>
  <div class="p-4">
    <BasicTable
      title="表4"
      titleHelpMessage=""
      :columns="columns"
      :dataSource="data"
      :canResize="canResize"
      :loading="loading"
      showTableSetting
      :pagination="pagination"
      @columns-change="handleColumnChange"
    >
      <template #toolbar>
        <a-button type="primary" @click="toggleCanResize">
          {{ !canResize ? '自適應高度' : '取消自適應' }}
        </a-button>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, ColumnChangeParam } from '/@/components/Table';
  import { getBasicColumns, getBasicData } from './tableData';

  export default defineComponent({
    components: { BasicTable },
    setup() {
      const canResize = ref(false);
      const loading = ref(false);

      const pagination = ref<any>(false);
      function toggleCanResize() {
        canResize.value = !canResize.value;
      }

      function toggleLoading() {
        loading.value = true;
        setTimeout(() => {
          loading.value = false;
          pagination.value = { pageSize: 20 };
        }, 3000);
      }

      function handleColumnChange(data: ColumnChangeParam[]) {
        console.log('ColumnChanged', data);
      }
      return {
        columns: getBasicColumns(),
        data: getBasicData(),
        canResize,
        loading,
        toggleCanResize,
        toggleLoading,
        pagination,
        handleColumnChange,
      };
    },
  });
</script>
