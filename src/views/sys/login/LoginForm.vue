<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="company" class="enter-x" v-if="false">
      <Select
        size="large"
        v-model:value="formData.company"
        :placeholder="t('sys.login.company')"
        class="fix-auto-fill"
        :options="options"
        disabled
      />
    </FormItem>
    <FormItem name="account" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <!-- No logic, you need to deal with it yourself -->
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12" />
    </ARow>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </Button>
      <!-- <Button size="large" class="mt-4 enter-x" block @click="handleRegister">
        {{ t('sys.login.registerButton') }}
      </Button> -->
    </FormItem>
    <!-- <ARow class="enter-x">
      <ACol :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
          {{ t('sys.login.mobileSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="8" :xs="24" class="!my-2 !md:my-0 xs:mx-0 md:mx-2">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="6" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </Button>
      </ACol>
    </ARow> -->

    <!-- <Divider class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider>

    <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">
      <GithubFilled />
      <WechatFilled />
      <AlipayCircleFilled />
      <GoogleCircleFilled />
      <TwitterCircleFilled />
    </div> -->
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed, onMounted } from 'vue';
  import { Checkbox, Form, Input, Row, Col, Button, Select } from 'ant-design-vue';
  import { useLocaleStoreWithOut } from '/@/store/modules/locale';
  import LoginFormTitle from './LoginFormTitle.vue';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { loginApi, logoutApi, JWTLoginApi, JWTlogoutApi, JWTRefreshApi } from '/@/api/sys/user';

  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';

  import { loginApiTransition } from '/@/api/sys/user';
  import queryString from 'query-string';
  // import { stringToHSA265 } from '/@/utils/auth';
  import { createLocalStorage } from '/@/utils/cache';
  const ls = createLocalStorage();
  const { getLoginState } = useLoginState();
  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification, createErrorModal, createMessage, createConfirm } = useMessage();
  const { prefixCls } = useDesign('login');
  const userStore = useUserStore();
  let redirectUrl = ref<string | null>('');

  const { getFormRules } = useFormRules();
  const formRef = ref();
  const loading = ref(false);
  const rememberMe = ref(false);

  const formData = reactive({
    company: 'ECV',
    account: '',
    password: '',
  });

  // let userList: any[] = reactive([]);
  const options = reactive([
    {
      label: 'ECV',
      value: 'ECV',
    },
    {
      label: 'ECR',
      value: 'ECR',
    },
    // {
    //   label: 'CN',
    //   value: 'CN',
    // },
  ]);

  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      // call login api
      const userInfo = await userStore.login({
        password: data.password,
        username: data.account,
        mode: 'none', //不要默認的錯誤提示
      });

      console.log('userInfo=========:', userInfo);

      if (userInfo) {
        const localeStore = useLocaleStoreWithOut();
        if (rememberMe.value) {
          localeStore.setLoginInfo({
            username: data.account,
            password: data.password,
            remeberMe: rememberMe.value,
          });
        } else {
          localeStore.setLoginInfo({
            username: '',
            password: '',
            remeberMe: false,
          });
        }

        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.displayName}`,
          duration: 3,
        });
      }
    } catch (error) {
      console.log('have error:', error);
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      });
    } finally {
      loading.value = false;
    }
  }

  function handleConfirm(type: 'warning' | 'error' | 'success' | 'info', url: string) {
    createConfirm({
      iconType: type,
      title: 'Error',
      content: 'There was a problem when the page jumped, please jump again.',
      onOk: async () => {
        const protocol = window.location.protocol; // 取得當前頁面的協議 (http: 或 https:)
        console.log('handleConfirm-protocol:', protocol);
        console.log('handleConfirm:', url);
        console.log(`${protocol}//${url}`);
        window.location.href = `${protocol}//${url}`;
      },
      okCancel: false,
    });
  }

  function extractHostname(url) {
    console.log('url:', url);
    let parsedUrl = new URL(url);
    return parsedUrl.hostname; // 這將返回域名
  }

  onMounted(async () => {
    // http://cbms-dev.ecv-billing-center.com/?user=144/#/login?redirect=/contract
    const wonderFromURL = import.meta.env.VITE_GLOB_OLD_MGT_URL;
    // handleConfirm('error', extractHostname(wonderFromURL));
    console.log('wonderFromURL:', wonderFromURL.replace(/(^\w+:|^)\/\//, '').replace(/\//, ''));
    console.log(
      'document.referrer:',
      document.referrer.replace(/(^\w+:|^)\/\//, '').replace(/\//, ''),
    );

    const system = import.meta.env.VITE_GLOB_APP_TITLE;
    console.log('system=======:', system);

    if (system === 'MARS') {
      const localeStore = useLocaleStoreWithOut();
      let loginInput = localeStore.getLogin;
      formData.account = loginInput.username;
      formData.password = loginInput.password;
      rememberMe.value = loginInput.remeberMe;
    } else if (system === 'CBMS') {
      // console.log('document.referrer:', extractHostname(document.referrer));
      // console.log(
      //   'document.VITE_GLOB_CBMS_URL:',
      //   extractHostname(import.meta.env.VITE_GLOB_CBMS_URL),
      // );
      // if (
      //   extractHostname(document.referrer) === extractHostname(import.meta.env.VITE_GLOB_CBMS_URL)
      // ) {
      //   const protocol = window.location.protocol; // 取得當前頁面的協議 (http: 或 https:)
      //   console.log('protocol:', protocol);

      //   console.log(
      //     'VITE_GLOB_OLD_MGT_URL:',
      //     extractHostname(import.meta.env.VITE_GLOB_OLD_MGT_URL),
      //   );
      //   let host = extractHostname(import.meta.env.VITE_GLOB_OLD_MGT_URL);

      //   console.log(`${protocol}//${host}/index.php?logout`);
      //   // window.location.href = `${protocol}//${host}/index.php?logout`;
      //   // return;
      // }

      redirectUrl.value = window.location.hash.split('redirect=')[1] || null;
      if (
        document.referrer.replace(/(^\w+:|^)\/\//, '').replace(/\//, '') !==
        wonderFromURL.replace(/(^\w+:|^)\/\//, '').replace(/\//, '')
      ) {
        // createMessage.error('跳轉來源路徑錯誤，請重新登入 MGT 平台 !!');
        console.log('跳轉來源路徑錯誤，請重新登入 MGT 平台 !!');
        setTimeout(() => {
          // window.location.href = document.referrer;
          handleConfirm('error', extractHostname(wonderFromURL));
        }, 3000);

        return;
      }

      // if (
      //   document.referrer.replace(/(^\w+:|^)\/\//, '').replace(/\//, '') ===
      //   import.meta.env.VITE_GLOB_CBMS_URL.replace(/(^\w+:|^)\/\//, '').replace(/\//, '')
      // ) {
      //   console.log('logout');
      // }
      // const parsed = queryString.parse(window.location.hash.substring(1).split('?')[1]);

      const queryParams = new URLSearchParams(window.location.search.replace(/\//, ''));
      const user = queryParams.get('user');
      console.log('user:', user);
      const hash = window.location.hash.substring(1);

      const queryString = hash.split('?')[1];

      const queryParamsPath = new URLSearchParams(queryString);
      console.log('queryParamsPath:', queryParamsPath);

      const redirectPath = queryParamsPath.get('redirect');
      console.log('redirectPath:', redirectPath);
      if (!user) {
        // createMessage.error('跳轉路徑參數錯誤，請重新登入 MGT 平台 !!');
        console.log('跳轉路徑參數錯誤，請重新登入 MGT 平台 !!');
        // timer && clearTimeout(timer);
        setTimeout(() => {
          handleConfirm('error', extractHostname(wonderFromURL));
        }, 3000);

        return;
      }

      const token = await JWTLoginApi({ email: user + '@ecloudvalley.com' });
      ls.set('USER_TOKEN_TEMP_KEY__', token[0]);
      console.log('===== token from JWT =====:', token[0]);
      const data = await loginApiTransition(user);

      formData.account = data[0].items[0].email;
      formData.password = data[0].items[0].password;
      await JWTlogoutApi(token[0].apiToken);

      handleLogin();
    }
  });
</script>
