<template>
  <div>
    <VxeBasicTable ref="tableRef" v-bind="gridOptions" :min-height="300">
      <template #action="{ row }">
        <TableAction outside :actions="createActions(row)" />
      </template>
      <template #pager>
        <!--使用 pager 插槽-->
        <vxe-pager
          :layouts="[
            'Sizes',
            'PrevJump',
            'PrevPage',
            'Number',
            'NextPage',
            'NextJump',
            'FullJump',
            'Total',
          ]"
          v-model:current-page="tablePage.currentPage"
          v-model:page-size="tablePage.pageSize"
          :total="tablePage.total"
          @page-change="handlePageChange"
        />
      </template>
    </VxeBasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { ActionItem, TableAction } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { vxeTableColumns, vxeTableFormSchema } from './role.data';
  import {
    BasicTableProps,
    VxeBasicTable,
    VxeGridInstance,
    VxePagerEvents,
  } from '/@/components/VxeTable';
  import { getRoleListByPage, removeRoleItem } from '/@/api/sys/system';
  const { createMessage } = useMessage();
  import RoleDrawer from './RoleDrawer.vue';
  import { useDrawer } from '/@/components/Drawer';
  import { Guid } from 'js-guid/dist/guid';

  const tablePage = reactive({
    total: 0,
    currentPage: 1,
    pageSize: 10,
  });

  const tableRef = ref<VxeGridInstance>();
  const [registerDrawer, { openDrawer }] = useDrawer();

  const gridOptions = reactive<BasicTableProps>({
    id: 'VxeTable',
    size: 'mini',
    keepSource: true,
    showHeaderOverflow: true,
    showOverflow: true,
    border: true,
    stripe: true,
    // editConfig: { trigger: 'click', mode: 'cell', showStatus: true },
    columns: vxeTableColumns,
    toolbarConfig: {
      className: 'toolbar',
      export: false, // export button
      print: false, // print button
      refresh: false, // refresh button
      custom: false, // custom button
      zoom: false, // zoom button
      buttons: [
        {
          content: 'Create',
          buttonRender: {
            name: 'AButton',
            props: {
              // size: 'small',
              type: 'primary',
              // preIcon: 'mdi:page-next-outline',
            },
            events: {
              click: () => {
                handleCreate();
              },
            },
          },
        },
      ],
    },
    formConfig: {
      enabled: true,
      items: vxeTableFormSchema,
    },
    height: 'auto',
    proxyConfig: {
      props: {
        result: 'results',
        total: 'total',
      },
      ajax: {
        query: async ({ page, form }) => {
          console.log('777777:', page, form);

          let result = await getRoleListByPage({
            page: page.currentPage,
            pageSize: page.pageSize || 10,
            ...form,
          });
          console.log('777777-----:', result);
          tablePage.total = result.length;
          tablePage.currentPage = page.currentPage;
          tablePage.pageSize = page.pageSize;
          return {
            trace_id: Guid.newGuid().toString(),
            total_pages: 1,
            current_page: 1,
            results: result,
            status: 1000,
            msg: 'success',
            requested_time: '',
            responsed_time: '',
            total: result.length,
          };
        },
        queryAll: async ({ form }) => {
          console.log('88888888:', form);
          return await getRoleListByPage({
            page: null,
            pageSize: null,
            roleName: form.roleName,
            status: form.status,
          });
        },
      },
    },
  });

  const handlePageChange: VxePagerEvents.PageChange = ({ currentPage, pageSize }) => {
    tablePage.currentPage = currentPage;
    tablePage.pageSize = pageSize;
    findList();
  };

  const findList = () => {
    gridOptions.loading = true;
    setTimeout(() => {
      gridOptions.loading = false;
      tablePage.total = 10;
      gridOptions.data = [
        {
          id: 10001,
          name: 'Test1',
          nickname: 'T1',
          role: 'Develop',
          sex: '1',
          age: 28,
          address: 'Shenzhen',
        },
        {
          id: 10002,
          name: 'Test2',
          nickname: 'T2',
          role: 'Test',
          sex: '0',
          age: 22,
          address: 'Guangzhou',
        },
        {
          id: 10003,
          name: 'Test3',
          nickname: 'T3',
          role: 'PM',
          sex: '1',
          age: 32,
          address: 'Shanghai',
        },
        {
          id: 10004,
          name: 'Test4',
          nickname: 'T4',
          role: 'Designer',
          sex: '0',
          age: 23,
          address: 'Shenzhen',
        },
        {
          id: 10005,
          name: 'Test5',
          nickname: 'T5',
          role: 'Develop',
          sex: '0',
          age: 30,
          address: 'Shanghai',
        },
        {
          id: 10006,
          name: 'Test6',
          nickname: 'T6',
          role: 'Develop',
          sex: '0',
          age: 27,
          address: 'Shanghai',
        },
        {
          id: 10007,
          name: 'Test7',
          nickname: 'T7',
          role: 'Develop',
          sex: '1',
          age: 29,
          address: 'Shenzhen',
        },
        {
          id: 10008,
          name: 'Test8',
          nickname: 'T8',
          role: 'Develop',
          sex: '0',
          age: 32,
          address: 'Shanghai',
        },
        {
          id: 10009,
          name: 'Test9',
          nickname: 'T9',
          role: 'Develop',
          sex: '1',
          age: 30,
          address: 'Shenzhen',
        },
        {
          id: 10010,
          name: 'Test10',
          nickname: 'T10',
          role: 'Develop',
          sex: '0',
          age: 34,
          address: 'Shanghai',
        },
      ];
    }, 300);
  };

  // 操作按钮（权限控制）
  const createActions = (record) => {
    const actions: ActionItem[] = [
      {
        label: '',
        tooltip: 'Edit',
        icon: 'ant-design:edit-twotone',
        onClick: () => {},
      },
      {
        label: '',
        icon: 'ant-design:delete-twotone',
        tooltip: 'Delete',
        color: 'error',
        popConfirm: {
          title: 'Are you sure to delete?',
          confirm: () => {
            handleDelete.bind(null, record);
          },
        },
      },
    ];

    return actions;
  };

  function handleDelete(record: Recordable) {
    removeRoleItem(record)
      .then(() => {
        // reload();
      })
      .catch(() => {
        createMessage.warning(
          "The role item has already used. Please delete the user's role first",
        );
      });
  }

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleSuccess() {
    // reload();
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }
</script>
<style lang="less" scoped></style>
