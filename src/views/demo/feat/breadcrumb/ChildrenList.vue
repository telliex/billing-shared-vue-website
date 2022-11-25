<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:01
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 02:35:20
-->
<template>
  <PageWrapper title="層級麪包屑示例" content="子級頁面麪包屑會添加到當前層級後面">
    <router-link to="/feat/breadcrumb/children/childrenDetail"> 進入子級詳情頁 </router-link>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    components: { PageWrapper },
  });
</script>
