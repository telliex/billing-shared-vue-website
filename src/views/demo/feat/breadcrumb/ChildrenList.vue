<template>
  <PageWrapper title="層級麵包屑示例" content="子級頁面麵包屑會添加到當前層級後面">
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
