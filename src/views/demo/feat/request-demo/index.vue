<template>
  <div class="request-box">
    <a-button @click="handleClick" type="primary"> 點擊會重新發起請求5次 </a-button>
    <p>打開瀏覽器的network面板，可以看到發出了六次請求</p>
  </div>
</template>
<script lang="ts" setup>
  import { testRetry } from '/@/api/sys/user';
  // @ts-ignore
  const handleClick = async () => {
    await testRetry();
  };
</script>

<style lang="less">
  .request-box {
    margin: 50px;
  }

  p {
    margin-top: 10px;
  }
</style>
