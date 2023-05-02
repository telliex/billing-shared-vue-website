<template>
  <PageWrapper title="帶參數菜單（路由）" content="支持多級參數">
    當前參數：{{ params }}
    <br />
    輸入參數切換路由：
    <Input v-model:value="value" placeholder="建議為url標準字符，輸入後點擊切換" />
    <a-button type="primary" @click="handleClickGo">切換路由</a-button>
    <br />
    切換路由後
    <ul>
      <li>可刷新頁面測試路由參數情況是否正常。</li>
      <li>可於左側菜單中展開子菜單，點擊測試參數是否攜帶正常。</li>
    </ul>
  </PageWrapper>
</template>
<script lang="ts">
  import { Input } from 'ant-design-vue';
  import { computed, defineComponent, ref, unref } from 'vue';
  import { useRouter } from 'vue-router';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    name: 'TestMenu',
    components: { PageWrapper, Input },
    setup() {
      const { currentRoute, replace } = useRouter();
      const value = ref<string>('');

      const handleClickGo = () => {
        const { name } = unref(currentRoute);
        replace({ name: name!, params: { id: unref(value) } });
      };
      return {
        value,
        handleClickGo,
        params: computed(() => {
          return unref(currentRoute).params;
        }),
      };
    },
  });
</script>
