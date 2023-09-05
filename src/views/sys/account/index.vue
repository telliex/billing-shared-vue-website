<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <!-- <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" /> -->
    <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate" disabled>Create</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:info-circle-twotone',
                tooltip: 'View',
                ifShow: false,
                onClick: handleView.bind(null, record),
                disabled: true,
              },
              {
                icon: 'ant-design:edit-twotone',
                tooltip: 'Edit',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-twotone',
                // color: 'error',
                tooltip: 'Delete',
                disabled: true,
                popConfirm: {
                  title: 'Are you sure to delete',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <UserModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getUserList, removeUserItem } from '/@/api/sys/system';
  import { PageWrapper } from '/@/components/Page';
  // import DeptTree from './DeptTree.vue';

  import { useModal } from '/@/components/Modal';
  import UserModal from './UserModal.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { columns, searchFormSchema } from './user.data';
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    name: 'User',
    components: { BasicTable, PageWrapper, UserModal, TableAction },
    setup() {
      const go = useGo();
      const [registerModal, { openModal }] = useModal();
      const searchInfo = reactive<Recordable>({});
      const { t } = useI18n();
      const [registerTable, { reload, updateTableDataRecord }] = useTable({
        title: 'Account List',
        api: getUserList,
        rowKey: 'id',
        columns,
        formConfig: {
          showResetButton: false,
          labelWidth: 120,
          schemas: searchFormSchema,
          // autoSubmitOnEnter: true,
          submitButtonOptions: {
            postIcon: 'ant-design:search-outlined',
            iconSize: 12,
          },
          resetButtonOptions: {
            postIcon: 'ant-design:reload-outlined',
            iconSize: 12,
          },
        },
        filterTitle: t('report.searchAreaTitle'),
        useSearchForm: true,
        showTableSetting: false,
        bordered: true,
        handleSearchInfoFn(info) {
          return info;
        },
        actionColumn: {
          width: 120,
          title: 'Setting',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        removeUserItem(record).then(() => {
          reload();
        });
      }

      function handleSuccess({ isUpdate, values }) {
        if (isUpdate) {
          // 演示不刷新表格直接更新內部數據。
          // 注意：updateTableDataRecord要求表格的rowKey屬性為string並且存在於每一行的record的keys中
          const result = updateTableDataRecord(values.id, values);
          console.log('成功:', result);
        }
        reload();

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }

      function handleSelect(deptId = '') {
        searchInfo.deptId = deptId;
        reload();
      }

      function handleView(record: Recordable) {
        go('/system/account_detail/' + record.id);
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleSelect,
        handleView,
        searchInfo,
      };
    },
  });
</script>
