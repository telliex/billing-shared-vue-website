<template>
  <PageWrapper title="Uploader">
    <a-card title="Upload File" :bordered="false">
      <BasicForm @register="register" class="my-5" />
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  // import { BasicUpload } from '/@/components/Upload';
  // import { useMessage } from '/@/hooks/web/useMessage';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { PageWrapper } from '/@/components/Page';
  import { Alert } from 'ant-design-vue';
  import { upLoad2S3 } from '/@/api/sys/upload';
  import { GetS3TargetUrl, GetDictionaryItems } from '/@/api/sys/system';
  import { Guid } from 'js-guid';
  import { Card } from 'ant-design-vue';
  import axios from 'axios';

  const reportTypeObj = ref<any>([]);
  const targetObj = ref<any>({});
  const checkList = ref<any>([]);
  const schemas: FormSchema[] = [
    {
      field: 'type',
      component: 'ApiSelect',
      label: 'Report Type',
      colProps: {
        span: 8,
      },

      rules: [{ required: true, message: 'Please select the file type' }],
      componentProps: () => {
        return {
          immediate: true,
          api: async () => {
            let results = await GetDictionaryItems({
              trace_id: Guid.newGuid().toString(),
              request_items: [
                {
                  item_type: 'Upload_File',
                  item_key: '',
                  item_key2: '',
                },
              ],
            });
            return new Promise((resolve) => {
              reportTypeObj.value = results[0].response_items;
              resolve(results[0].response_items);
            });
          },
          labelField: 'itemKey',
          // use id as value
          valueField: 'itemValue',
          params: {
            // trace_id: Guid.newGuid().toString(),
          },
          onChange: async (value: any) => {
            console.log(value);
            if (value) {
              let temp = reportTypeObj.value.find((x: any) => x.itemValue === value);
              let BucketName = temp.itemValue.split('/')[0];
              let BucketFileName = `${temp.itemKey.toLowerCase()}.csv`;
              let BucketFolderPath = temp.itemValue
                .split(BucketName + '/')[1]
                .split(BucketFileName)[0];
              targetObj.value = {
                TraceId: Guid.newGuid().toString(),
                file: 'file',
                BucketRegion: import.meta.env.VITE_GLOB_S3_REGION,
                BucketName: BucketName,
                BucketFolderPath: BucketFolderPath,
                BucketFileName: BucketFileName,
              };
              // formData.type = e;
              // billing-dev-tmp-buckup/Account/verify/
              let S3Location = await GetS3TargetUrl({
                trace_id: Guid.newGuid().toString(),
                bucket_region: import.meta.env.VITE_GLOB_S3_REGION,
                bucket_name: BucketName,
                object_key: temp.itemKey2.split(BucketName + '/')[1], // 'Account/verify/ples.json',
                duration: '10',
              });

              let jsonObj = await axios.get(S3Location);
              checkList.value = jsonObj.data.columns;
            } else {
              targetObj.value = {};
              checkList.value = [];
            }
          },
        };
      },
    },
    {
      field: 'file',
      component: 'Upload',
      label: 'File',
      colProps: {
        span: 8,
      },
      rules: [{ required: true, message: 'Please select a file to upload' }],
      componentProps: ({ formModel }) => {
        return {
          disabled: !formModel.type ? true : false,
          api: upLoad2S3,
          maxSize: 30,
          maxNumber: 1,
          showPreviewDrawer: false,
          accept: ['.csv'],
          required: true,
          requiredList: checkList.value,
          upLoadObject: targetObj.value,
        };
      },
    },
  ];
  export default defineComponent({
    components: { PageWrapper, BasicForm, [Alert.name]: Alert, [Card.name]: Card },

    setup() {
      // const { createMessage } = useMessage();
      const [register] = useForm({
        labelWidth: 120,
        schemas,
        actionColOptions: {
          span: 16,
        },
        showResetButton: false,
        showSubmitButton: false,
      });

      return {
        upLoad2S3,
        register,
      };
    },
  });
</script>
