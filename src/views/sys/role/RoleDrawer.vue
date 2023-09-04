<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :fieldNames="{ title: 'title', key: 'id' }"
          checkable
          :height="300"
          toolbar
          title="Permissions"
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { createRoleItem, getRoleListByPage, updateRoleItem } from '/@/api/sys/system';
  import { getNavTreeListWithButton } from '/@/api/sys/menu';
  import { RoleListItem } from '/@/api/sys/model/systemModel';
  import { getNavList } from '/@/api/sys/menu';
  import { useMessage } from '/@/hooks/web/useMessage';
  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const treeData = ref<TreeItem[]>([]);
      const record = ref<RoleListItem | null>(null);
      const { createMessage } = useMessage();
      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        record.value = data?.record || null;
        // 需要在setFieldsValue之前先填充treeData，否則Tree組件可能會報key not exist警告
        if (unref(treeData).length === 0) {
          treeData.value = (await getNavTreeListWithButton({
            status: 1,
            menuName: null,
            alias: null,
          })) as any as TreeItem[];
        }
        // put here to avoid the display required warning
        resetFields();
        if (unref(isUpdate)) {
          if (record.value) {
            let menuList: any = await getNavList({
              menuName: null,
              alias: null,
              status: 1,
            });
            let menuIdList = menuList.map((item) => item.id);
            record.value.menuPermissionArray = record.value.menuPermissionArray
              ? record.value.menuPermissionArray
              : [];

            if (record.value.menuPermissionArray.length !== 0) {
              record.value.menuPermissionArray = record.value.menuPermissionArray.filter((item) =>
                menuIdList.includes(item),
              );
            }
          }

          setFieldsValue({
            ...record.value,
          });
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? 'Create' : 'Edit'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // let menuList: any = await getNavList({
          //   menuName: null,
          //   alias: null,
          //   status: 1,
          // });
          // let menuIdList = menuList.map((item) => item.id);
          // // TODO custom api
          // // transform values
          // values.menuPermissionArray = values.menuPermissionArray ? values.menuPermissionArray : [];

          // if (values.menuPermissionArray.length !== 0) {
          //   values.menuPermissionArray = values.menuPermissionArray.filter((item) =>
          //     menuIdList.includes(item),
          //   );
          // }

          values.menuPermission = values.menuPermissionArray.length
            ? values.menuPermissionArray.join(',')
            : '';
          values.orderNo = Number(values.orderNo);

          let template = {
            id: '',
            roleName: '',
            roleValue: '',
            orderNo: 0,
            remark: '',
            menuPermission: '',
            menuPermissionArray: [],
            status: 1,
            addMaster: 0,
            addTime: '',
            changeMaster: 0,
            changeTime: '',
          };

          let roleList = await getRoleListByPage({
            roleName: null,
            status: null,
            page: null,
            pageSize: null,
          });
          console.log('1111111:', values);
          console.log('2222222:', roleList);

          if (!unref(isUpdate)) {
            let result = Object.assign(template, values);
            await createRoleItem(result);
          } else {
            let result = Object.assign(template, record.value, values);
            let checkRepeat = false;
            roleList.results.forEach((item) => {
              if (item.id !== result.id && item.roleName === result.roleName) {
                checkRepeat = true;
              }
            });
            if (!checkRepeat) {
              await updateRoleItem(result);
            } else {
              createMessage.error('Role Value already exists');
              return false;
            }
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        treeData,
      };
    },
  });
</script>
