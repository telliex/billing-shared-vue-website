<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:01
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 02:54:03
-->
<template>
  <PageWrapper
    title="可展開表格"
    content="TableAction組件可配置stopButtonPropagation來阻止操作按鈕的點擊事件冒泡，以便配合Table組件的expandRowByClick"
  >
    <BasicTable @register="registerTable">
      <template #expandedRowRender="{ record }">
        <span>No: {{ record.no }} </span>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            stopButtonPropagation
            :actions="[
              {
                label: '刪除',
                icon: 'ic:outline-delete-outline',
                onClick: handleDelete.bind(null, record),
              },
            ]"
            :dropDownActions="[
              {
                label: '啟用',
                popConfirm: {
                  title: '是否啟用？',
                  confirm: handleOpen.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { getBasicColumns } from './tableData';

  import { demoListApi } from '/@/api/demo/table';

  export default defineComponent({
    components: { BasicTable, TableAction, PageWrapper },
    setup() {
      const [registerTable] = useTable({
        api: demoListApi,
        title: '可展開表格演示',
        titleHelpMessage: ['已啟用expandRowByClick', '已啟用stopButtonPropagation'],
        columns: getBasicColumns(),
        rowKey: 'id',
        canResize: false,
        expandRowByClick: true,
        actionColumn: {
          width: 160,
          title: 'Action',
          dataIndex: 'action',
          fixed: 'right',
          // slots: { customRender: 'action' },
        },
      });
      function handleDelete(record: Recordable) {
        console.log('點擊了刪除', record);
      }
      function handleOpen(record: Recordable) {
        console.log('點擊了啟用', record);
      }

      return {
        registerTable,
        handleDelete,
        handleOpen,
      };
    },
  });
</script>
