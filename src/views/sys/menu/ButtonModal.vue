<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
    @visible-change="handleVisibleChange"
    @ok="handleSubmit"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :model="model" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick, unref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { createButtonItem, updateButtonItem } from '/@/api/sys/menu';
  import { formSchema } from './buttons.data';
  import { ButtonItem } from '/@/api/sys/model/menuModel';
  export default defineComponent({
    components: { BasicModal, BasicForm },
    props: {
      userData: { type: Object },
    },
    setup(props, { emit }) {
      const modelRef = ref({});
      const isUpdate = ref(true);
      const record = ref<ButtonItem | null>(null);
      const belongMenuId = ref('');
      const getTitle = computed(() => (!unref(isUpdate) ? '新增按鈕權限' : '編輯按鈕權限'));
      const [
        registerForm,
        {
          resetFields,
          setFieldsValue,
          validate,
          // setProps
        },
      ] = useForm({
        labelWidth: 120,
        schemas: formSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });
      const [register, { setModalProps, closeModal }] = useModalInner((data) => {
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        record.value = data?.record || null;
        belongMenuId.value = data?.belongMenuId || null;
        resetFields();
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }

        // data && onDataReceive(data);
      });

      async function handleSubmit() {
        const values = await validate();
        setModalProps({ confirmLoading: true });

        if (!values) {
          return;
        }

        let template = {
          id: '',
          buttonName: '',
          description: '',
          belongMenu: belongMenuId.value,
          permission: '',
          isShow: 1,
          status: 1,
          addMaster: 0,
          addTime: '',
          changeMaster: 0,
          changeTime: '',
        };
        let sendData;
        if (!unref(isUpdate)) {
          sendData = Object.assign(template, values);
        } else {
          sendData = Object.assign(template, record.value, values);
        }
        const api = isUpdate.value ? updateButtonItem : createButtonItem;
        const res = await api(sendData);
        if (res) {
          closeModal();
          emit('success');
        }
        setModalProps({ confirmLoading: false });
      }

      function onDataReceive(data) {
        console.log('Data Received', data);
        // 方式1;
        // setFieldsValue({
        //   field2: data.data,
        //   field1: data.info,
        // });

        // // 方式2
        modelRef.value = { field2: data.data, field1: data.info };

        // setProps({
        //   model:{ field2: data.data, field1: data.info }
        // })
      }

      function handleVisibleChange(v) {
        v && props.userData && nextTick(() => onDataReceive(props.userData));
      }

      return {
        handleSubmit,
        register,
        formSchema,
        registerForm,
        model: modelRef,
        handleVisibleChange,
        getTitle,
      };
    },
  });
</script>
