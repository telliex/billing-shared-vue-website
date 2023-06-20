<template>
  <PageWrapper
    :title="`用戶` + userId + `的資料`"
    content="這是用戶資料詳情頁面。本頁面僅用於演示相同路由在tab中打開多個頁面並且顯示不同的數據"
    contentBackground
    @back="goBack"
  >
    <template #extra>
      <a-button type="primary" danger> 禁用帳號 </a-button>
      <a-button type="primary"> 修改密碼 </a-button>
    </template>
    <template #footer>
      <a-tabs default-active-key="detail" v-model:activeKey="currentKey">
        <a-tab-pane key="detail" tab="用戶資料" />
        <a-tab-pane key="logs" tab="操作日誌" />
      </a-tabs>
    </template>
    <div class="pt-4 m-4 desc-wrap">
      <template v-if="currentKey == 'detail'">
        <div v-for="i in 10" :key="i">這是用戶{{ userId }}資料Tab</div>
      </template>
      <template v-if="currentKey == 'logs'">
        <div v-for="i in 10" :key="i">這是用戶{{ userId }}操作日誌Tab</div>
      </template>
    </div>
  </PageWrapper>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';
  import { useGo } from '/@/hooks/web/usePage';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { Tabs } from 'ant-design-vue';
  export default defineComponent({
    name: 'AccountDetail',
    components: { PageWrapper, ATabs: Tabs, ATabPane: Tabs.TabPane },
    setup() {
      const route = useRoute();
      const go = useGo();
      // 此處可以得到用戶ID
      const userId = ref(route.params?.id);
      const currentKey = ref('detail');
      const { setTitle } = useTabs();
      // TODO
      // 本頁代碼僅作演示，實際應當通過userId從接口獲得用戶的相關資料

      // 設置Tab的標題（不會影響頁面標題）
      setTitle('詳情：用戶' + userId.value);

      // 頁面左側點擊返回鏈接時的操作
      function goBack() {
        // 本例的效果時點擊返回始終跳轉到帳號列表頁，實際應用時可返回上一頁
        go('/system/account');
      }
      return { userId, currentKey, goBack };
    },
  });
</script>

<style></style>
