<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:01
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 02:55:37
-->
<template>
  <div class="p-4">
    <div class="mb-4">
      <a-button class="mr-2" @click="reloadTable"> 還原 </a-button>
      <a-button class="mr-2" @click="changeLoading"> 開啓loading </a-button>
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
    <BasicTable @register="registerTable" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, ColumnChangeParam, useTable } from '/@/components/Table';
  import { getBasicColumns, getBasicShortColumns } from './tableData';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { demoListApi } from '/@/api/demo/table';
  export default defineComponent({
    components: { BasicTable },
    setup() {
      const { createMessage } = useMessage();
      function onChange() {
        console.log('onChange', arguments);
      }
      const [
        registerTable,
        {
          setLoading,
          setColumns,
          getColumns,
          getDataSource,
          getRawDataSource,
          reload,
          getPaginationRef,
          setPagination,
          getSelectRows,
          getSelectRowKeys,
          setSelectedRowKeys,
          clearSelectedRowKeys,
        },
      ] = useTable({
        canResize: true,
        title: 'useTable示例',
        titleHelpMessage: '使用useTable調用表格內方法',
        api: demoListApi,
        columns: getBasicColumns(),
        defSort: {
          field: 'name',
          order: 'ascend',
        },
        rowKey: 'id',
        showTableSetting: true,
        onChange,
        rowSelection: {
          type: 'checkbox',
        },
        onColumnsChange: (data: ColumnChangeParam[]) => {
          console.log('ColumnsChanged', data);
        },
      });

      function changeLoading() {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
      function changeColumns() {
        setColumns(getBasicShortColumns());
      }
      function reloadTable() {
        setColumns(getBasicColumns());

        reload({
          page: 1,
        });
      }
      function getColumn() {
        createMessage.info('請在控制枱查看！');
        console.log(getColumns());
      }

      function getTableData() {
        createMessage.info('請在控制枱查看！');
        console.log(getDataSource());
      }

      function getTableRawData() {
        createMessage.info('請在控制枱查看！');
        console.log(getRawDataSource());
      }

      function getPagination() {
        createMessage.info('請在控制枱查看！');
        console.log(getPaginationRef());
      }

      function setPaginationInfo() {
        setPagination({
          current: 2,
        });
        reload();
      }
      function getSelectRowList() {
        createMessage.info('請在控制枱查看！');
        console.log(getSelectRows());
      }
      function getSelectRowKeyList() {
        createMessage.info('請在控制枱查看！');
        console.log(getSelectRowKeys());
      }
      function setSelectedRowKeyList() {
        setSelectedRowKeys(['0', '1', '2']);
      }
      function clearSelect() {
        clearSelectedRowKeys();
      }

      return {
        registerTable,
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
        onChange,
      };
    },
  });
</script>
