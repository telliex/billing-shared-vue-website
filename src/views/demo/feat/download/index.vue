<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:01
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 02:37:00
-->
<template>
  <PageWrapper title="文件下載示例">
    <a-alert message="根據後台接口文件流下載" />
    <a-button type="primary" class="my-4" @click="handleDownByData"> 文件流下載 </a-button>

    <a-alert message="根據文件地址下載文件" />
    <a-button type="primary" class="my-4" @click="handleDownloadByUrl"> 文件地址下載 </a-button>

    <a-alert message="base64流下載" />
    <a-button type="primary" class="my-4" @click="handleDownloadByBase64"> base64流下載 </a-button>

    <a-alert message="圖片Url下載,如果有跨域問題，需要處理圖片跨域" />
    <a-button type="primary" class="my-4" @click="handleDownloadByOnlineUrl">
      圖片Url下載
    </a-button>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import {
    downloadByUrl,
    downloadByData,
    downloadByBase64,
    downloadByOnlineUrl,
  } from '/@/utils/file/download';
  import imgBase64 from './imgBase64';
  import { PageWrapper } from '/@/components/Page';
  import { Alert } from 'ant-design-vue';

  export default defineComponent({
    components: { PageWrapper, [Alert.name]: Alert },
    setup() {
      function handleDownByData() {
        downloadByData('text content', 'testName.txt');
      }
      function handleDownloadByUrl() {
        downloadByUrl({
          url: 'https://codeload.github.com/anncwb/vue-vben-admin-doc/zip/master',
          target: '_self',
        });

        downloadByUrl({
          url: 'https://www.ecloudvalley.com/img/ECV_logo_CLR.c0439d7d.svg',
          target: '_self',
        });
      }

      function handleDownloadByBase64() {
        downloadByBase64(imgBase64, 'logo.png');
      }

      function handleDownloadByOnlineUrl() {
        downloadByOnlineUrl(
          'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5944817f47b8408e9f1442ece49d68ca~tplv-k3u1fbpfcp-watermark.image',
          'logo.png',
        );
      }
      return {
        handleDownloadByUrl,
        handleDownByData,
        handleDownloadByBase64,
        handleDownloadByOnlineUrl,
      };
    },
  });
</script>
