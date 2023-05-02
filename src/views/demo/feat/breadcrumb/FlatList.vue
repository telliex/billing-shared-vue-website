<template>
  <PageWrapper title="平級麵包屑示例" content="子級頁面麵包屑會覆蓋當前層級">
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
