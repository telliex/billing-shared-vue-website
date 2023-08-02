<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增選單 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:edit-twotone',
                // label: '編輯',
                onClick: handleEdit.bind(null, record),
                tooltip: '編輯選單',
              },
              {
                icon: 'ant-design:delete-twotone',
                // label: '刪除',
                // color: 'error',
                popConfirm: {
                  title: '是否確認刪除',
                  placement: 'top',
                  confirm: handleDelete.bind(null, record),
                },
                tooltip: '刪除此選單',
              },
              {
                icon: 'clarity:rack-server-line',
                // label: '按鈕權限',
                onClick: handleButtons.bind(null, record),
                ifShow: record.type !== 'catalog',
                tooltip: '編輯按鈕權限',
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
    <ButtonsDrawer @register="registerButtonsDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick, onMounted } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getNavList, removeNavItem } from '/@/api/sys/menu';
  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';
  import ButtonsDrawer from './ButtonsDrawer.vue';
  import { columns, searchFormSchema } from './menu.data';

  export default defineComponent({
    name: 'Menu',
    components: { BasicTable, MenuDrawer, ButtonsDrawer, TableAction },
    setup() {
      const [registerDrawer, { openDrawer, setDrawerProps }] = useDrawer();
      // setDrawerProps({
      //   width: 800,
      // });
      const [registerButtonsDrawer, { openDrawer: openButtonsDrawer }] = useDrawer();
      const [registerTable, { reload, expandAll }] = useTable({
        title: '選單列表',
        api: getNavList,
        columns,
        formConfig: {
          showResetButton: false,
          labelWidth: 120,
          schemas: searchFormSchema,
          submitButtonOptions: {
            postIcon: 'ant-design:search-outlined',
            iconSize: 12,
          },
          // resetButtonOptions: {
          //   postIcon: 'ant-design:reload-outlined',
          //   iconSize: 12,
          // },
        },
        showTableSetting: true,
        isTreeTable: true,
        pagination: false,
        striped: false,
        useSearchForm: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 180,
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
        },
      });
      const { createMessage } = useMessage();
      function handleCreate() {
        setDrawerProps({
          width: 900,
        });
        openDrawer(true, {
          isUpdate: false,
        });
      }

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

      function handleDelete(record: Recordable) {
        if (record.children && record.children.length > 0) {
          createMessage.warning('包含子選單，無法刪除');
          return;
        }
        if (record.menuButtons && record.menuButtons !== '') {
          createMessage.warning('包含選單按鈕，無法刪除');
          return;
        }
        removeNavItem(record).then(() => {
          createMessage.info('Please reload page to update the menu ! ');
          reload();
          setTimeout(() => {
            window.location.reload();
          }, 200);
        });
      }

      function handleSuccess() {
        createMessage.info('Please reload page to update the menu ! ');
        reload();
        setTimeout(() => {
          window.location.reload();
        }, 200);
      }

      function onFetchSuccess() {
        // 演示默認展開所有表項
        nextTick(expandAll);
      }

      onMounted(() => {});

      return {
        registerTable,
        registerDrawer,
        registerButtonsDrawer,
        handleButtons,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
      };
    },
  });
</script>
