<template>
  <PageWrapper dense contentFullHeight>
    <VxeBasicTable ref="tableRef" v-bind="gridOptions" v-on="gridEvent">
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
      <template #icon="{ row }"> <Icon :icon="row.icon" /> </template>
    </VxeBasicTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
    <ButtonsDrawer @register="registerButtonsDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup name="Menu">
  import { reactive, ref } from 'vue';
  import { ActionItem, TableAction } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { vxeTableColumns, vxeTableFormSchema } from './menu.data';
  import { CollapseContainer } from '/@/components/Container';
  import { Icon } from '/@/components/Icon';

  import {
    BasicTableProps,
    VxeBasicTable,
    VxeGridInstance,
    VxeGridListeners,
    // VxePagerEvents,
    // VxeTableEvents,
  } from '/@/components/VxeTable';
  import { PageWrapper } from '/@/components/Page';

  import { Tag } from 'ant-design-vue';
  import { getNavList, removeNavItem } from '/@/api/sys/menu';
  const { createMessage } = useMessage();
  import MenuDrawer from './MenuDrawer.vue';
  import ButtonsDrawer from './ButtonsDrawer.vue';
  import { useDrawer } from '/@/components/Drawer';
  import { Guid } from 'js-guid/dist/guid';
  // import { Guid } from 'js-guid/dist/guid';
  // const tablePage = reactive({
  //   total: 0,
  //   currentPage: 1,
  //   pageSize: 10,
  // });

  let collapseStatus = ref(false);
  const tableRef = ref<VxeGridInstance>();
  const [registerDrawer, { openDrawer, setDrawerProps }] = useDrawer();
  const [registerButtonsDrawer, { openDrawer: openButtonsDrawer }] = useDrawer();

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
    minHeight: 500,

    showHeaderOverflow: true,
    showOverflow: true,
    border: true,
    stripe: true,

    treeConfig: {
      transform: true,
      rowField: 'id',
      parentField: 'parentMenu',
      expandAll: true,
    },
    columnConfig: {
      resizable: true, // column resizable
    },
    // editConfig: { trigger: 'click', mode: 'cell', showStatus: true },
    columns: vxeTableColumns,
    // sortConfig: {
    //   trigger: 'cell',
    //   remote: true,
    // },
    // filterConfig: {
    //   remote: true,
    // },
    pagerConfig: {
      enabled: false, // hide pager
      // background: true,
      // layouts: ['Total', 'Number', 'Sizes'],
      // currentPage: tablePage.currentPage,
      // pageSize: tablePage.pageSize,
      // pageSizes: [10, 50, 80, 100],
      // total: tablePage.total,
      // autoHidden: false,
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
      sort: false, // 启用排序代理，当点击排序时会自动触发 query 行为
      filter: false, // 启用筛选代理，当点击筛选时会自动触发 query 行为
      // props: {
      //   result: 'results.items',
      //   // total: 'total',
      // },
      ajax: {
        query: async ({ sorts, filters, form }) => {
          console.log('page:', form);
          console.log('sorts:', sorts);
          console.log('filters:', filters);
          console.log('form:', form);

          let result = await getNavList({
            status: form.status === undefined || form.status === null ? null : form.status,
          });

          result.items.forEach((item) => {
            if (item.parentMenu === '') {
              item.parentMenu = null;
            }
          });

          console.log('menu list data :', result);

          return result.items;
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
      {
        label: '',
        tooltip: 'Button permission',
        icon: 'clarity:rack-server-line',
        onClick: handleButtons.bind(null, record),
        disabled: true,
        ifShow: false,
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
    setDrawerProps({
      width: 900,
    });
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  function handleButtons(record: Recordable) {
    openButtonsDrawer(true, {
      record,
    });
  }
  // Delete item
  function handleDelete(record: Recordable) {
    if (record.children && record.children.length > 0) {
      createMessage.warning('Contains submenus, cannot be deleted.');
      return;
    }
    if (record.menuButtons && record.menuButtons !== '') {
      createMessage.warning('Contains menu buttons, cannot be removed.');
      return;
    }
    removeNavItem(record).then(() => {
      createMessage.info('Please reload page to update the menu ! ');
      triggerProxy('query');
      setTimeout(() => {
        window.location.reload();
      }, 200);
    });
  }

  // Create item

  function handleCreate() {
    setDrawerProps({
      width: 900,
    });
    openDrawer(true, {
      isUpdate: false,
    });
  }
  function handleSuccess() {
    createMessage.info('Please reload page to update the menu ! ');
    triggerProxy('query');
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

  // function onFetchSuccess() {
  //   // 演示默認展開所有表項
  //   nextTick(expandAll);
  // }
</script>
<style lang="less" scoped></style>
