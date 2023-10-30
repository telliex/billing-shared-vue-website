<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-10-11 05:15:56
 * @LastEditors: Telliex
 * @LastEditTime: 2023-03-08 02:21:17
-->
<template>
  <div class="p-8"><img src="/src/assets/images/homePage.jpg" style="width: 800px" /> </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
<script lang="ts">
  export default {
    name: 'Home',
  };
</script>
