<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:00
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 02:29:16
-->
<template>
  <BasicDrawer v-bind="$attrs" title="Modal Title" width="50%" showFooter @ok="handleOk">
    <p class="h-20" v-for="index in 40" :key="index">根據屏幕高度自適應</p>
    <template #insertFooter>
      <a-button> btn</a-button>
    </template>
    <template #centerFooter>
      <a-button> btn2</a-button>
    </template>

    <template #appendFooter>
      <a-button> btn3</a-button>
    </template>

    <!-- <template #footer>
      <a-button> customerFooter</a-button>
    </template> -->
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicDrawer } from '/@/components/Drawer';
  export default defineComponent({
    components: { BasicDrawer },
    setup() {
      return {
        handleOk: () => {
          console.log('=====================');
          console.log('ok');
          console.log('======================');
        },
      };
    },
  });
</script>
