<template>
  <PageWrapper title="Tree函數操作示例">
    <Row :gutter="[16, 16]">
      <Col :span="8">
        <BasicTree
          title="右側操作按鈕/自定義圖標"
          helpMessage="幫助信息"
          :treeData="treeData"
          :actionList="actionList"
          :renderIcon="createIcon"
        />
      </Col>
      <Col :span="8">
        <BasicTree title="右鍵選單" :treeData="treeData" :beforeRightClick="getRightMenuList" />
      </Col>
      <Col :span="8">
        <BasicTree
          title="工具欄使用"
          toolbar
          checkable
          search
          :treeData="treeData"
          :beforeRightClick="getRightMenuList"
        />
      </Col>
      <Col :span="8">
        <BasicTree title="沒有fieldNames，插槽有效" helpMessage="正確的示例" :treeData="treeData3">
          <template #title="item"> 插槽：{{ item.name }} </template>
        </BasicTree>
      </Col>
      <Col :span="8">
        <BasicTree
          title="有fieldNames後，插槽失效"
          helpMessage="錯誤的示例, 應該顯示插槽的內容才對"
          :fieldNames="{ key: 'id', title: 'name' }"
          :treeData="treeData2"
        >
          <template #title="item"> 插槽：{{ item.title }} </template>
        </BasicTree>
      </Col>
      <Col :span="8">
        <BasicTree
          title="有fieldNames後，actionList失效"
          helpMessage="錯誤的示例，應該在鼠標移上去時，顯示新增和刪除按鈕才對"
          :treeData="treeData3"
          :actionList="actionList"
          :fieldNames="{ key: 'key', title: 'name' }"
        />
      </Col>
    </Row>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, h } from 'vue';
  import { Row, Col } from 'ant-design-vue';
  import { BasicTree, TreeActionItem, ContextMenuItem } from '/@/components/Tree/index';
  import { treeData, treeData2, treeData3 } from './data';
  import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    components: { BasicTree, PageWrapper, Row, Col },
    setup() {
      function handlePlus(node: any) {
        console.log(node);
      }

      function getRightMenuList(node: any): ContextMenuItem[] {
        return [
          {
            label: '新增',
            handler: () => {
              console.log('點擊了新增', node);
            },
            icon: 'bi:plus',
          },
          {
            label: '刪除',
            handler: () => {
              console.log('點擊了刪除', node);
            },
            icon: 'bx:bxs-folder-open',
          },
        ];
      }
      const actionList: TreeActionItem[] = [
        {
          // show:()=>boolean;
          render: (node) => {
            return h(PlusOutlined, {
              class: 'ml-2',
              onClick: () => {
                handlePlus(node);
              },
            });
          },
        },
        {
          render: () => {
            return h(DeleteOutlined);
          },
        },
      ];

      function createIcon({ level }) {
        if (level === 1) {
          return 'ion:git-compare-outline';
        }
        if (level === 2) {
          return 'ion:home';
        }
        if (level === 3) {
          return 'ion:airplane';
        }
        return '';
      }
      return { treeData, treeData2, treeData3, actionList, getRightMenuList, createIcon };
    },
  });
</script>
