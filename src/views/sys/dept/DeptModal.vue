<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './dept.data';
  import { TreeItem } from '/@/components/Tree';
  import { createDeptItem, getDeptList, updateDeptItem } from '/@/api/sys/system';
  import { DeptItem } from '/@/api/sys/model/systemModel';
  export default defineComponent({
    name: 'DeptModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const record = ref<DeptItem | null>(null);
      const treeData = ref<TreeItem[]>([]);
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        record.value = data?.record || null;
        resetFields();
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
        treeData.value = (await getDeptList({
          status: null,
          deptName: null,
          page: null,
          pageSize: null,
        })) as unknown as TreeItem[];

        updateSchema({
          field: 'parentDept',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增部門' : '編輯部門'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          let template = {
            deptName: '',
            orderNo: 0,
            remark: '',
            status: 1,
            parentDept: '',
            children: undefined,
            addMaster: 0,
            addTime: '',
            changeMaster: 0,
            changeTime: '',
          };

          if (!unref(isUpdate)) {
            let result = Object.assign(template, values);
            await createDeptItem(result);
          } else {
            await updateDeptItem(Object.assign(template, record.value, values));
          }
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
