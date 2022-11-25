<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:01
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 02:39:13
-->
<template>
  <PageWrapper
    title="登錄過期示例"
    content="用户登錄過期示例，不再跳轉登錄頁，直接生成頁面覆蓋當前頁面，方便保持過期前的用户狀態！"
  >
    <a-card title="請點擊下面的按鈕訪問測試接口" extra="所訪問的接口會返回Token過期響應">
      <a-card-grid style="width: 50%; text-align: center">
        <a-button type="primary" @click="test1">HttpStatus == 401</a-button>
      </a-card-grid>
      <a-card-grid style="width: 50%; text-align: center">
        <span></span>
        <a-button class="ml-4" type="primary" @click="test2">Response.code == 401</a-button>
      </a-card-grid>
    </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { useUserStore } from '/@/store/modules/user';

  import { sessionTimeoutApi, tokenExpiredApi } from '/@/api/demo/account';
  import { Card } from 'ant-design-vue';

  export default defineComponent({
    name: 'TestSessionTimeout',
    components: { ACardGrid: Card.Grid, ACard: Card, PageWrapper },
    setup() {
      const userStore = useUserStore();
      async function test1() {
        // 示例網站生產環境用的是mock數據，不能返回Http狀態碼，
        // 所以在生產環境直接改變狀態來達到測試效果
        if (import.meta.env.PROD) {
          userStore.setToken(undefined);
          userStore.setSessionTimeout(true);
        } else {
          // 這個api會返回狀態碼為401的響應
          await sessionTimeoutApi();
        }
      }

      async function test2() {
        // 這個api會返回code為401的json數據，Http狀態碼為200
        try {
          await tokenExpiredApi();
        } catch (err) {
          console.log('接口訪問錯誤：', (err as Error).message || '錯誤');
        }
      }

      return { test1, test2 };
    },
  });
</script>
