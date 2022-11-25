<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:00
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 02:26:15
-->
<template>
  <PageWrapper title="卡片列表示例" content="基礎封裝">
    <CardList :params="params" :api="demoListApi" @get-method="getMethod" @delete="handleDel">
      <template #header>
        <Button type="primary" color="error"> 按鈕1 </Button>
        <Button type="primary" color="success"> 按鈕2 </Button>
      </template>
    </CardList>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { CardList } from '/@/components/CardList';
  import { Button } from '/@/components/Button';
  import { PageWrapper } from '/@/components/Page';
  import { demoListApi } from '/@/api/demo/table';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { notification } = useMessage();
  // 請求api時附帶參數
  const params = {};

  let reload = () => {};
  // 獲取內部fetch方法;
  function getMethod(m: any) {
    reload = m;
  }
  //刪除按鈕事件
  function handleDel(id) {
    console.log(id);
    notification.success({ message: `成功刪除${id}` });
    reload();
  }
</script>
