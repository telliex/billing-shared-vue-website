<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> Create </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:edit-twotone',
                onClick: handleEdit.bind(null, record),
                tooltip: 'Edit',
              },
              {
                icon: 'ant-design:delete-twotone',
                // color: 'error',
                // disabled: true,
                popConfirm: {
                  title: 'Are you sure to delete',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
                tooltip: 'Delete',
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getRoleListByPage, removeRoleItem } from '/@/api/sys/system';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useDrawer } from '/@/components/Drawer';
  import RoleDrawer from './RoleDrawer.vue';

  import { columns, searchFormSchema } from './role.data';

  export default defineComponent({
    name: 'Role',
    components: { BasicTable, RoleDrawer, TableAction },
    setup() {
      const [registerDrawer, { openDrawer }] = useDrawer();
      const { createMessage } = useMessage();
      const [registerTable, { reload }] = useTable({
        title: 'Role List',
        api: getRoleListByPage,
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
        pagination: true,
        useSearchForm: true,
        striped: false,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 80,
          title: 'Setting',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: 'right',
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        removeRoleItem(record)
          .then(() => {
            reload();
          })
          .catch(() => {
            createMessage.warning(
              "The role item has already used. Please delete the user's role first",
            );
          });
      }

      function handleSuccess() {
        reload();
        setTimeout(() => {
          window.location.reload();
        }, 200);
      }

      onMounted(() => {});

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
