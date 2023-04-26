<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    :width="400"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  // components
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm, FormSchema } from '/@/components/Form/index';
  // hooks
  import { useMessage } from '/@/hooks/web/useMessage';
  // plugins
  import { Guid } from 'js-guid';
  import dayjs, { Dayjs } from 'dayjs';
  import { useI18n } from '/@/hooks/web/useI18n';
  // api
  import { stopContract } from '/@/api/functions/contract';

  export default defineComponent({
    name: 'ContractModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage } = useMessage();
      const isUpdate = ref(false);
      const { t } = useI18n();
      const getTitle = computed(() =>
        !unref(isUpdate)
          ? t('contract.modalNewTerminatedContract')
          : t('contract.modalUpdateTerminatedContract'),
      );
      const schemas: FormSchema[] = [
        {
          field: 'termination_id',
          component: 'Input',
          label: '輸入終止合約編號',
          colProps: {
            span: 24,
          },
          defaultValue: '',
        },
        {
          field: 'termination_id_date',
          component: 'DatePicker',
          label: '輸入終止合約日期',
          colProps: {
            span: 24,
          },
          defaultValue: '',
          componentProps: () => {
            return {
              disabledDate: disabledDate,
            };
          },
        },
        {
          field: 'id',
          component: 'Input',
          label: '',
          show: false,
        },
        {
          field: 'contract_id',
          component: 'Input',
          label: '',
          show: false,
        },
      ];

      let terminationId = '';
      let terminationIdDate = '';

      const [registerForm, { setFieldsValue, resetFields, getFieldsValue }] = useForm({
        labelWidth: 160,
        baseColProps: { span: 20 },
        schemas: schemas,
        showActionButtonGroup: false,
        submitOnReset: true,
        autoFocusFirstItem: true,
        layout: 'vertical',
        size: 'small',
        labelCol: {
          style: {
            padding: '5px 20px',
          },
        },
        wrapperCol: {
          style: {
            padding: '0 100px 5px 20px',
          },
        },
      });

      // no to choice the day before today rull
      const disabledDate = (current: Dayjs) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
      };

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false, canFullscreen: false });
        isUpdate.value = !!data?.isUpdate;

        terminationId = data.record.termination_id;
        terminationIdDate = data.record.termination_id_date
          ? data.record.termination_id_date.replace('T', ' ')
          : '';

        if (unref(isUpdate)) {
          // update
          setFieldsValue({
            termination_id: data.record.termination_id,
            termination_id_date: dayjs(data.record.termination_id_date).format('YYYY-MM-DD'),
            contract_id: data.record.contract_id,
            id: data.record.id,
          });
        } else {
          // create
          setFieldsValue({
            termination_id: '',
            termination_id_date: '',
            contract_id: data.record.contract_id,
            id: data.record.id,
          });
        }
      });

      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          let temp = await getFieldsValue();

          // 排除已是終止狀態且沒不移動資料的情況，送出
          if (
            (!(
              terminationId === temp.termination_id &&
              terminationIdDate === temp.termination_id_date
            ) &&
              unref(isUpdate)) ||
            !unref(isUpdate)
          ) {
            // call API
            stopContract({
              contract_id: temp.contract_id,
              id: temp.id,
              termination_id: temp.termination_id,
              termination_id_date: dayjs(temp.termination_id_date).format('YYYY-MM-DD'),
              trace_id: Guid.newGuid().toString(),
            })
              .then(() => {
                emit('success');
              })
              .catch((e) => {
                createMessage.error(e);
              });
          }

          closeModal();
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
