<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-09-30 08:02:53
 * @LastEditors: Telliex
 * @LastEditTime: 2022-10-12 00:37:27
-->
<template>
  <PageWrapper
    title="前端權限示例"
    contentBackground
    contentClass="p-4"
    content="由於刷新的時候會請求用戶信息接口，會根據接口重置角色信息，所以刷新後界面會恢復原樣，如果不需要，可以註釋 src/layout/default/index內的獲取用戶信息接口"
  >
    <CurrentPermissionMode />

    <p>
      當前角色: <a> {{ userStore.getRoleList }} </a>
    </p>
    <Alert class="mt-4" type="info" message="點擊後請查看左側選單變化" show-icon />

    <div class="mt-4">
      權限切換(請先切換權限模式為前端角色權限模式):
      <Space>
        <a-button @click="changeRole(RoleEnum.SUPER)" :type="isSuper ? 'primary' : 'default'">
          {{ RoleEnum.SUPER }}
        </a-button>
        <a-button @click="changeRole(RoleEnum.TEST)" :type="isTest ? 'primary' : 'default'">
          {{ RoleEnum.TEST }}
        </a-button>
      </Space>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { Alert, Space } from 'ant-design-vue';
  import { useUserStore } from '/@/store/modules/user';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { PageWrapper } from '/@/components/Page';
  import CurrentPermissionMode from '../CurrentPermissionMode.vue';

  export default defineComponent({
    components: { Space, Alert, CurrentPermissionMode, PageWrapper },
    setup() {
      const { changeRole } = usePermission();
      const userStore = useUserStore();

      return {
        userStore,
        RoleEnum,
        isSuper: computed(() => userStore.getRoleList.includes(RoleEnum.SUPER)),
        isTest: computed(() => userStore.getRoleList.includes(RoleEnum.TEST)),
        changeRole,
      };
    },
  });
</script>
<style lang="less" scoped>
  .demo {
    background-color: @component-background;
  }
</style>
