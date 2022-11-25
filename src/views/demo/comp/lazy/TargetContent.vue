<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:00
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 02:30:22
-->
<template>
  <Card hoverable :style="{ width: '240px', background: '#fff' }">
    <template #cover>
      <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
    </template>
    <CardMeta title="懶加載組件" />
  </Card>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Card } from 'ant-design-vue';

  export default defineComponent({
    components: { CardMeta: Card.Meta, Card },
    setup() {
      return {};
    },
  });
</script>
