<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:01
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 02:33:53
-->
<template>
  <PageWrapper title="MarkDown組件示例">
    <div>
      <a-button @click="toggleTheme" class="mb-2" type="primary"> 黑暗主題 </a-button>
      <a-button @click="clearValue" class="mb-2" type="default"> 清空內容 </a-button>
      <MarkDown
        v-model:value="value"
        @change="handleChange"
        ref="markDownRef"
        placeholder="這是佔位文本"
      />
    </div>
    <div class="mt-2">
      <a-card title="Markdown Viewer 組件演示">
        <MarkdownViewer :value="value" />
      </a-card>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { MarkDown, MarkDownActionType, MarkdownViewer } from '/@/components/Markdown';
  import { PageWrapper } from '/@/components/Page';
  import { Card } from 'ant-design-vue';

  export default defineComponent({
    components: { MarkDown, PageWrapper, MarkdownViewer, ACard: Card },
    setup() {
      const markDownRef = ref<Nullable<MarkDownActionType>>(null);
      const valueRef = ref(`
# 標題h1

##### 標題h5

**加粗**
*斜體*
~~刪除線~~
[鏈接](https://github.com/vbenjs/vue-vben-admin)
↓分割線↓

---


* 無序列表1
  * 無序列表1.1

1. 有序列表1
2. 有序列表2

* [ ] 任務列表1
* [x] 任務列表2

> 引用示例

\`\`\`js
// 代碼塊:
(() => {
  var htmlRoot = document.getElementById('htmlRoot');
  var theme = window.localStorage.getItem('__APP__DARK__MODE__');
  if (htmlRoot && theme) {
    htmlRoot.setAttribute('data-theme', theme);
    theme = htmlRoot = null;
  }
})();
\`\`\`

| 表格 | 示例 | 🎉️ |
| --- | --- | --- |
| 1 | 2 | 3 |
| 4 | 5 | 6 |
`);

      function toggleTheme() {
        const markDown = unref(markDownRef);
        if (!markDown) return;
        const vditor = markDown.getVditor();
        vditor.setTheme('dark', 'dark', 'dracula');
      }

      function handleChange(v: string) {
        valueRef.value = v;
      }

      function clearValue() {
        valueRef.value = '';
      }

      return {
        value: valueRef,
        toggleTheme,
        markDownRef,
        handleChange,
        clearValue,
      };
    },
  });
</script>
