<!--
 * @Description: 導入JSON模板
-->
<template>
  <Modal
    title="JSON數據"
    :visible="visible"
    @ok="handleImportJson"
    @cancel="handleCancel"
    cancelText="關閉"
    :destroyOnClose="true"
    wrapClassName="v-code-modal"
    style="top: 20px"
    :width="850"
  >
    <p class="hint-box">導入格式如下:</p>
    <div class="v-json-box">
      <CodeEditor v-model:value="json" ref="myEditor" :mode="MODE.JSON" />
    </div>

    <template #footer>
      <a-button @click="handleCancel">取消</a-button>
      <Upload
        class="upload-button"
        :beforeUpload="beforeUpload"
        :showUploadList="false"
        accept="application/json"
      >
        <a-button type="primary">導入json文件</a-button>
      </Upload>
      <a-button type="primary" @click="handleImportJson">確定</a-button>
    </template>
  </Modal>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  // import message from '../../../utils/message';
  import { useFormDesignState } from '../../../hooks/useFormDesignState';
  // import { codemirror } from 'vue-codemirror-lite';
  import { IFormConfig } from '../../../typings/v-form-component';
  import { formItemsForEach, generateKey } from '../../../utils';
  import { CodeEditor, MODE } from '/@/components/CodeEditor';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Upload, Modal } from 'ant-design-vue';

  export default defineComponent({
    name: 'ImportJsonModal',
    components: {
      CodeEditor,
      Upload,
      Modal,
    },
    setup() {
      const { createMessage } = useMessage();

      const state = reactive({
        visible: false,
        json: `{
  "schemas": [
    {
      "component": "input",
      "label": "輸入框",
      "field": "input_2",
      "span": 24,
      "props": {
        "type": "text"
      }
    }
  ],
  "layout": "horizontal",
  "labelLayout": "flex",
  "labelWidth": 100,
  "labelCol": {},
  "wrapperCol": {}
}`,
        jsonData: {
          schemas: {},
          config: {},
        },
        handleSetSelectItem: null,
      });
      const { formDesignMethods } = useFormDesignState();
      const handleCancel = () => {
        state.visible = false;
      };
      const showModal = () => {
        state.visible = true;
      };
      const handleImportJson = () => {
        // 導入JSON
        try {
          const editorJsonData = JSON.parse(state.json) as IFormConfig;
          editorJsonData.schemas &&
            formItemsForEach(editorJsonData.schemas, (formItem) => {
              generateKey(formItem);
            });
          formDesignMethods.setFormConfig({
            ...editorJsonData,
            activeKey: 1,
            currentItem: { component: '' },
          });
          handleCancel();
          createMessage.success('導入成功');
        } catch {
          createMessage.error('導入失敗，數據格式不對');
        }
      };
      const beforeUpload = (e: File) => {
        // 通過json文件導入
        const reader = new FileReader();
        reader.readAsText(e);
        reader.onload = function () {
          state.json = this.result as string;
          handleImportJson();
        };
        return false;
      };

      return {
        handleImportJson,
        beforeUpload,
        handleCancel,
        showModal,
        ...toRefs(state),
        MODE,
      };
    },
  });
</script>

<style lang="less" scoped>
  .upload-button {
    margin: 0 10px;
  }
</style>
