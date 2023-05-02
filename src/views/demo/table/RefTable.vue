<template>
  <div class="p-4">
    <div class="mb-4">
      <a-button class="mr-2" @click="reloadTable"> 還原 </a-button>
      <a-button class="mr-2" @click="changeLoading"> 開啟loading </a-button>
      <a-button class="mr-2" @click="changeColumns"> 更改Columns </a-button>
      <a-button class="mr-2" @click="getColumn"> 獲取Columns </a-button>
      <a-button class="mr-2" @click="getTableData"> 獲取表格數據 </a-button>
      <a-button class="mr-2" @click="getTableRawData"> 獲取接口原始數據 </a-button>
      <a-button class="mr-2" @click="setPaginationInfo"> 跳轉到第2頁 </a-button>
    </div>
    <div class="mb-4">
      <a-button class="mr-2" @click="getSelectRowList"> 獲取選中行 </a-button>
      <a-button class="mr-2" @click="getSelectRowKeyList"> 獲取選中行Key </a-button>
      <a-button class="mr-2" @click="setSelectedRowKeyList"> 設置選中行 </a-button>
      <a-button class="mr-2" @click="clearSelect"> 清空選中行 </a-button>
      <a-button class="mr-2" @click="getPagination"> 獲取分頁信息 </a-button>
    </div>
    <BasicTable
      :canResize="false"
      title="RefTable示例"
      titleHelpMessage="使用Ref調用表格內方法"
      ref="tableRef"
      :api="api"
      :columns="columns"
      rowKey="id"
      :rowSelection="{ type: 'checkbox' }"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicTable, TableActionType } from '/@/components/Table';
  import { getBasicColumns, getBasicShortColumns } from './tableData';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { demoListApi } from '/@/api/demo/table';
  export default defineComponent({
    components: { BasicTable },
    setup() {
      const tableRef = ref<Nullable<TableActionType>>(null);
      const { createMessage } = useMessage();

      function getTableAction() {
        const tableAction = unref(tableRef);
        if (!tableAction) {
          throw new Error('tableAction is null');
        }
        return tableAction;
      }
      function changeLoading() {
        getTableAction().setLoading(true);
        setTimeout(() => {
          getTableAction().setLoading(false);
        }, 1000);
      }
      function changeColumns() {
        getTableAction().setColumns(getBasicShortColumns());
      }
      function reloadTable() {
        getTableAction().setColumns(getBasicColumns());

        getTableAction().reload({
          page: 1,
        });
      }
      function getColumn() {
        createMessage.info('請在控制檯查看！');
        console.log(getTableAction().getColumns());
      }

      function getTableData() {
        createMessage.info('請在控制檯查看！');
        console.log(getTableAction().getDataSource());
      }
      function getTableRawData() {
        createMessage.info('請在控制檯查看！');
        console.log(getTableAction().getRawDataSource());
      }

      function getPagination() {
        createMessage.info('請在控制檯查看！');
        console.log(getTableAction().getPaginationRef());
      }

      function setPaginationInfo() {
        getTableAction().setPagination({
          current: 2,
        });
        getTableAction().reload();
      }
      function getSelectRowList() {
        createMessage.info('請在控制檯查看！');
        console.log(getTableAction().getSelectRows());
      }
      function getSelectRowKeyList() {
        createMessage.info('請在控制檯查看！');
        console.log(getTableAction().getSelectRowKeys());
      }
      function setSelectedRowKeyList() {
        getTableAction().setSelectedRowKeys(['0', '1', '2']);
      }
      function clearSelect() {
        getTableAction().clearSelectedRowKeys();
      }

      return {
        tableRef,
        api: demoListApi,
        columns: getBasicColumns(),
        changeLoading,
        changeColumns,
        reloadTable,
        getColumn,
        getTableData,
        getTableRawData,
        getPagination,
        setPaginationInfo,
        getSelectRowList,
        getSelectRowKeyList,
        setSelectedRowKeyList,
        clearSelect,
      };
    },
  });
</script>
