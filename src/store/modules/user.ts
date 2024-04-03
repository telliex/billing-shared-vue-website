import type { UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { RoleEnum } from '/@/enums/roleEnum';
import { PageEnum } from '/@/enums/pageEnum';
import {
  ROLES_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
  SYSTEM_KEY,
  COMPANY_KEY,
  USER_KEY,
} from '/@/enums/cacheEnum';
import { getAuthCache, isSHA256Format, setAuthCache, stringToHSA265 } from '/@/utils/auth';
import { GetUserInfoModel, LoginParams } from '/@/api/sys/model/userModel';
// import { logoutApi, getUserInfo, loginApi } from '/@/api/sys/user';
import { loginApi, logoutApi, JWTLoginApi, JWTlogoutApi, JWTRefreshApi } from '/@/api/sys/user';
// import { getBillUserInfo } from '/@/api/sys/system';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
import { isArray } from '/@/utils/is';
import { h } from 'vue';
import { createLocalStorage } from '/@/utils/cache';
import { useLoginState, LoginStateEnum } from '/@/views/sys/login/useLogin';
import { checkLogin3MonthsTimeout } from '/@/utils/tools';

const { setLoginState } = useLoginState();
// import { Guid } from 'js-guid';

const ls = createLocalStorage();
interface UserState {
  userId: string;
  company: string;
  system: string;
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    // user id
    userId: '',
    // 公司別
    company: '',
    // 系統別
    system: '',
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserId(): string {
      return this.userId || getAuthCache<string>(USER_KEY);
    },
    getCompany(): string {
      return this.company || getAuthCache<string>(COMPANY_KEY);
    },
    getSystem(): string {
      return this.system || getAuthCache<string>(SYSTEM_KEY);
    },
    getUserInfo(state): UserInfo {
      return state.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(state): string {
      return state.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(state): RoleEnum[] {
      return state.roleList.length > 0 ? state.roleList : getAuthCache<RoleEnum[]>(ROLES_KEY);
    },
    getSessionTimeout(state): boolean {
      return !!state.sessionTimeout;
    },
    getLastUpdateTime(state): number {
      return state.lastUpdateTime;
    },
  },
  actions: {
    setUserId(id: string | '') {
      this.userId = id;
      setAuthCache(COMPANY_KEY, id);
    },
    setCompany(company: string | '') {
      this.company = company;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(COMPANY_KEY, company);
    },
    setSystem(system: string | '') {
      this.system = system;
      setAuthCache(COMPANY_KEY, system);
    },
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.company = '';
      this.system = '';
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },

    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        // 1、調用登錄接口
        // check password is SHA256 format
        if (!isSHA256Format(loginParams.password)) {
          loginParams.password = await stringToHSA265(loginParams.password);
        }

        const token = await JWTLoginApi({ email: loginParams.username });

        ls.set('USER_TOKEN_OBJECT_KEY__', token[0]);
        console.log('===== token from JWT =====:', token[0]);
        const { apiToken } = token[0];
        // 2、設置 token，並存儲本地緩存。 save token
        this.setToken(apiToken);

        const data = await loginApi(loginParams, mode);
        console.log('login data:', data);

        ls.set('TEMP_USER_INFO_KEY__', data[0].items[0]);
        ls.set('TEMP_MGT_ID_KEY__', data[0].items[0].mgtNumber);
        ls.set('TEMP_USER_ROLE_ID', data[0].items[0].billMasterRoleId);

        if (
          data[0].items[0].isInitPassowrd === true ||
          checkLogin3MonthsTimeout(data[0].items[0].passwordTime)
        ) {
          setLoginState(LoginStateEnum.SET_PASSWORD);

          return null;
        } else {
          ls.set('TEMP_USER_INFO_KEY__', data[0].items[0]); // leave out call getUserInfo();
          return this.afterLoginAction(goHome);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // 3、獲取用户信息
      const userInfo = await this.getUserInfoAction();
      console.log('get user info:', userInfo);
      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        console.log('sessionTimeout');
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        console.log('permissionStore:', permissionStore);
        if (!permissionStore.isDynamicAddedRoute) {
          console.log('動態添加路由配置');
          // 4、獲取路由配置並動態添加路由配置
          const routes = await permissionStore.buildRoutesAction();
          console.log('routes:', routes);
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }
        goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
      }
      return userInfo;
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;

      // const userBillingInfo = await getBillUserInfo({
      //   trace_id: Guid.newGuid().toString(),
      //   id: ls.get('TEMP_MGT_ID_KEY__'),
      // });
      // console.log('Billing_user_info:', userBillingInfo);
      // ls.set('TEMP_USER_BILLING_INFO_KEY__', userBillingInfo);

      const userInfo = ls.get('TEMP_USER_INFO_KEY__');

      const { roles = [] } = userInfo;
      if (isArray(roles)) {
        const roleList = roles.map((item) => item.roleName);
        this.setRoleList(roleList);
      } else {
        userInfo.roles = [];
        this.setRoleList([]);
      }
      this.setUserInfo(userInfo);
      return userInfo;
    },
    /**
     * @description: logout , click left-top coner user avatar
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await logoutApi();
          await JWTlogoutApi();
        } catch {
          console.log('註銷 Token 失敗');
        }
      }

      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);

      ls.set('TEMP_MGT_ID_KEY__', null);
      ls.set('TEMP_USER_INFO_KEY__', null);
      ls.set('TEMP_USER_ROLE_ID', null);
      // ls.set('TEMP_USER_BILLING_INFO_KEY__', null);

      goLogin && router.push(PageEnum.BASE_LOGIN);
    },
    /**
     * @description: refreshToken
     */
    async refreshToken() {
      const token = await JWTRefreshApi();
      ls.set('USER_TOKEN_OBJECT_KEY__', token[0]);
      const { apiToken } = token[0];
      // 2、設置 token，並存儲本地緩存。 save token
      this.setToken(apiToken);
      return token ? true : false;
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
