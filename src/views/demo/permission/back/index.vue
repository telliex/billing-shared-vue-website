<template>
  <PageWrapper
    title="後台權限示例"
    contentBackground
    contentClass="p-4"
    content="目前mock了兩組數據， id為1 和 2 具體返回的菜單可以在mock/sys/menu.ts內查看"
  >
    <CurrentPermissionMode />

    <Alert class="mt-4" type="info" message="點擊後請查看左側菜單變化" show-icon />

    <div class="mt-4">
      權限切換(請先切換權限模式為後台權限模式):
      <Space>
        <a-button @click="switchToken(1)" :disabled="!isBackPermissionMode">
          獲取用戶id為1的菜單
        </a-button>
        <a-button @click="switchToken(2)" :disabled="!isBackPermissionMode">
          獲取用戶id為2的菜單
        </a-button>
      </Space>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useUserStore } from '/@/store/modules/user';
  import { PageWrapper } from '/@/components/Page';
  import { PermissionModeEnum } from '/@/enums/appEnum';
  import { useAppStore } from '/@/store/modules/app';
  import { Alert, Space } from 'ant-design-vue';
  import CurrentPermissionMode from '../CurrentPermissionMode.vue';

  export default defineComponent({
    components: { Space, Alert, CurrentPermissionMode, PageWrapper },
    setup() {
      const { refreshMenu } = usePermission();
      const userStore = useUserStore();
      const appStore = useAppStore();

      const isBackPermissionMode = computed(
        () => appStore.getProjectConfig.permissionMode === PermissionModeEnum.BACK,
      );

      async function switchToken(userId: number) {
        // 本函數切換用戶登錄Token的部分僅用於演示，實際生產時切換身份應當重新登錄
        const token = 'fakeToken' + userId;
        userStore.setToken(token);

        // 重新獲取用戶信息和菜單
        userStore.getUserInfoAction();
        refreshMenu();
      }

      return {
        RoleEnum,
        refreshMenu,
        switchToken,
        isBackPermissionMode,
      };
    },
  });
</script>
<style lang="less" scoped>
  .demo {
    background-color: @component-background;
  }
</style>
