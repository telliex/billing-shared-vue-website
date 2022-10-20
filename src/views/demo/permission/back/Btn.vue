<template>
  <PageWrapper contentBackground title="按鈕權限控製" contentClass="p-4">
    <CurrentPermissionMode />
    <p>
      當前擁有的code列表: <a> {{ permissionStore.getPermCodeList }} </a>
    </p>
    <Divider />
    <Alert
      class="mt-4"
      type="info"
      message="點擊後請查看按鈕變化(必須處於後臺權限模式才可測試此頁面所展示的功能)"
      show-icon
    />
    <Divider />
    <a-button type="primary" class="mr-2" @click="switchToken(2)" :disabled="!isBackPermissionMode">
      點擊切換按鈕權限(用戶id為2)
    </a-button>
    <a-button type="primary" @click="switchToken(1)" :disabled="!isBackPermissionMode">
      點擊切換按鈕權限(用戶id為1,默認)
    </a-button>

    <template v-if="isBackPermissionMode">
      <Divider>組件方式判斷權限</Divider>
      <Authority :value="'1000'">
        <a-button type="primary" class="mx-4"> 擁有code ['1000']權限可見 </a-button>
      </Authority>

      <Authority :value="'2000'">
        <a-button color="success" class="mx-4"> 擁有code ['2000']權限可見 </a-button>
      </Authority>

      <Authority :value="['1000', '2000']">
        <a-button color="error" class="mx-4"> 擁有code ['1000','2000']角色權限可見 </a-button>
      </Authority>

      <Divider>函數方式方式判斷權限</Divider>
      <a-button v-if="hasPermission('1000')" type="primary" class="mx-4">
        擁有code ['1000']權限可見
      </a-button>

      <a-button v-if="hasPermission('2000')" color="success" class="mx-4">
        擁有code ['2000']權限可見
      </a-button>

      <a-button v-if="hasPermission(['1000', '2000'])" color="error" class="mx-4">
        擁有code ['1000','2000']角色權限可見
      </a-button>

      <Divider>指令方式方式判斷權限(該方式不能動態修改權限.)</Divider>
      <a-button v-auth="'1000'" type="primary" class="mx-4"> 擁有code ['1000']權限可見 </a-button>

      <a-button v-auth="'2000'" color="success" class="mx-4"> 擁有code ['2000']權限可見 </a-button>

      <a-button v-auth="['1000', '2000']" color="error" class="mx-4">
        擁有code ['1000','2000']角色權限可見
      </a-button>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { Alert, Divider } from 'ant-design-vue';
  import CurrentPermissionMode from '../CurrentPermissionMode.vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { Authority } from '/@/components/Authority';
  import { usePermissionStore } from '/@/store/modules/permission';
  import { PermissionModeEnum } from '/@/enums/appEnum';
  import { PageWrapper } from '/@/components/Page';
  import { useAppStore } from '/@/store/modules/app';
  import { useUserStore } from '/@/store/modules/user';

  export default defineComponent({
    components: { Alert, PageWrapper, CurrentPermissionMode, Divider, Authority },
    setup() {
      const { hasPermission } = usePermission();
      const permissionStore = usePermissionStore();
      const appStore = useAppStore();
      const userStore = useUserStore();

      const isBackPermissionMode = computed(
        () => appStore.getProjectConfig.permissionMode === PermissionModeEnum.BACK,
      );

      async function switchToken(userId: number) {
        // 本函數切換用戶登錄Token的部分僅用於演示，實際生產時切換身份應當重新登錄
        const token = 'fakeToken' + userId;
        userStore.setToken(token);

        // 重新獲取用戶信息和菜單
        userStore.getUserInfoAction();
        permissionStore.changePermissionCode();
      }

      return {
        hasPermission,
        permissionStore,
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
