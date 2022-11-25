<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                label: '編輯',
                onClick: handleEdit.bind(null, record),
                auth: 'other', // 根據權限控制是否顯示: 無權限，不顯示
              },
              {
                label: '刪除',
                icon: 'ic:outline-delete-outline',
                onClick: handleDelete.bind(null, record),
                auth: 'super', // 根據權限控制是否顯示: 有權限，會顯示
              },
            ]"
            :dropDownActions="[
              {
                label: '啓用',
                popConfirm: {
                  title: '是否啓用？',
                  confirm: handleOpen.bind(null, record),
                },
                ifShow: (_action) => {
                  return record.status !== 'enable'; // 根據業務控制是否顯示: 非enable狀態的不顯示啓用按鈕
                },
              },
              {
                label: '禁用',
                popConfirm: {
                  title: '是否禁用？',
                  confirm: handleOpen.bind(null, record),
                },
                ifShow: () => {
                  return record.status === 'enable'; // 根據業務控制是否顯示: enable狀態的顯示禁用按鈕
                },
              },
              {
                label: '同時控制',
                popConfirm: {
                  title: '是否動態顯示？',
                  confirm: handleOpen.bind(null, record),
                },
                auth: 'super', // 同時根據權限和業務控制是否顯示
                ifShow: () => {
                  return true;
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, BasicColumn, TableAction } from '/@/components/Table';

  import { demoListApi } from '/@/api/demo/table';
  const columns: BasicColumn[] = [
    {
      title: '編號',
      dataIndex: 'no',
      width: 100,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 200,
      auth: 'test', // 根據權限控制是否顯示: 無權限，不顯示
    },
    {
      title: '狀態',
      dataIndex: 'status',
    },
    {
      title: '狀態1',
      dataIndex: 'status1',
    },
    {
      title: '狀態2',
      dataIndex: 'status2',
    },
    {
      title: '狀態3',
      dataIndex: 'status3',
    },
    {
      title: '狀態4',
      dataIndex: 'status4',
    },
    {
      title: '狀態5',
      dataIndex: 'status5',
    },
    {
      title: '地址',
      dataIndex: 'address',
      auth: 'super', // 同時根據權限和業務控制是否顯示
      ifShow: (_column) => {
        return true;
      },
    },
    {
      title: '開始時間',
      dataIndex: 'beginTime',
    },
    {
      title: '結束時間',
      dataIndex: 'endTime',
      width: 200,
    },
  ];
  export default defineComponent({
    components: { BasicTable, TableAction },
    setup() {
      const [registerTable] = useTable({
        title: 'TableAction組件及固定列示例',
        api: demoListApi,
        columns: columns,
        bordered: true,
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
        },
        actionColumn: {
          width: 250,
          title: 'Action',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
        },
      });
      function handleEdit(record: Recordable) {
        console.log('點擊了編輯', record);
      }
      function handleDelete(record: Recordable) {
        console.log('點擊了刪除', record);
      }
      function handleOpen(record: Recordable) {
        console.log('點擊了啓用', record);
      }
      return {
        registerTable,
        handleEdit,
        handleDelete,
        handleOpen,
      };
    },
  });
</script>
