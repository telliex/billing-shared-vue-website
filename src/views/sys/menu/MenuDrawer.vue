<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { createNavItem, getNavTreeList, updateNavItem } from '/@/api/sys/menu';
  import { NavListItem } from '/@/api/sys/model/menuModel';

  export default defineComponent({
    name: 'MenuDrawer',
    components: {
      BasicDrawer,
      BasicForm,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const record = ref<NavListItem | null>(null);
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        record.value = data?.record || null;

        const treeData = await getNavTreeList({
          status: null,
          menuName: null,
        });
        // put here to avoid the display required warning
        resetFields();
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }

        updateSchema({
          field: 'parentMenu',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增選單' : '編輯選單'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          if (values.type === 'catalog') {
            if (values.isExt === 1) {
              values.component = 'IFrame';
              values.componentName = 'IFrame';
            } else {
              values.component = 'LAYOUT';
              values.componentName = 'LAYOUT';
            }
          }
          console.log('value11111111:', values);
          let template = {
            id: '',
            type: '',
            menuName: '',
            alias: '',
            description: '',
            permission: '',
            component: '',
            componentName: '',
            routePath: '',
            orderNo: 0,
            icon: '',
            parentId: '',
            iExt: 0,
            isCache: 0,
            isShow: 0,
            status: 'normal',
            addMaster: 0,
            addTime: '',
            changeMaster: 0,
            changeTime: '',
          };
          if (!unref(isUpdate)) {
            await createNavItem(Object.assign(template, values));
          } else {
            await updateNavItem(Object.assign(template, record.value, values));
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
