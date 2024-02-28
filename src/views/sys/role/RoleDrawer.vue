<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <div ref="wrapEl">
      <BasicForm @register="registerForm">
        <template #menu="{ model, field }">
          <BasicTree
            v-model:value="model[field]"
            :treeData="treeData"
            :fieldNames="{ children: 'children', title: 'menuName', key: 'id' }"
            checkable
            defaultExpandAll
            :height="300"
            toolbar
            title="Menu Permissions"
            ref="treeRef"
          />
        </template>
      </BasicForm>
    </div>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeItem, TreeActionType } from '/@/components/Tree';
  import { createRoleItem, getRoleListByPage, updateRoleItem } from '/@/api/sys/system';
  import { getNavList } from '/@/api/sys/menu';
  import { RoleListItem } from '/@/api/sys/model/systemModel';
  import { getNavWholeTreeNode } from '/@/api/sys/menu';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useLoading } from '/@/components/Loading';

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

      const treeRef = ref<Nullable<TreeActionType>>(null);

      // loading module
      const wrapEl = ref<ElRef>(null);
      const [openWrapLoading, closeWrapLoading] = useLoading({
        target: wrapEl,
        props: {
          tip: 'Loading...',
          absolute: true,
        },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        setDrawerProps({ confirmLoading: false });

        isUpdate.value = !!data?.isUpdate;
        record.value = data?.record || null;
        // 需要在setFieldsValue之前先填充treeData，否則Tree組件可能會報key not exist警告
        if (unref(treeData).length === 0) {
          let res = (await getNavWholeTreeNode({
            status: 1,
          })) as any as TreeItem[];
          treeData.value = res[0].items;
        }

        // put here to avoid the display required warning
        resetFields();
        if (unref(isUpdate)) {
          openFnWrapLoading();
          if (record.value) {
            if (record.value.menus.length === 0) {
              record.value.menuPermissionArray = [];
            } else {
              record.value.menuPermissionArray = record.value.menus.map((item) => item.value);
            }
          }

          await setFieldsValue({
            ...record.value,
          });
          closeWrapLoading();
        }
      });

      const getTitle = computed(() => (!unref(isUpdate) ? 'Create' : 'Update'));

      async function handleSubmit() {
        try {
          const values = await validate();

          let roleList = await getRoleListByPage({
            roleName: null,
            status: null,
            currentPage: null,
            pageSize: null,
            sortBy: 'ace',
          });

          let menuPermissionArray = values.menuPermissionArray ? values.menuPermissionArray : [];
          let tempArray: any[] = [];
          setDrawerProps({ confirmLoading: true });
          let menuList: any = await getNavList({
            status: 1,
          });

          menuList[0].items.forEach((item) => {
            menuPermissionArray.forEach((item2) => {
              if (item.id === item2) {
                tempArray.push(item.id);
              }
            });
          });

          values.menus = tempArray;

          let template = {
            roleName: '',
            remark: '',
            menus: [],
            status: 1,
          };

          if (!unref(isUpdate)) {
            let checkRoleName = roleList[0].items.filter(
              (item) => item.roleName === values.roleName,
            );
            if (checkRoleName.length !== 0) {
              createMessage.error('The role name already exists');
              return false;
            }
            // let result = Object.assign(template, values);
            await createRoleItem({
              roleName: values.roleName,
              remark: values.remark,
              menus: values.menus,
              status: values.status,
            });
          } else {
            let result = Object.assign(template, record.value, values);

            roleList[0].items.forEach((item) => {
              if (item.id !== result.id && item.roleName === result.roleName) {
                createMessage.error('Role Name already exists');
                return false;
              }
            });
            console.log('update result========:', result);
            await updateRoleItem(result);
          }
          closeDrawer();
          emit('success', { isUpdate: unref(isUpdate) });
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      function openFnWrapLoading() {
        openWrapLoading();
      }

      function getTree() {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      }
      return {
        getTree,
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        treeData,
        openFnWrapLoading,
        wrapEl,
        treeRef,
      };
    },
  });
</script>
