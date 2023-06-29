<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2023-05-04 22:15:16
 * @LastEditors: Telliex.Chiu Telliex.Chiu@ecliudvalle.com.tw
 * @LastEditTime: 2023-06-29 06:35:15
-->
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
  import { Radio } from 'ant-design-vue';
  import { createNavItem, getNavList, updateNavItem } from '/@/api/demo/system';
  import { NavListItem } from './type';
  import RadioButtonGroup from '/@/components/Form/src/components/RadioButtonGroup.vue';

  export default defineComponent({
    name: 'MenuDrawer',
    components: {
      BasicDrawer,
      BasicForm,
      RadioButtonGroup,
      RadioGroup: Radio.Group,
      RadioButton: Radio.Button,
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
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        record.value = data?.record || null;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
        const treeData = await getNavList({
          status: null,
          menuName: null,
        });
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
          console.log(values);
          let template = {
            id: '',
            type: '',
            menuName: '',
            alias: '',
            description: '',
            permission: '',
            component: '',
            componentName: '',
            routPath: '',
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
