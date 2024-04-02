<template>
  <PageWrapper dense contentFullHeight>
    <VxeBasicTable
      ref="tableRef"
      v-bind="gridOptions"
      v-on="gridEvent"
      :sort-config="{ multiple: true, trigger: 'cell' }"
      @sort-change="sortChangeEvent"
    >
      <template #action="{ row }">
        <TableAction outside :actions="createActions(row)" />
      </template>
      <template #status="{ row }">
        <Tag :color="row.status === 1 ? 'green' : 'red'">{{
          row.status === 1 ? 'Enable' : 'Disable'
        }}</Tag>
      </template>
      <template #folding_group>
        <CollapseContainer title="Filter By" @click="collaposeChange" />
      </template>
    </VxeBasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup name="Role">
  import { reactive, ref } from 'vue';
  import { ActionItem, TableAction } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { vxeTableColumns, vxeTableFormSchema } from './role.data';
  import { CollapseContainer } from '/@/components/Container';
  import {
    BasicTableProps,
    VxeBasicTable,
    VxeGridInstance,
    VxeGridListeners,
    VxeTableEvents,
  } from '/@/components/VxeTable';
  import { PageWrapper } from '/@/components/Page';

  import { Tag } from 'ant-design-vue';
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

  let collapseStatus = ref(false);
  const tableRef = ref<VxeGridInstance>();
  const [registerDrawer, { openDrawer }] = useDrawer();

  const gridEvent: VxeGridListeners = {
    proxyQuery() {
      console.log('数据代理查询事件');
    },
    proxyDelete() {
      console.log('数据代理删除事件');
    },
    proxySave() {
      console.log('数据代理保存事件');
    },
  };

  const collaposeChange = (event) => {
    if (event.target.nodeName === 'svg') {
      collapseStatus.value = !collapseStatus.value;
      console.log('collapseStatus.value click:', collapseStatus.value);
      if (gridOptions.formConfig) {
        gridOptions.formConfig.collapseStatus = collapseStatus.value;
      }
    }
  };

  const gridOptions = reactive<BasicTableProps>({
    id: 'VxeTable',
    size: 'mini',
    keepSource: true,
    minHeight: 200,
    height: 700,
    showHeaderOverflow: true,
    showOverflow: true,
    border: true,
    stripe: true,
    columnConfig: {
      resizable: true, // column resizable
    },
    // editConfig: { trigger: 'click', mode: 'cell', showStatus: true },
    columns: vxeTableColumns,
    sortConfig: {
      trigger: 'cell',
      remote: true,
    },
    filterConfig: {
      remote: true,
    },
    pagerConfig: {
      enabled: true,
      background: true,
      layouts: ['Total', 'Number', 'Sizes'],
      currentPage: tablePage.currentPage,
      pageSize: tablePage.pageSize,
      pageSizes: [10, 50, 80, 100],
      total: tablePage.total,
      autoHidden: false,
    },
    toolbarConfig: {
      className: 'toolbar',
      export: false, // export button
      import: false, // import button
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
      collapseStatus: collapseStatus.value,
      enabled: true,
      items: vxeTableFormSchema,
    },
    proxyConfig: {
      autoLoad: true,
      sort: true, // 启用排序代理，当点击排序时会自动触发 query 行为
      filter: true, // 启用筛选代理，当点击筛选时会自动触发 query 行为
      props: {
        result: 'results',
        total: 'total',
      },
      ajax: {
        query: async ({ page, sorts, form }) => {
          const queryParams: any = Object.assign({}, form);
          // deal with sort
          const firstSort = sorts[0];
          if (firstSort) {
            queryParams.sort = firstSort.field;
            queryParams.order = firstSort.order;
          }
          let result = await getRoleListByPage({
            currentPage: page.currentPage || 1,
            pageSize: page.pageSize || 10,
            sortBy: 'asc',
            status: form.status,
            roleName: form.roleName,
          });
          tablePage.total = result[0].total;
          tablePage.currentPage = page.currentPage;
          tablePage.pageSize = page.pageSize;
          return {
            trace_id: Guid.newGuid().toString(),
            total_pages: 1,
            current_page: 1,
            results: result[0].items,
            status: 1000,
            msg: 'success',
            requested_time: '',
            responsed_time: '',
            total: result[0].total,
          };
        },
        // queryAll: async ({ form }) => {
        //   return await getRoleListByPage({
        //     page: null,
        //     pageSize: null,
        //     roleName: form.roleName,
        //     status: form.status,
        //   });
        // },
      },
    },
  });

  // columns sort change event
  const sortChangeEvent: VxeTableEvents.SortChange = ({ sortList }) => {
    console.info(sortList.map((item) => `${item.field},${item.order}`).join('; '));
  };

  // Control buttons
  const createActions = (record) => {
    const actions: ActionItem[] = [
      {
        label: '',
        tooltip: 'Edit',
        icon: 'ant-design:edit-twotone',
        onClick: handleEdit.bind(null, record),
      },
      {
        label: '',
        tooltip: 'Delete',
        icon: 'ant-design:delete-twotone',
        color: 'error',
        popConfirm: {
          title: 'Are you sure to delete?',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
    return actions;
  };

  const triggerProxy = (code: string) => {
    const $grid = tableRef.value;
    if ($grid) {
      $grid.commitProxy(code);
    }
  };

  // Edit item
  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }
  // Delete item
  function handleDelete(record: Recordable) {
    removeRoleItem(record)
      .then(() => {
        // reload();
        triggerProxy('query');
      })
      .catch(() => {
        createMessage.warning(
          "The role item has already used. Please delete the user's role first",
        );
      });
  }

  // Create item
  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleSuccess({ isUpdate }) {
    createMessage.info('Reloading page to update the menu ! ');
    // triggerProxy('query');
    triggerProxy('query');
    if (isUpdate) {
      setTimeout(() => {
        window.location.reload();
      }, 200);
    }
  }
</script>
<style lang="less" scoped></style>
