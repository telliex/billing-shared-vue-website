<template>
  <div>
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
    </VxeBasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import { ActionItem, TableAction } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { vxeTableColumns, vxeTableFormSchema } from './role.data';
  import {
    BasicTableProps,
    VxeBasicTable,
    VxeGridInstance,
    VxeGridListeners,
    VxePagerEvents,
    VxeTableEvents,
  } from '/@/components/VxeTable';

  import { Tag } from 'ant-design-vue';
  import { getRoleListByPage, removeRoleItem } from '/@/api/sys/system';
  const { createMessage } = useMessage();
  import RoleDrawer from './RoleDrawer.vue';
  import { useDrawer } from '/@/components/Drawer';
  import { Guid } from 'js-guid/dist/guid';
  import XEUtils from 'xe-utils';
  const tablePage = reactive({
    total: 0,
    currentPage: 1,
    pageSize: 10,
  });

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
      pageSizes: [5, 10, 15, 20, 50],
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
      enabled: true,
      items: vxeTableFormSchema,
    },
    proxyConfig: {
      autoLoad: true,
      sort: true, // 启用排序代理，当点击排序时会自动触发 query 行为
      filter: true, // 启用筛选代理，当点击筛选时会自动触发 query 行为
      props: {
        result: 'results',
        total: 'page.total',
      },
      ajax: {
        query: async ({ page, sorts, filters, form }) => {
          console.log('page:', form);
          console.log('sorts:', sorts);
          console.log('filters:', filters);
          console.log('form:', form);

          const queryParams: any = Object.assign({}, form);
          // 处理排序条件
          const firstSort = sorts[0];
          if (firstSort) {
            queryParams.sort = firstSort.field;
            queryParams.order = firstSort.order;
          }

          let result = await getRoleListByPage({
            page: page.currentPage,
            pageSize: page.pageSize || 10,
            ...form,
          });
          console.log('XEUtils.serialize(queryParams):', XEUtils.serialize(queryParams));
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

  const handlePageChange: VxePagerEvents.PageChange = ({ currentPage, pageSize }) => {
    console.log('zzzzzz:', currentPage, pageSize);
    tablePage.currentPage = currentPage;
    tablePage.pageSize = pageSize;
    findList();
  };

  const findList = () => {
    gridOptions.loading = true;
    setTimeout(() => {
      gridOptions.loading = false;
      tablePage.total = 10;
    }, 300);
  };

  const sortChangeEvent: VxeTableEvents.SortChange = ({ sortList }) => {
    console.info(sortList.map((item) => `${item.field},${item.order}`).join('; '));
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

  onMounted(() => {
    const { columns } = gridOptions;
    console.log('111111:', columns);
  });
</script>
<style lang="less" scoped></style>
