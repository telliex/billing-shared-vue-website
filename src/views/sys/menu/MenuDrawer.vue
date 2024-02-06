<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <div ref="wrapEl">
      <BasicForm @register="registerForm" />
    </div>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { createNavItem, getNavTreeNodeOnlyCatalog, updateNavItem } from '/@/api/sys/menu';
  import { NavListItem } from '/@/api/sys/model/menuModel';
  import { useLoading } from '/@/components/Loading';

  export default defineComponent({
    name: 'ButtonMenuDrawer',
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
        // put here to avoid the display required warning
        resetFields();
        if (unref(isUpdate)) {
          openFnWrapLoading();
          await setFieldsValue({
            ...data.record,
          });
          closeWrapLoading();
        }

        // if (data.record && data.record.type === 'catalog') {
        //   treeData = treeData.filter((item) => item.title !== data.record.alias);
        // }

        updateSchema({
          field: 'parentMenu',
          component: 'ApiTreeSelect',
          componentProps: {
            api: async () => {
              const results = await getNavTreeNodeOnlyCatalog({
                status: 1,
              });
              return new Promise((resolve) => {
                resolve(results[0].items);
              });
            },
          },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? 'Create' : 'Update'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });

          if (!values.parentMenu) {
            values.parentMenu = '';
          }

          // avoid the path warning
          if (values.isExt === 0) {
            // non-external link
            if (values.type === 0) {
              values.routePath = '/' + values.routePath.replace(/^\/+|\/+$/g, '');
            } else {
              values.routePath = values.routePath.replace(/^\/+|\/+$/g, '');
            }
          }

          if (values.type === 0) {
            if (values.isExt === 1) {
              values.component = 'IFrame';
              values.componentName = 'IFrame';
            } else {
              values.component = 'LAYOUT';
              values.componentName = 'LAYOUT';
            }
          } else {
            // avoid the path gone
            if (!values.component) {
              values.componentName = 'default';
              values.component = '/pages/demo/index';
            }
          }
          let template = {
            type: 0,
            menuName: '',
            description: '',
            component: '',
            componentName: '',
            parentMenu: '',
            routePath: '',
            sortNo: 0,
            icon: '',
            parentId: '',
            isExt: 0,
            status: 1,
          };

          if (!unref(isUpdate)) {
            console.log('menu item send to server:', Object.assign(template, values));
            await createNavItem(Object.assign(template, values));
          } else {
            console.log('menu item send to server:', Object.assign(template, record.value, values));
            console.log('menu item send to server:', { ...template, ...record.value, ...values });
            await updateNavItem({ ...template, ...record.value, ...values });
          }
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }
      function openFnWrapLoading() {
        openWrapLoading();
      }
      return { registerDrawer, registerForm, getTitle, handleSubmit, openFnWrapLoading, wrapEl };
    },
  });
</script>
