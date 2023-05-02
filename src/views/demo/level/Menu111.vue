<template>
  <div class="p-5">
    多層級緩存-頁面1-1-1
    <br />
    <Input />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Input } from 'ant-design-vue';
  export default defineComponent({ name: 'Menu111Demo', components: { Input } });
</script>
