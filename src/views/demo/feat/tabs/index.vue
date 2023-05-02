<template>
  <PageWrapper title="標籤頁操作示例">
    <CollapseContainer title="在下面輸入框輸入文本,切換後回來內容會保存">
      <a-alert banner message="該操作不會影響頁面標題，僅修改Tab標題" />
      <div class="mt-2 flex flex-grow-0">
        <a-button class="mr-2" @click="setTabTitle" type="primary"> 設置Tab標題 </a-button>
        <a-input placeholder="請輸入" v-model:value="title" class="mr-4 w-12" />
      </div>
    </CollapseContainer>

    <CollapseContainer class="mt-4" title="標籤頁操作">
      <a-button class="mr-2" @click="closeAll"> 關閉所有 </a-button>
      <a-button class="mr-2" @click="closeLeft"> 關閉左側 </a-button>
      <a-button class="mr-2" @click="closeRight"> 關閉右側 </a-button>
      <a-button class="mr-2" @click="closeOther"> 關閉其他 </a-button>
      <a-button class="mr-2" @click="closeCurrent"> 關閉當前 </a-button>
      <a-button class="mr-2" @click="refreshPage"> 刷新當前 </a-button>
    </CollapseContainer>

    <CollapseContainer class="mt-4" title="標籤頁復用超出限制自動關閉(使用場景: 動態路由)">
      <a-button v-for="index in 6" :key="index" class="mr-2" @click="toDetail(index)">
        打開{{ index }}詳情頁
      </a-button>
    </CollapseContainer>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { CollapseContainer } from '/@/components/Container';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { PageWrapper } from '/@/components/Page';
  import { Input, Alert } from 'ant-design-vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    name: 'TabsDemo',
    components: { CollapseContainer, PageWrapper, [Input.name]: Input, [Alert.name]: Alert },
    setup() {
      const go = useGo();
      const title = ref<string>('');
      const { closeAll, closeLeft, closeRight, closeOther, closeCurrent, refreshPage, setTitle } =
        useTabs();
      const { createMessage } = useMessage();
      function setTabTitle() {
        if (title.value) {
          setTitle(title.value);
        } else {
          createMessage.error('請輸入要設置的Tab標題！');
        }
      }

      function toDetail(index: number) {
        go(`/feat/tabs/detail/${index}`);
      }
      return {
        closeAll,
        closeLeft,
        closeRight,
        closeOther,
        closeCurrent,
        toDetail,
        refreshPage,
        setTabTitle,
        title,
      };
    },
  });
</script>
