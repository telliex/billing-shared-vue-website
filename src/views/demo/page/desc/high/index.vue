<template>
  <PageWrapper title="單號：234231029431" contentBackground>
    <template #extra>
      <a-button> 操作一 </a-button>
      <a-button> 操作二 </a-button>
      <a-button type="primary"> 主操作 </a-button>
    </template>

    <template #footer>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="詳情" />
        <a-tab-pane key="2" tab="規則" />
      </a-tabs>
    </template>

    <div class="pt-4 m-4 desc-wrap">
      <a-descriptions size="small" :column="2">
        <a-descriptions-item label="創建人"> 曲麗麗 </a-descriptions-item>
        <a-descriptions-item label="訂購產品"> XX 服務 </a-descriptions-item>
        <a-descriptions-item label="創建時間"> 2017-01-10 </a-descriptions-item>
        <a-descriptions-item label="關聯單據">
          <a>12421</a>
        </a-descriptions-item>
        <a-descriptions-item label="生效日期"> 2017-07-07 ~ 2017-08-08 </a-descriptions-item>
        <a-descriptions-item label="備註"> 請於兩個工作日內確認 </a-descriptions-item>
      </a-descriptions>
      <a-card title="流程進度" :bordered="false">
        <a-steps :current="1" progress-dot size="small">
          <a-step title="創建項目">
            <template #description>
              <div>Vben</div>
              <p>2016-12-12 12:32</p>
            </template>
          </a-step>
          <a-step title="部門初審">
            <template #description>
              <p>Chad</p>
            </template>
          </a-step>
          <a-step title="財務覆核" />
          <a-step title="完成" />
        </a-steps>
      </a-card>

      <a-card title="用戶信息" :bordered="false" class="mt-5">
        <a-descriptions :column="3">
          <a-descriptions-item label="用戶姓名"> 付小小 </a-descriptions-item>
          <a-descriptions-item label="會員卡號"> XX 32943898021309809423 </a-descriptions-item>
          <a-descriptions-item label="身份證"> 3321944288191034921 </a-descriptions-item>
          <a-descriptions-item label="聯繫方式"> 18112345678 </a-descriptions-item>
          <a-descriptions-item label="聯繫地址" :span="2">
            曲麗麗 18100000000 浙江省杭州市西湖區黃姑山路工專路交叉路口
          </a-descriptions-item>
        </a-descriptions>

        <a-descriptions title="信息組" :column="3">
          <a-descriptions-item label="某某數據"> 111 </a-descriptions-item>
          <a-descriptions-item label="該數據更新時間"> 2017-08-08 </a-descriptions-item>
          <a-descriptions-item label="某某數據"> 725 </a-descriptions-item>
          <a-descriptions-item label="該數據更新時間"> 2017-08-08 </a-descriptions-item>
        </a-descriptions>

        <h4>信息組</h4>
        <a-card title="多層級信息組">
          <a-descriptions title="組名稱" :column="3">
            <a-descriptions-item label="負責人"> 林東東 </a-descriptions-item>
            <a-descriptions-item label="角色碼"> 1234567 </a-descriptions-item>
            <a-descriptions-item label="所屬部門"> XX公司 - YY部 </a-descriptions-item>
            <a-descriptions-item label="過期時間"> 2017-08-08 </a-descriptions-item>
            <a-descriptions-item label="描述" :span="2">
              這段描述很長很長很長很長很長很長很長很長很長很長很長很長很長很長...
            </a-descriptions-item>
          </a-descriptions>
          <a-divider />
          <a-descriptions title="組名稱" :column="1">
            <a-descriptions-item label="學名">
              Citrullus lanatus (Thunb.) Matsum. et
              Nakai一年生蔓生籐本；莖、枝粗壯，具明顯的稜。捲鬚較粗..
            </a-descriptions-item>
          </a-descriptions>
          <a-divider />
          <a-descriptions title="組名稱" :column="1">
            <a-descriptions-item label="負責人"> 付小小 </a-descriptions-item>
            <a-descriptions-item label="角色碼"> 1234568 </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-card>
      <a-card title="用戶近半年來電記錄" class="my-5">
        <Empty />
      </a-card>
      <BasicTable @register="registerTimeTable" />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { Divider, Card, Empty, Descriptions, Steps, Tabs } from 'ant-design-vue';

  import { refundTimeTableSchema, refundTimeTableData } from './data';
  export default defineComponent({
    components: {
      BasicTable,
      PageWrapper,
      [Divider.name]: Divider,
      [Card.name]: Card,
      Empty,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
      [Steps.name]: Steps,
      [Steps.Step.name]: Steps.Step,
      [Tabs.name]: Tabs,
      [Tabs.TabPane.name]: Tabs.TabPane,
    },
    setup() {
      const [registerTimeTable] = useTable({
        title: '退貨進度',
        columns: refundTimeTableSchema,
        pagination: false,
        dataSource: refundTimeTableData,
        showIndexColumn: false,
        scroll: { y: 300 },
      });

      return {
        registerTimeTable,
      };
    },
  });
</script>
