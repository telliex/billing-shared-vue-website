<template>
  <p class="">
    {{ getFormContent }}
  </p>
</template>
<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { LoginStateEnum, useLoginState } from './useLogin';

  const { t } = useI18n();

  const { getLoginState } = useLoginState();

  const getFormContent = computed(() => {
    const titleObj = {
      [LoginStateEnum.SET_PASSWORD]: t('sys.login.setFormContent'),
      [LoginStateEnum.RESET_PASSWORD]: t('sys.login.forgetFormContent'),
      [LoginStateEnum.LOGIN]: t('sys.login.signInFormContent'),
      [LoginStateEnum.REGISTER]: t('sys.login.signUpFormContent'),
      [LoginStateEnum.MOBILE]: t('sys.login.mobileSignInFormContent'),
      [LoginStateEnum.QR_CODE]: t('sys.login.qrSignInFormContent'),
    };
    return titleObj[unref(getLoginState)];
  });
</script>
