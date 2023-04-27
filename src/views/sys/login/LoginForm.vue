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
    <!-- <FormItem name="company" class="enter-x">
      <Select
        size="large"
        v-model:value="formData.company"
        :placeholder="t('sys.login.company')"
        class="fix-auto-fill"
        :options="options"
      />
    </FormItem> -->
    <FormItem name="account" class="enter-x">
      <InputPassword
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
  import { useRouter } from 'vue-router';
  import { Checkbox, Form, Input, Row, Col, Button } from 'ant-design-vue';

  import LoginFormTitle from './LoginFormTitle.vue';

  import axios from 'axios';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Guid } from 'js-guid';
  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';

  // this imports a bare-bones version of S3 that exposes the .send operation
  // import { S3, S3Client, AbortMultipartUploadCommand } from '@aws-sdk/client-s3';

  // this imports just the getObject operation from S3
  // import { GetObjectCommand } from '@aws-sdk/client-s3';

  import { GetUserInfoList } from '/@/api/sys/system';

  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification, createErrorModal, createMessage } = useMessage();
  const { prefixCls } = useDesign('login');
  const userStore = useUserStore();
  const router = useRouter();
  const { getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();
  const formRef = ref();
  const loading = ref(false);
  const rememberMe = ref(false);
  let redirectUrl = ref<string | null>('');
  const fromURL = import.meta.env.VITE_GLOB_OLD_MGT_URL;
  // const fromURL = 'http://localhost:3131/';
  const formData = reactive({
    company: 'ECV',
    account: '',
    password: '',
  });

  let userList: any[] = reactive([]);
  // const options = reactive([
  //   {
  //     label: 'ECV',
  //     value: 'ECV',
  //   },
  //   {
  //     label: 'ECR',
  //     value: 'ECR',
  //   },
  //   {
  //     label: 'CN',
  //     value: 'CN',
  //   },
  // ]);

  const { validForm } = useFormValid(formRef);

  //onKeyStroke('Enter', handleLogin);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

  // function handleChange(e: ChangeEvent) {
  //   console.log(e);
  //   // userStore.setCompany(e);
  // }

  // function handleConfirm(type: 'warning' | 'error' | 'success' | 'info') {
  //   createConfirm({
  //     iconType: type,
  //     title: 'Tip',
  //     content: 'content message...',
  //   });
  // }

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      const userInfo = await userStore.login({
        password: data.password,
        username: data.account,
        mode: 'none', //不要默认的错误提示
      });
      // const userInfo = await userStore.login({
      //   password: '123456',
      //   username: 'billing',
      //   mode: 'none', //不要默认的错误提示
      // });

      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
          duration: 3,
        });

        setTimeout(() => {
          if (redirectUrl.value) {
            console.log(`${window.location.host}/#${redirectUrl.value}`);
            router.push({ name: 'contractList' });
          }
        }, 2000);
      }
    } catch (error) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
        onOk: () => {
          setTimeout(() => {
            window.location.href = fromURL;
          }, 3000);
        },
      });
    } finally {
      loading.value = false;
    }
  }
  onMounted(async () => {
    console.log('elu:', import.meta.env.VITE_GLOB_ELU_API_URL);
    console.log('report:', import.meta.env.VITE_GLOB_REPORT_API_URL);
    // http://localhost:5151/?user=admin/#/login?redirect=/home
    console.log('window.location.pathname:', window.location.pathname);
    console.log('window.location.search:', window.location.search);
    console.log('window.location.hash:', window.location.hash);
    console.log('fromURL:', fromURL.replace(/(^\w+:|^)\/\//, '').replace(/\//, ''));
    console.log(
      'document.referrer:',
      document.referrer.replace(/(^\w+:|^)\/\//, '').replace(/\//, ''),
    );

    if (window.location.search) {
      try {
        let parameterList = window.location.search.slice(1).split('&');
        console.log(parameterList[0].split('=')[1]);
        // let userId = parameterList[0].split('=')[1].slice(0, -1) || null;
        let userId = parameterList[0].split('=')[1] || null;

        console.log('userId:', userId);

        // 0. admin user 校驗
        if (userId === 'admin') {
          formData.account = 'billing';
          formData.password = '123456';
        } else {
          let userListURL = await GetUserInfoList({
            trace_id: Guid.newGuid().toString(),
            bucket_region: import.meta.env.VITE_GLOB_S3_REGION,
            bucket_name: import.meta.env.VITE_GLOB_S3_JSON,
            object_key: 'user.json',
            duration: '10',
          });

          console.log('99999');
          console.log(userListURL);

          if (userListURL) {
            userList = [];
            let temp = await axios.get(userListURL);
            userList = [...temp.data];
          }

          console.log('JSON UserList');
          console.log(userList);

          let checkUser = userList.find((item) => item.userId === userId?.toString());

          // 1.校驗使用者
          if (!checkUser) {
            return createMessage.error('Incorrect account or password！');
          }

          redirectUrl.value = window.location.hash.split('redirect=')[1] || null;
          console.log('redirectUrl:', redirectUrl);

          // 2.跳轉校驗
          if (
            document.referrer.replace(/(^\w+:|^)\/\//, '').replace(/\//, '') !==
            fromURL.replace(/(^\w+:|^)\/\//, '').replace(/\//, '')
          ) {
            createMessage.error('跳轉來源路徑錯誤，請重新登入 MGT 平台 !');
            // setTimeout(() => {
            //   window.location.href = document.referrer;
            // }, 50000);
            return;
          }

          // 3.登入 password give
          if (userId && redirectUrl) {
            formData.account = userId;
            formData.password = '123456';
            handleLogin();
          } else {
            createMessage.error('登入資訊錯誤，請重新登入 MGT 平台 !!');
          }
        }
      } catch (e) {
        createMessage.error('redirect 錯誤，請重新登入 MGT 平台 !!');
        // setTimeout(() => {
        //   window.location.href = fromURL;
        // }, 5000);
      }
    } else {
      createMessage.error('登入資訊錯誤，請重新登入 MGT 平台 !!!');
      // setTimeout(() => {
      //   window.location.href = fromURL;
      // }, 5000);
    }
  });
</script>
