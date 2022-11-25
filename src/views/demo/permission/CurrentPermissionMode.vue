<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-09-30 08:02:53
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 02:50:44
-->
<template>
  <div class="mt-2">
    當前權限模式：
    <a-button type="link">
      {{ permissionMode === PermissionModeEnum.BACK ? '後台權限模式' : '前端角色權限模式' }}
    </a-button>
    <a-button class="ml-4" @click="togglePermissionMode" type="primary"> 切換權限模式 </a-button>
    <Divider />
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { useAppStore } from '/@/store/modules/app';
  import { PermissionModeEnum } from '/@/enums/appEnum';
  import { Divider } from 'ant-design-vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  export default defineComponent({
    name: 'CurrentPermissionMode',
    components: { Divider },
    setup() {
      const appStore = useAppStore();
      const permissionMode = computed(() => appStore.getProjectConfig.permissionMode);
      const { togglePermissionMode } = usePermission();

      return {
        permissionMode,
        PermissionModeEnum,
        togglePermissionMode,
      };
    },
  });
</script>
