<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:00
 * @LastEditors: Telliex
 * @LastEditTime: 2023-02-16 05:44:07
-->
<template>
  <Card title="專案" v-bind="$attrs">
    <template #extra>
      <a-button type="link" size="small">more</a-button>
    </template>

    <CardGrid v-for="item in items" :key="item" class="!md:w-1/3 !w-full">
      <span class="flex">
        <Icon :icon="item.icon" :color="item.color" size="30" />
        <span class="text-lg ml-4">{{ item.title }}</span>
      </span>
      <div class="flex mt-2 h-10 text-secondary">{{ item.desc }}</div>
      <div class="flex justify-between text-secondary">
        <span>{{ item.group }}</span>
        <span>{{ item.date }}</span>
      </div>
    </CardGrid>
  </Card>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Card } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { groupItems } from './data';

  export default defineComponent({
    components: { Card, CardGrid: Card.Grid, Icon },
    setup() {
      return { items: groupItems };
    },
  });
</script>
