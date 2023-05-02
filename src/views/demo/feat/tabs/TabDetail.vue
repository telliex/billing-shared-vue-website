<template>
  <PageWrapper title="Tab詳情頁面">
    <div>{{ index }} - 詳情頁內容在此</div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'TabDetail',
    components: { PageWrapper },
    setup() {
      const route = useRoute();
      const index = route.params?.id ?? -1;
      const { setTitle } = useTabs();

      // 設置標識
      setTitle(`No.${index} - 詳情信息`);
      return {
        index,
      };
    },
  });
</script>
