<template>
  <PageWrapper title="密碼強度校驗組件">
    <div class="flex justify-center">
      <div class="demo-wrap p-10">
        <StrengthMeter placeholder="默認" />
        <StrengthMeter placeholder="禁用" disabled />
        <br />
        <StrengthMeter placeholder="隱藏input" :show-input="false" value="!@#qwe12345" />
      </div>
    </div>
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    components: {
      StrengthMeter,
      PageWrapper,
    },
  });
</script>
<style lang="less" scoped>
  .demo-wrap {
    width: 50%;
    background-color: @component-background;
    border-radius: 10px;
  }
</style>
