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
      <template #roles="{ row }">
        <Tag v-for="item in row.roles ? row.roles : []" :key="item.value">{{ item.roleName }}</Tag>
      </template>
      <template #folding_group>
        <CollapseContainer title="Filter By" @click="collaposeChange" />
      </template>
    </VxeBasicTable>
    <UserModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup name="User">
  import { reactive, ref } from 'vue';
  import { ActionItem, TableAction } from '/@/components/Table';
  import { vxeTableColumns, vxeTableFormSchema } from './user.data';
  import { CollapseContainer } from '/@/components/Container';
  import {
    BasicTableProps,
    VxeBasicTable,
    VxeGridInstance,
    VxeGridListeners,
    // VxePagerEvents,
    VxeTableEvents,
  } from '/@/components/VxeTable';
  import { PageWrapper } from '/@/components/Page';
  // import { useGo } from '/@/hooks/web/usePage';
  import { Tag } from 'ant-design-vue';
  import { getUserList, removeUserItem } from '/@/api/sys/system';
  import UserModal from './UserModal.vue';
  import { useModal } from '/@/components/Modal';
  import { Guid } from 'js-guid/dist/guid';
  const tablePage = reactive({
    total: 0,
    currentPage: 1,
    pageSize: 10,
  });

  // const go = useGo();
  let collapseStatus = ref(false);
  const tableRef = ref<VxeGridInstance>();
  const [registerModal, { openModal }] = useModal();

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
  // const handlePageChange: VxePagerEvents.PageChange = ({ currentPage, pageSize }) => {
  //   console.log('zzzzzz:', currentPage, pageSize);
  //   tablePage.currentPage = currentPage;
  //   tablePage.pageSize = pageSize;
  //   findList();
  // };
  const collaposeChange = (event) => {
    if (event.target.nodeName === 'svg') {
      collapseStatus.value = !collapseStatus.value;
      console.log('collapseStatus.value click:', collapseStatus.value);
      if (gridOptions.formConfig) {
        gridOptions.formConfig.collapseStatus = collapseStatus.value;
      }
    }
  };

  // const findList = () => {
  //   gridOptions.loading = true;
  //   setTimeout(() => {
  //     gridOptions.loading = false;
  //     tablePage.total = 10;
  //   }, 300);
  // };

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
        query: async ({ page, sorts, filters, form }) => {
          console.log('page:', form);
          console.log('sorts:', sorts);
          console.log('filters:', filters);
          console.log('form:', form);

          const queryParams: any = Object.assign({}, form);
          // deal with sort
          const firstSort = sorts[0];
          if (firstSort) {
            queryParams.sort = firstSort.field;
            queryParams.order = firstSort.order;
          }

          let result = await getUserList({
            currentPage: page.currentPage || 1,
            pageSize: page.pageSize || 10,
            sortBy: 'asc',
            status: form.status,
            displayName: form.displayName,
          });
          console.log('user list results =========:', result);
          // TODO remove fake pagination
          // let tempResult = result.items.slice(
          //   (page.currentPage - 1) * page.pageSize,
          //   page.currentPage * page.pageSize,
          // );
          tablePage.total = result[0].total;
          tablePage.currentPage = page.currentPage;
          tablePage.pageSize = page.pageSize;
          console.log('tablePage.total:', tablePage.total);
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
        //   return await getUserList({
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
      // {
      //   label: '',
      //   tooltip: 'password reset',
      //   icon: 'ant-design:lock-outlined',
      //   onClick: handleResetPassword.bind(null, record),
      // },
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
    openModal(true, {
      record,
      isUpdate: true,
    });
  }
  // Delete item
  function handleDelete(record: Recordable) {
    removeUserItem(record).then(() => {
      // reload();
      triggerProxy('query');
    });
  }

  function handleResetPassword(record: Recordable) {
    console.log('handleResetPassword:', record);
  }

  // Create item
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleSuccess({ isUpdate }) {
    if (isUpdate) {
      // 演示不刷新表格直接更新內部數據。
      // 注意：updateTableDataRecord要求表格的rowKey屬性為string並且存在於每一行的record的keys中
      // const result = updateTableDataRecord(values.id, values);
    }
    triggerProxy('query');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  // function handleSelect(deptId = '') {
  //   searchInfo.deptId = deptId;
  //   triggerProxy('query');
  // }

  // function handleView(record: Recordable) {
  //   go('/system/account_detail/' + record.id);
  // }
</script>
<style lang="less" scoped></style>
