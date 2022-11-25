<template>
  <PageWrapper title="Tree函數操作示例" contentBackground contentClass="p-4">
    <div class="mb-4">
      <a-button @click="expandAll(true)" class="mr-2"> 展開全部 </a-button>
      <a-button @click="expandAll(false)" class="mr-2"> 摺疊全部 </a-button>
      <a-button @click="checkAll(true)" class="mr-2"> 全選 </a-button>
      <a-button @click="checkAll(false)" class="mr-2"> 全不選 </a-button>
      <a-button @click="handleLevel(2)" class="mr-2"> 顯示到第2級 </a-button>
      <a-button @click="handleLevel(1)" class="mr-2"> 顯示到第1級 </a-button>
    </div>
    <div class="mb-4">
      <a-button @click="handleSetCheckData" class="mr-2"> 設置勾選數據 </a-button>
      <a-button @click="handleGetCheckData" class="mr-2"> 獲取勾選數據 </a-button>
      <a-button @click="handleSetSelectData" class="mr-2"> 設置選中數據 </a-button>
      <a-button @click="handleGetSelectData" class="mr-2"> 獲取選中數據 </a-button>
      <a-button @click="handleGetSelectNode" class="mr-2"> 獲取選中節點 </a-button>

      <a-button @click="handleSetExpandData" class="mr-2"> 設置展開數據 </a-button>
      <a-button @click="handleGetExpandData" class="mr-2"> 獲取展開數據 </a-button>
    </div>
    <div class="mb-4">
      <a-button @click="appendNodeByKey(null)" class="mr-2"> 添加根節點 </a-button>
      <a-button @click="appendNodeByKey('2-2')" class="mr-2"> 添加在parent3內添加節點 </a-button>
      <a-button @click="deleteNodeByKey('2-2')" class="mr-2"> 刪除parent3節點 </a-button>
      <a-button @click="updateNodeByKey('1-1')" class="mr-2"> 更新parent2節點 </a-button>
    </div>
    <BasicTree :treeData="treeData" title="函數操作" ref="treeRef" :checkable="true" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicTree, TreeActionType } from '/@/components/Tree/index';
  import { treeData } from './data';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    components: { BasicTree, PageWrapper },
    setup() {
      const treeRef = ref<Nullable<TreeActionType>>(null);
      const { createMessage } = useMessage();

      function getTree() {
        const tree = unref(treeRef);
        if (!tree) {
          throw new Error('tree is null!');
        }
        return tree;
      }

      function handleLevel(level: number) {
        getTree().filterByLevel(level);
      }

      function handleSetCheckData() {
        getTree().setCheckedKeys(['0-0']);
      }

      function handleGetCheckData() {
        const keys = getTree().getCheckedKeys();
        createMessage.success(JSON.stringify(keys));
      }

      function handleSetSelectData() {
        getTree().setSelectedKeys(['0-0']);
      }

      function handleGetSelectData() {
        const keys = getTree().getSelectedKeys();
        createMessage.success(JSON.stringify(keys));
      }

      function handleGetSelectNode() {
        const keys = getTree().getSelectedKeys();
        const node = getTree().getSelectedNode(keys[0]);
        createMessage.success(node !== null ? JSON.stringify(node) : null);
      }

      function handleSetExpandData() {
        getTree().setExpandedKeys(['0-0']);
      }

      function handleGetExpandData() {
        const keys = getTree().getExpandedKeys();
        createMessage.success(JSON.stringify(keys));
      }

      function checkAll(checkAll: boolean) {
        getTree().checkAll(checkAll);
      }

      function expandAll(checkAll: boolean) {
        getTree().expandAll(checkAll);
      }

      function appendNodeByKey(parentKey: string | null = null) {
        getTree().insertNodeByKey({
          parentKey: parentKey,
          node: {
            title: '新增節點',
            key: '2-2-2',
          },
          // 往後插入
          push: 'push',
          // 往前插入
          // push:'unshift'
        });
      }

      function deleteNodeByKey(key: string) {
        getTree().deleteNodeByKey(key);
      }

      function updateNodeByKey(key: string) {
        getTree().updateNodeByKey(key, {
          title: 'parent2-new',
        });
      }

      return {
        treeData,
        treeRef,
        handleLevel,
        handleSetCheckData,
        handleGetCheckData,
        handleSetSelectData,
        handleGetSelectData,
        handleSetExpandData,
        handleGetExpandData,
        handleGetSelectNode,
        appendNodeByKey,
        deleteNodeByKey,
        updateNodeByKey,
        checkAll,
        expandAll,
      };
    },
  });
</script>
