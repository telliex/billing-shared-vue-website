<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:01
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 02:35:54
-->
<template>
  <PageWrapper title="平級麪包屑示例" content="子級頁面麪包屑會覆蓋當前層級">
    <router-link to="/feat/breadcrumb/flatDetail"> 進入平級詳情頁 </router-link>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    components: { PageWrapper },
  });
</script>
