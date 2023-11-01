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
        >
          <a-button type="primary">
            {{ t('component.upload.choose') }}
          </a-button>
        </Upload>
      </div>
      <FileList :dataSource="fileListRef" :columns="columns" :actionColumn="actionColumn" />
    </BasicModal>
    <Modal @register="modalRegister" />
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
  import { isFunction } from '/@/utils/is';
  import { warn } from '/@/utils/log';
  import FileList from './FileList.vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import * as xlsx from 'xlsx';
  import { upLoad2S3 } from '/@/api/sys/upload';

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

      const [modalRegister, { openModal, setModalProps }] = useModal();

      //   是否正在上传
      const isUploadingRef = ref(false);
      const fileListRef = ref<FileItem[]>([]);
      const { accept, helpText, maxNumber, maxSize } = toRefs(props);

      const { t } = useI18n();
      const [register, { closeModal }] = useModalInner();

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
      const checkColumnName = async () => {
        console.log('enter checkColumnName=====');
        if (selectedFile.value) {
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
                    return true;
                  } else {
                    //alert(`The ${cpmpareResult} column name isn't included in the file`);
                    // setModalProps({ columns: cpmpareResult });
                    openModal();
                    // createMessage.error(
                    //   `The ${cpmpareResult.join('|')} column${
                    //     cpmpareResult.length === 1 ? '' : 's'
                    //   } name isn't included in the file`,
                    // );
                    return false;
                  }
                } else {
                  alert('Unable to parse column name');
                  return false;
                }
              } else {
                alert('Unable to parse worksheet');
                return false;
              }
            } else {
              alert('Unable to read file data');
              return false;
            }
          };

          return reader.readAsBinaryString(file);
        } else {
          return false;
          alert('请选择一个文件进行检查');
        }
      };

      // 上传前校验
      async function beforeUpload(file: File) {
        console.log('====props======:', props);
        console.log('=======file=====:', file);
        // openWrapLoading();
        //let result;
        // if (props.required && props.requiredList.length !== 0) {
        //   if (file) {
        //     console.log('have file');
        //     selectedFile.value = file;
        //     result = await checkColumnName();
        //   } else {
        //     console.log('not have file');
        //     result = false;
        //   }
        // }
        // console.log('result:', result);

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

      // 删除
      function handleRemove(record: FileItem) {
        const index = fileListRef.value.findIndex((item) => item.uuid === record.uuid);
        index !== -1 && fileListRef.value.splice(index, 1);
        emit('delete', record);
      }

      // 预览
      // function handlePreview(record: FileItem) {
      //   const { thumbUrl = '' } = record;
      //   createImgPreview({
      //     imageList: [thumbUrl],
      //   });
      // }

      async function uploadApiByItem(item: FileItem) {
        const { api } = props;
        if (!api || !isFunction(api)) {
          return warn('upload api must exist and be a function');
        }
        try {
          item.status = UploadResultStatus.UPLOADING;
          const { data } = await props.api?.(
            {
              data: {
                ...(props.uploadParams || {}),
              },
              file: item.file,
              name: props.name,
              filename: props.filename,
            },
            function onUploadProgress(progressEvent: ProgressEvent) {
              const complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0;
              item.percent = complete;
            },
          );
          item.status = UploadResultStatus.SUCCESS;
          item.responseData = data;
          return {
            success: true,
            error: null,
          };
        } catch (e) {
          console.log(e);
          item.status = UploadResultStatus.ERROR;
          return {
            success: false,
            error: e,
          };
        }
      }

      function objectToFormData(obj) {
        console.log('aaaaa:', obj);
        let formData = new FormData();

        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            console.log('key:', key, 'value:', obj[key]);
            formData.append(key, obj[key]);
          }
        }
        console.log('bbbbbbb:', formData.get('BucketRegion'));
        return formData;
      }

      // 点击开始上传
      async function handleStartUpload() {
        console.log('xxxxxxxxxxxxxxxxxxxxxxxprops:', props);
        console.log('xxxxxxxxxxxxxxxxxxxxxxxfileListRef.value:', fileListRef.value);
        const { maxNumber } = props;
        if ((fileListRef.value.length + props.previewFileList?.length ?? 0) > maxNumber) {
          return createMessage.warning(t('component.upload.maxNumber', [maxNumber]));
        }
        let temp = objectToFormData({ ...props.upLoadObject, file: fileListRef.value[0] });
        console.log('temp111111:', temp);
        let result = await upLoad2S3(temp);
        console.log('result:', result);
        // try {
        //   isUploadingRef.value = true;
        //   // 只上传不是成功状态的
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

      //   点击保存
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
        emit('change', fileList);
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
        modalRegister,
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
