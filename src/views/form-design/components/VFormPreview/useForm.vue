<!--
 * @Description: 使用vbenForm的功能進行渲染
-->
<template>
  <Modal
    title="預覽(不支持佈局)"
    :visible="state.visible"
    @ok="handleGetData"
    @cancel="handleCancel"
    okText="獲取數據"
    cancelText="關閉"
    style="top: 20px"
    :destroyOnClose="true"
    :width="900"
  >
    <BasicForm v-bind="attrs" @register="registerForm" />
    <JsonModal ref="jsonModal" />
  </Modal>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { reactive, ref, computed } from 'vue';
  import { IFormConfig } from '../../typings/v-form-component';
  import { IAnyObject } from '../../typings/base-type';
  import JsonModal from '../VFormDesign/components/JsonModal.vue';
  import { IToolbarMethods } from '../../typings/form-type';
  import { Modal } from 'ant-design-vue';

  const jsonModal = ref<IToolbarMethods | null>(null);
  const state = reactive<{
    formModel: IAnyObject;
    visible: boolean;
    formConfig: IFormConfig;
  }>({
    formModel: {},
    formConfig: {} as IFormConfig,
    visible: false,
  });

  const attrs = computed(() => {
    return {
      ...state.formConfig,
    } as Recordable;
  });

  /**
   * 顯示Json數據彈框
   * @param jsonData
   */
  const showModal = (jsonData: IFormConfig) => {
    state.formConfig = jsonData;
    state.visible = true;
  };

  //表單
  const [registerForm, { validate }] = useForm();

  const handleCancel = () => {
    state.visible = false;
  };
  /**
   * 獲取表單數據
   * @return {Promise<void>}
   */
  const handleGetData = async () => {
    let data = await validate();
    jsonModal.value?.showModal?.(data);
  };

  defineExpose({ showModal });
</script>
