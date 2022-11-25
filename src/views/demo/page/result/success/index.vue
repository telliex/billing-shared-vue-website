<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:01
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 02:49:50
-->
<template>
  <div class="m-5 result-success">
    <Result
      status="success"
      title="提交成功"
      sub-title="提交結果頁用於反饋一系列操作任務的處理結果， 如果僅是簡單操作，使用 Message 全局提示反饋即可。 本文字區域可以展示簡單的補充説明，如果有類似展示 “單據”的需求，下面這個灰色區域可以呈現比較複雜的內容。"
    >
      <template #extra>
        <a-button key="console" type="primary"> 返回列表 </a-button>
        <a-button key="buy"> 查看項目 </a-button>
        <a-button key="buy"> 打印 </a-button>
      </template>
    </Result>
    <div class="result-success__content">
      <Descriptions title="項目名稱">
        <DescriptionItem label="項目 ID"> 111222 </DescriptionItem>
        <DescriptionItem label="負責人"> ECV </DescriptionItem>
        <DescriptionItem label="生效時間"> 2016-12-12 ~ 2017-12-12 </DescriptionItem>
      </Descriptions>
      <Steps :current="1" progress-dot size="small">
        <Step title="創建項目">
          <template #description>
            <div>ECV</div>
            <p>2016-12-12 12:32</p>
          </template>
        </Step>
        <Step title="部門初審">
          <template #description>
            <p>Chad</p>
          </template>
        </Step>
        <Step title="財務複核" />
        <Step title="完成" />
      </Steps>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Result, Steps, Descriptions } from 'ant-design-vue';
  export default defineComponent({
    components: {
      Result,
      Steps,
      Step: Steps.Step,
      Descriptions,
      DescriptionItem: Descriptions.Item,
    },
  });
</script>
<style lang="less" scoped>
  .result-success {
    padding: 48px 32px;
    background-color: @component-background;

    &__content {
      padding: 24px 40px;
      background-color: @background-color-light;
    }
  }
</style>
