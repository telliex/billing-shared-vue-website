<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增選單 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否確認刪除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <ButtonModal @register="buttonRegister" @success="handleSuccess" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getButtonList, removeButtonItem } from '/@/api/sys/menu';
  import { NavListItem } from '/@/api/sys/model/menuModel';
  import { columns, searchFormSchema } from './buttons.data';

  import ButtonModal from './ButtonModal.vue';

  export default defineComponent({
    name: 'ButtonDrawer',
    components: {
      BasicDrawer,
      ButtonModal,
      BasicTable,
      TableAction,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const record = ref<NavListItem | null>(null);
      const [buttonRegister, { openModal }] = useModal();
      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        setDrawerProps({ confirmLoading: false });
        record.value = data?.record || null;
        // table data
        reload();
      });

      const [registerTable, { reload, expandAll }] = useTable({
        title: '選單列表',
        api: getButtonList,
        beforeFetch(params) {
          params.belongMenuId = record.value?.id;
          return params;
        },
        immediate: false, // fit with useDrawerInner reload()
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        showTableSetting: false,
        isTreeTable: true,
        pagination: false,
        striped: false,
        useSearchForm: true,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 100,
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
        },
      });

      const getTitle = '選單按鈕';
      const { createMessage } = useMessage();
      function handleCreate() {
        openModal(true, {
          belongMenuId: record.value?.id,
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          belongMenuId: record.value?.id,
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        if (record.children && record.children.length > 0) {
          createMessage.warning('包含子選單，無法刪除');
          return;
        }
        removeButtonItem(record).then(() => {
          createMessage.info('Please reload page to update the menu ! ');
          reload();
        });
      }

      function onFetchSuccess() {
        // 演示默認展開所有表項
        nextTick(expandAll);
      }

      function handleSuccess() {
        createMessage.info('Please reload page to update the menu ! ');
        reload();
      }

      async function handleSubmit() {
        try {
          setDrawerProps({ confirmLoading: true });

          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerTable,
        registerDrawer,
        getTitle,
        handleSubmit,
        handleDelete,
        handleEdit,
        handleCreate,
        onFetchSuccess,
        buttonRegister,
        handleSuccess,
      };
    },
  });
</script>
