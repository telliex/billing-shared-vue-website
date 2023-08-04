<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { accountFormSchema } from './user.data';
  import { getDeptList, createUserItem, updateUserItem, isUserExist } from '/@/api/sys/system';
  import { UserItem } from '/@/api/sys/model/systemModel';
  import { useMessage } from '/@/hooks/web/useMessage';

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

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        record.value = data?.record || null;

        data.record['rolesArray'] = data.record['rolesString']
          ? JSON.parse(data.record['rolesString'])
          : [];
        console.log('9999999', data.record);
        resetFields();
        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }

        const treeData = await getDeptList({
          deptName: null,
          status: null,
          page: null,
          pageSize: null,
        });
        updateSchema([
          {
            field: 'pwd',
            show: !unref(isUpdate),
          },
          {
            field: 'dept',
            componentProps: { treeData },
          },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增帳號' : '編輯帳號'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          let isUser = await isUserExist({
            id: rowId.value,
            userName: values.userName,
          });

          if (!isUser) {
            console.log('isUser:', isUser);
            createMessage.error('帳號已存在');
            return;
          }
          // TODO custom api

          // let rolesTemp: string[] = [];
          // values.rolesArray.forEach((item: any) => {
          //   // rolesArray.push(item.value);
          //   rolesTemp.push(item.label);
          // });
          // values.roles = JSON.stringify(rolesTemp);
          values.rolesString = JSON.stringify(values.rolesArray);

          let template = {
            id: '',
            userName: '',
            realName: '',
            nickname: '',
            email: '',
            remark: '',
            rolesString: '',
            roles: [],
            status: 1,
            addMaster: 0,
            addTime: '',
            changeMaster: 0,
            changeTime: '',
          };

          if (!unref(isUpdate)) {
            let result = Object.assign(template, values);
            console.log('result:', result);
            await createUserItem(result);
          } else {
            console.log('result:', Object.assign(template, record.value, values));
            await updateUserItem(Object.assign(template, record.value, values));
          }

          closeModal();
          emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
