<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:01
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 02:43:12
-->
<template>
  <div class="p-5">
    多層級緩存-頁面2
    <br />
    <Input />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Input } from 'ant-design-vue';
  export default defineComponent({
    name: 'Menu2Demo',
    components: { Input },
  });
</script>
