<template>
  <div class="m-5 result-error">
    <Result status="error" title="提交失敗" sub-title="請核對並修改以下信息後，再重新提交。">
      <template #extra>
        <a-button key="console" type="primary"> 返回修改 </a-button>
      </template>
    </Result>
    <div class="result-error__content">
      <div class="result-error__content-title">您提交的內容有如下錯誤：</div>
      <div class="mb-4">
        <CloseCircleOutlined class="mr-2 result-error__content-icon" />
        您的賬戶已被凍結
        <a class="ml-4">立即解凍 ></a>
      </div>
      <div class="mb-4">
        <CloseCircleOutlined class="mr-2 result-error__content-icon" />
        您的賬戶還不具備申請資格
        <a class="ml-4">立即解凍 ></a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Result } from 'ant-design-vue';
  import { CloseCircleOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    components: {
      Result,
      CloseCircleOutlined,
    },
  });
</script>
<style lang="less" scoped>
  .result-error {
    padding: 48px 32px;
    background-color: @component-background;

    &__content {
      padding: 24px 40px;
      background-color: @background-color-light;

      &-title {
        margin-bottom: 16px;
        font-size: 16px;
        font-weight: 500;
      }

      &-icon {
        color: #ff4d4f;
      }
    }
  }
</style>
