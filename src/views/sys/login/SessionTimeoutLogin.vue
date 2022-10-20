<template>
  <transition>
    <div :class="prefixCls">
      <Login sessionTimeout />
    </div>
  </transition>
</template>
<script lang="ts" setup>
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import Login from './Login.vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useUserStore } from '/@/store/modules/user';
  import { usePermissionStore } from '/@/store/modules/permission';
  import { useAppStore } from '/@/store/modules/app';
  import { PermissionModeEnum } from '/@/enums/appEnum';

  const { prefixCls } = useDesign('st-login');
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();
  const appStore = useAppStore();
  const userId = ref<Nullable<number | string>>(0);

  const isBackMode = () => {
    return appStore.getProjectConfig.permissionMode === PermissionModeEnum.BACK;
  };

  onMounted(() => {
    // 記錄當前的UserId
    userId.value = userStore.getUserInfo?.userId;
    console.log('Mounted', userStore.getUserInfo);
  });

  onBeforeUnmount(() => {
    if (userId.value && userId.value !== userStore.getUserInfo.userId) {
      // 登錄的不是同一個用戶，刷新整個頁面以便丟棄之前用戶的頁面狀態
      document.location.reload();
    } else if (isBackMode() && permissionStore.getLastBuildMenuTime === 0) {
      // 後台權限模式下，沒有成功加載過菜單，就重新加載整個頁面。這通常發生在會話過期後按F5刷新整個頁面後載入了本模塊這種場景
      document.location.reload();
    }
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-st-login';

  .@{prefix-cls} {
    position: fixed;
    z-index: 9999999;
    width: 100%;
    height: 100%;
    background: @component-background;
  }
</style>
