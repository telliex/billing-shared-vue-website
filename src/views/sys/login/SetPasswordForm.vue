<template>
  <template v-if="getShow">
    <LoginFormContent class="enter-x" />
    <p>※英文字母大小寫+數字+特殊符號，至少八字元，請注意大小寫有別</p>
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="password" class="enter-x">
        <InputPassword
          id="oldPassword"
          size="large"
          visibilityToggle
          v-model:value="formData.oldPassword"
          :placeholder="t('sys.login.oldPassword')"
        />
      </FormItem>

      <FormItem name="password" class="enter-x">
        <InputPassword
          id="newPassword"
          size="large"
          visibilityToggle
          v-model:value="formData.newPassword"
          :placeholder="t('sys.login.newPassword')"
        />
      </FormItem>
      <FormItem name="password" class="enter-x">
        <InputPassword
          id="checkNewPassword"
          size="large"
          visibilityToggle
          v-model:value="formData.checkNewPassword"
          :placeholder="t('sys.login.checkPassword')"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleSet" :loading="loading">
          {{ t('common.setPasswordText') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue';
  import LoginFormContent from './LoginFormContent.vue';
  import { Form, InputPassword, Button } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, LoginStateEnum } from './useLogin';
  import { stringToHSA265 } from '/@/utils/auth';
  import { changePassword } from '/@/api/sys/system';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  const { setLoginState, getLoginState, handleBackLogin } = useLoginState();
  const FormItem = Form.Item;
  const { t } = useI18n();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    oldPassword: '',
    newPassword: '',
    checkNewPassword: '',
  });

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.SET_PASSWORD);

  async function handleSet() {
    const form = unref(formRef);
    if (!form) return;
    console.log('form', form);

    if (
      formData.newPassword == '' ||
      formData.oldPassword == '' ||
      formData.checkNewPassword == ''
    ) {
      console.log('Please enter the password');
      createMessage.error('Please enter the password');
      return;
    }
    if (formData.newPassword !== formData.checkNewPassword) {
      console.log('The new password is inconsistent');
      createMessage.error('The new password is inconsistent');
      return;
    }
    if (!validatePassword(formData.newPassword)) {
      console.log('The new password is not in the correct format');
      createMessage.error('The new password is not in the correct format');
      return;
    }

    let finalPassword = {
      oldPassword: await stringToHSA265(formData.oldPassword),
      newPassword: await stringToHSA265(formData.newPassword),
    };
    console.log('finalPassword', finalPassword);

    await changePassword(finalPassword);

    // await stringToHSA265(formData.oldPassword);
    await form.resetFields();
    setLoginState(LoginStateEnum.LOGIN);
  }

  function validatePassword(password) {
    // 正則表達式解釋：
    // ^ 代表開始
    // (?=.*[a-z]) 代表至少有一個小寫字母
    // (?=.*[A-Z]) 代表至少有一個大寫字母
    // (?=.*\d) 代表至少有一個數字
    // (?=.*[@$!%*?&]) 代表至少有一個特殊字符，可以根據需要添加或刪除特殊字符
    // .{8,} 代表至少8個任意字符
    // $ 代表結束
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return regex.test(password);
  }
</script>
