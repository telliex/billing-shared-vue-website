<template>
  <div>
    <BasicModal
      width="800px"
      :title="t('component.upload.upload')"
      :okText="t('component.upload.save')"
      v-bind="$attrs"
      @register="register"
      @ok="handleOk"
      :closeFunc="handleCloseFunc"
      :maskClosable="false"
      :keyboard="false"
      class="upload-modal"
      :okButtonProps="getOkButtonProps"
      :cancelButtonProps="{ disabled: isUploadingRef }"
      :canFullscreen="false"
      :showOkBtn="false"
    >
      <template #centerFooter>
        <a-button
          @click="handleStartUpload"
          color="success"
          :disabled="!getIsSelectFile"
          :loading="isUploadingRef"
        >
          {{ getUploadBtnText }}
        </a-button>
      </template>

      <div class="upload-modal-toolbar" ref="wrapEl">
        <Alert :message="getHelpText" type="info" banner class="upload-modal-toolbar__text" />

        <Upload
          :accept="getStringAccept"
          :multiple="multiple"
          :before-upload="beforeUpload"
          :show-upload-list="false"
          class="upload-modal-toolbar__btn"
          :disabled="getIsSelectFile"
        >
          <a-button type="primary" :disabled="getIsSelectFile">
            {{ t('component.upload.choose') }}
          </a-button>
        </Upload>
      </div>
      <FileList :dataSource="fileListRef" :columns="columns" :actionColumn="actionColumn" />
    </BasicModal>
    <Modal @register="errorModalRegister" @close="clearFile" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, toRefs, unref, computed, PropType } from 'vue';
  import { Upload, Alert } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useLoading } from '/@/components/Loading';
  import Modal from './Modal.vue';
  import { useModal } from '/@/components/Modal';
  //   import { BasicTable, useTable } from '/@/components/Table';
  // hooks
  import { useUploadType } from './useUpload';
  import { useMessage } from '/@/hooks/web/useMessage';
  //   types
  import { FileItem, UploadResultStatus } from './typing';
  import { basicProps } from './props';
  import { createTableColumns, createActionColumn } from './data';
  // utils
  import { checkImgType, getBase64WithFile } from './helper';
  import { buildUUID } from '/@/utils/uuid';
  // import { isFunction } from '/@/utils/is';
  // import { warn } from '/@/utils/log';
  import FileList from './FileList.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import * as xlsx from 'xlsx';
  import { upLoad2S3 } from '/@/api/sys/upload';
  import { useTabs } from '/@/hooks/web/useTabs';

  export default defineComponent({
    components: { BasicModal, Upload, Alert, FileList, Modal },
    props: {
      ...basicProps,
      previewFileList: {
        type: Array as PropType<string[]>,
        default: () => [],
      },
    },
    emits: ['change', 'register', 'delete'],
    setup(props, { emit }) {
      const state = reactive<{ fileList: FileItem[] }>({
        fileList: [],
      });

      const selectedFile = ref<File | null>(null);
      const workbook = ref<xlsx.WorkBook | null>(null);
      const columnNames = ref<string[]>([]);

      const [errorModalRegister, { openModal: openErrorModal }] = useModal();

      //   是否正在上传
      const isUploadingRef = ref(false);
      const fileListRef = ref<FileItem[]>([]);
      const { accept, helpText, maxNumber, maxSize } = toRefs(props);

      const { t } = useI18n();
      const [register, { closeModal }] = useModalInner();

      // handle the tab reload
      const { refreshPage } = useTabs();

      const { getStringAccept, getHelpText } = useUploadType({
        acceptRef: accept,
        helpTextRef: helpText,
        maxNumberRef: maxNumber,
        maxSizeRef: maxSize,
      });

      // loading module
      const wrapEl = ref<ElRef>(null);
      const [openWrapLoading, closeWrapLoading] = useLoading({
        target: wrapEl,
        props: {
          tip: 'Loading...',
          absolute: false,
          theme: 'dark',
        },
      });

      const { createMessage } = useMessage();

      const getIsSelectFile = computed(() => {
        return (
          fileListRef.value.length > 0 &&
          !fileListRef.value.every((item) => item.status === UploadResultStatus.SUCCESS)
        );
      });

      const getOkButtonProps = computed(() => {
        const someSuccess = fileListRef.value.some(
          (item) => item.status === UploadResultStatus.SUCCESS,
        );
        return {
          disabled: isUploadingRef.value || fileListRef.value.length === 0 || !someSuccess,
        };
      });

      const getUploadBtnText = computed(() => {
        const someError = fileListRef.value.some(
          (item) => item.status === UploadResultStatus.ERROR,
        );
        return isUploadingRef.value
          ? t('component.upload.uploading')
          : someError
          ? t('component.upload.reUploadFailed')
          : t('component.upload.startUpload');
      });

      function getElementsInBNotInA(A: string[], B: string[]) {
        const result: string[] = [];

        for (const element of B) {
          if (!A.includes(element)) {
            result.push(element);
          }
        }
        closeWrapLoading();
        return result;
      }

      // rules
      const checkColumnName = () => {
        return new Promise((resolve, reject) => {
          console.log('enter checkColumnName 1=====');
          if (selectedFile.value) {
            console.log('enter checkColumnName 2=====');
            const file = selectedFile.value;
            const reader = new FileReader();

            reader.onload = (e: ProgressEvent<FileReader>) => {
              const data = e.target?.result as string | null;
              if (data) {
                workbook.value = xlsx.read(data, { type: 'binary' });
                if (workbook.value) {
                  const sheet = workbook.value.Sheets[workbook.value.SheetNames[0]];
                  const parsedData = xlsx.utils.sheet_to_json(sheet, {
                    header: 1,
                  });
                  if (Array.isArray(parsedData) && parsedData) {
                    columnNames.value = parsedData[0] as []; // 转换为字符串数组
                    console.log('A-file columns:', columnNames.value);
                    console.log('B-props.requiredList:', props.requiredList);
                    let cpmpareResult = getElementsInBNotInA(columnNames.value, props.requiredList);

                    if (cpmpareResult.length === 0) {
                      // alert(`perfect!`);
                      createMessage.success('perfect!');
                      resolve(true);
                    } else {
                      //alert(`The ${cpmpareResult} column name isn't included in the file`);

                      openErrorModal(true, { columns: cpmpareResult });

                      // createMessage.error(
                      //   `The ${cpmpareResult.join('|')} column${
                      //     cpmpareResult.length === 1 ? '' : 's'
                      //   } name isn't included in the file`,
                      // );
                      resolve(false);
                    }
                  } else {
                    alert('Unable to parse column name');
                    reject('Unable to parse column name');
                  }
                } else {
                  alert('Unable to parse worksheet');
                  reject('Unable to parse worksheet');
                }
              } else {
                alert('Unable to read file data');
                reject('Unable to read file data');
              }
            };

            reader.onerror = (error) => {
              reject(error);
            };

            return reader.readAsBinaryString(file);
          } else {
            reject('Please select a file to check');
            alert('Please select a file to check');
          }
        });
      };

      // 上传前校验
      async function beforeUpload(file: File) {
        console.log('====props======:', props);
        console.log('=======file=====:', file);
        openWrapLoading();
        let result;
        if (props.required && props.requiredList.length !== 0) {
          if (file) {
            console.log('have file');
            selectedFile.value = file;
            result = await checkColumnName();
          } else {
            console.log('not have file');
            result = false;
          }
        }
        console.log('result:', result);

        // return false;
        const { size, name } = file;
        const { maxSize } = props;
        // 设置最大值，则判断
        if (maxSize && file.size / 1024 / 1024 >= maxSize) {
          createMessage.error(t('component.upload.maxSizeMultiple', [maxSize]));
          return false;
        }

        const commonItem = {
          uuid: buildUUID(),
          file,
          size,
          name,
          percent: 0,
          type: name.split('.').pop(),
        };
        // 生成图片缩略图
        if (checkImgType(file)) {
          // beforeUpload，如果异步会调用自带上传方法
          // file.thumbUrl = await getBase64(file);
          getBase64WithFile(file).then(({ result: thumbUrl }) => {
            fileListRef.value = [
              ...unref(fileListRef),
              {
                thumbUrl,
                ...commonItem,
              },
            ];
          });
        } else {
          fileListRef.value = [...unref(fileListRef), commonItem];
        }
        return false;
      }

      // Action - Delete
      function handleRemove(record: FileItem) {
        const index = fileListRef.value.findIndex((item) => item.uuid === record.uuid);
        index !== -1 && fileListRef.value.splice(index, 1);
        emit('delete', record);
      }

      // Action - Preview
      // function handlePreview(record: FileItem) {
      //   const { thumbUrl = '' } = record;
      //   createImgPreview({
      //     imageList: [thumbUrl],
      //   });
      // }

      // async function uploadApiByItem(item: FileItem) {
      //   const { api } = props;
      //   if (!api || !isFunction(api)) {
      //     return warn('upload api must exist and be a function');
      //   }
      //   try {
      //     item.status = UploadResultStatus.UPLOADING;
      //     const { data } = await props.api?.(
      //       {
      //         data: {
      //           ...(props.uploadParams || {}),
      //         },
      //         file: item.file,
      //         name: props.name,
      //         filename: props.filename,
      //       },
      //       function onUploadProgress(progressEvent: ProgressEvent) {
      //         const complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
      //         item.percent = complete;
      //       },
      //     );
      //     item.status = UploadResultStatus.SUCCESS;
      //     item.responseData = data;
      //     return {
      //       success: true,
      //       error: null,
      //     };
      //   } catch (e) {
      //     console.log(e);
      //     item.status = UploadResultStatus.ERROR;
      //     return {
      //       success: false,
      //       error: e,
      //     };
      //   }
      // }

      // JSON to FormData
      function objectToFormData(obj) {
        let formData = new FormData();
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            formData.append(key, obj[key]);
          }
        }
        return formData;
      }

      // Click [Start upload] Button to upload
      async function handleStartUpload() {
        const { maxNumber } = props;
        if ((fileListRef.value.length + props.previewFileList?.length ?? 0) > maxNumber) {
          return createMessage.warning(t('component.upload.maxNumber', [maxNumber]));
        }

        let result = await upLoad2S3(
          objectToFormData({ ...props.upLoadObject, file: fileListRef.value[0].file }),
        );

        if (result === 'success') {
          createMessage.success('upload success');
        } else {
          createMessage.error('upload failed');
        }

        closeModal();
        // reload the page
        setTimeout(() => {
          refreshPage();
        }, 1000);

        // try {
        //   isUploadingRef.value = true;
        //   // only upload the file which status is not success
        //   const uploadFileList =
        //     fileListRef.value.filter((item) => item.status !== UploadResultStatus.SUCCESS) || [];
        //   const data = await Promise.all(
        //     uploadFileList.map((item) => {
        //       return uploadApiByItem(item);
        //     }),
        //   );
        //   isUploadingRef.value = false;
        //   // 生产环境:抛出错误
        //   const errorList = data.filter((item: any) => !item.success);
        //   if (errorList.length > 0) throw errorList;
        // } catch (e) {
        //   isUploadingRef.value = false;
        //   throw e;
        // }
      }

      //  [x] Click [Save] Button to save
      function handleOk() {
        const { maxNumber } = props;

        if (fileListRef.value.length > maxNumber) {
          return createMessage.warning(t('component.upload.maxNumber', [maxNumber]));
        }
        if (isUploadingRef.value) {
          return createMessage.warning(t('component.upload.saveWarn'));
        }
        const fileList: string[] = [];

        for (const item of fileListRef.value) {
          const { status, responseData } = item;
          if (status === UploadResultStatus.SUCCESS && responseData) {
            fileList.push(responseData.url);
          }
        }
        // 存在一个上传成功的即可保存
        if (fileList.length <= 0) {
          return createMessage.warning(t('component.upload.saveError'));
        }
        fileListRef.value = [];
        closeModal();
      }

      // 点击关闭：则所有操作不保存，包括上传的
      async function handleCloseFunc() {
        if (!isUploadingRef.value) {
          fileListRef.value = [];
          return true;
        } else {
          createMessage.warning(t('component.upload.uploadWait'));
          return false;
        }
      }

      return {
        selectedFile,
        columns: createTableColumns() as any[],
        actionColumn: createActionColumn(handleRemove) as any,
        register,
        closeModal,
        getHelpText,
        getStringAccept,
        getOkButtonProps,
        beforeUpload,
        // registerTable,
        fileListRef,
        state,
        isUploadingRef,
        handleStartUpload,
        handleOk,
        handleCloseFunc,
        getIsSelectFile,
        getUploadBtnText,
        t,
        wrapEl,
        errorModalRegister,
        clearFile: () => {
          fileListRef.value = [];
        },
      };
    },
  });
</script>
<style lang="less">
  .upload-modal {
    .ant-upload-list {
      display: none;
    }

    .ant-table-wrapper .ant-spin-nested-loading {
      padding: 0;
    }

    &-toolbar {
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      &__btn {
        margin-left: 8px;
        text-align: right;
        flex: 1;
      }
    }
  }
</style>
