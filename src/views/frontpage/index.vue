<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-10-11 05:15:56
 * @LastEditors: Telliex
 * @LastEditTime: 2022-10-17 08:54:30
-->
<template>
  <div class="p-8"><img src="/src/assets/images/homePage.png" style="width: 800px" /> </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
