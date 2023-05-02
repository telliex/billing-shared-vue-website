<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2023-05-01 23:22:19
 * @LastEditors: Telliex
 * @LastEditTime: 2023-05-02 01:20:08
-->
<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';

  import 'dayjs/locale/zh-tw';
  // support Multi-language
  const { getAntdLocale } = useLocale();

  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
