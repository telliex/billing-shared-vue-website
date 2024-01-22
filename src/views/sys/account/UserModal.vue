<template>
  <BasicModal
    v-bind="$attrs"
    :canFullscreen="false"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    :okButtonProps="{ loading: false }"
  >
    <div ref="wrapEl">
      <BasicForm @register="registerForm" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';

  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { accountFormSchema } from './user.data';
  import { createUserItem, updateUserItem, isUserExist } from '/@/api/sys/system';
  import { UserItem } from '/@/api/sys/model/systemModel';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useLoading } from '/@/components/Loading';

  export default defineComponent({
    name: 'UserModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');
      const record = ref<UserItem | null>(null);
      const { createMessage } = useMessage();
      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: accountFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });
      const getTitle = computed(() => (!unref(isUpdate) ? 'Create' : 'Update'));

      // loading module
      const wrapEl = ref<ElRef>(null);
      const [openWrapLoading, closeWrapLoading] = useLoading({
        target: wrapEl,
        props: {
          tip: 'Loading...',
          absolute: true,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        record.value = data?.record || null;

        if (record.value) {
          data.record['rolesArray'] = data.record['rolesString']
            ? JSON.parse(data.record['rolesString'])
            : [];
        }

        resetFields();
        rowId.value = '';
        if (unref(isUpdate)) {
          openFnWrapLoading();
          rowId.value = data.record.id;
          await setFieldsValue({
            ...data.record,
          });
          closeWrapLoading();
        }

        // const treeData = await getDeptList({
        //   deptName: null,
        //   status: null,
        //   page: null,
        //   pageSize: null,
        // });
        updateSchema([
          {
            field: 'pwd',
            show: !unref(isUpdate),
          },
          // {
          //   field: 'dept',
          //   componentProps: { treeData },
          // },
        ]);
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });

          if (!values) {
            createMessage.error('Required fields are missing！');
            return;
          }

          let isUser = await isUserExist({
            id: rowId.value,
            userName: values.userName,
          });

          if (!isUser) {
            createMessage.error('User name already exists');
            return;
          }
          values.rolesArray = values.rolesArray.map(({ ['option']: _, ...rest }) => rest);
          values.rolesString = JSON.stringify(values.rolesArray);

          // TODO: replace with deptId
          let template = {
            displayName: '',
            avatar: null,
            password: null,
            remark: '',
            status: 1,
            sex: null,
            birthday: null,
            tel: null,
            mobile: null,
            email: null,
            address: null,
            country: null,
          };

          if (isUser) {
            if (!unref(isUpdate)) {
              let result = Object.assign(template, values);
              console.log('resultnew:', result);
              return;
              await createUserItem(result);
            } else {
              console.log('resultold:', Object.assign(template, record.value, values));
              await updateUserItem(Object.assign(template, record.value, values));
            }

            closeModal();
            emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }
      function openFnWrapLoading() {
        openWrapLoading();
      }
      return {
        registerModal,
        registerForm,
        getTitle,
        handleSubmit,
        wrapEl,
        openFnWrapLoading,
      };
    },
  });
</script>
