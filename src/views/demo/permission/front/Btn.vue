<!--
 * @Description: 
 * @Anthor: Telliex
 * @Date: 2022-09-30 08:02:53
 * @LastEditors: Telliex
 * @LastEditTime: 2022-11-25 02:50:28
-->
<template>
  <PageWrapper
    title="前端權限按鈕示例"
    contentBackground
    contentClass="p-4"
    content="由於刷新的時候會請求用户信息接口，會根據接口重置角色信息，所以刷新後界面會恢復原樣，如果不需要，可以註釋 src/layout/default/index內的獲取用户信息接口"
  >
    <CurrentPermissionMode />

    <p>
      當前角色: <a> {{ userStore.getRoleList }} </a>
    </p>
    <Alert class="mt-4" type="info" message="點擊後請查看按鈕變化" show-icon />

    <div class="mt-4">
      權限切換(請先切換權限模式為前端角色權限模式):
      <Space>
        <a-button @click="changeRole(RoleEnum.SUPER)" :type="isSuper ? 'primary' : 'default'">
          {{ RoleEnum.SUPER }}
        </a-button>
        <a-button @click="changeRole(RoleEnum.TESTER)" :type="isTest ? 'primary' : 'default'">
          {{ RoleEnum.TESTER }}
        </a-button>
      </Space>
    </div>
    <Divider>組件方式判斷權限(有需要可以自行全局註冊)</Divider>
    <Authority :value="RoleEnum.SUPER">
      <a-button type="primary" class="mx-4"> 擁有super角色權限可見 </a-button>
    </Authority>

    <Authority :value="RoleEnum.TESTER">
      <a-button color="success" class="mx-4"> 擁有test角色權限可見 </a-button>
    </Authority>

    <Authority :value="[RoleEnum.TESTER, RoleEnum.SUPER]">
      <a-button color="error" class="mx-4"> 擁有[test,super]角色權限可見 </a-button>
    </Authority>

    <Divider>函數方式方式判斷權限(適用於函數內部過濾)</Divider>
    <a-button v-if="hasPermission(RoleEnum.SUPER)" type="primary" class="mx-4">
      擁有super角色權限可見
    </a-button>

    <a-button v-if="hasPermission(RoleEnum.TESTER)" color="success" class="mx-4">
      擁有test角色權限可見
    </a-button>

    <a-button v-if="hasPermission([RoleEnum.TESTER, RoleEnum.SUPER])" color="error" class="mx-4">
      擁有[test,super]角色權限可見
    </a-button>

    <Divider>指令方式方式判斷權限(該方式不能動態修改權限.)</Divider>
    <a-button v-auth="RoleEnum.SUPER" type="primary" class="mx-4"> 擁有super角色權限可見 </a-button>

    <a-button v-auth="RoleEnum.TESTER" color="success" class="mx-4">
      擁有test角色權限可見
    </a-button>

    <a-button v-auth="[RoleEnum.TESTER, RoleEnum.SUPER]" color="error" class="mx-4">
      擁有[test,super]角色權限可見
    </a-button>
  </PageWrapper>
</template>
<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import { Alert, Divider, Space } from 'ant-design-vue';
  import CurrentPermissionMode from '../CurrentPermissionMode.vue';
  import { useUserStore } from '/@/store/modules/user';
  import { RoleEnum } from '/@/enums/roleEnum';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { Authority } from '/@/components/Authority';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    components: { Alert, PageWrapper, Space, CurrentPermissionMode, Divider, Authority },
    setup() {
      const { changeRole, hasPermission } = usePermission();
      const userStore = useUserStore();

      return {
        userStore,
        RoleEnum,
        isSuper: computed(() => userStore.getRoleList.includes(RoleEnum.SUPER)),
        isTest: computed(() => userStore.getRoleList.includes(RoleEnum.TESTER)),
        changeRole,
        hasPermission,
      };
    },
  });
</script>
<style lang="less" scoped>
  .demo {
    background-color: @component-background;
  }
</style>
