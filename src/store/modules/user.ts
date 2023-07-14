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
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { GetUserInfoModel, LoginParams } from '/@/api/sys/model/userModel';
// import { doLogout, getUserInfo, loginApi } from '/@/api/sys/user';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
import { isArray } from '/@/utils/is';
import { h } from 'vue';
import { createLocalStorage } from '/@/utils/cache';

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
        // todo recovery == start
        // const data = await loginApi(loginParams, mode);
        // const { token } = data;
        // todo recovery == end
        // todo remove == start
        const { token } = ls.get('TEMP_USER_INFO_KEY__');
        // todo remove == end
        // 2、設置 token，並存儲本地緩存。 save token
        this.setToken(token);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // 3、獲取用户信息
      const userInfo = await this.getUserInfoAction();
      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          // 4、獲取路由配置並動態添加路由配置
          const routes = await permissionStore.buildRoutesAction();
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
      // todo recovery == start
      // const userInfo = await getUserInfo();
      // todo recovery == end
      const userInfo = ls.get('TEMP_USER_INFO_KEY__');

      const { roles = [] } = userInfo;
      if (isArray(roles)) {
        const roleList = roles.map((item) => item.value) as RoleEnum[];
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
      // temp login 暫時 remove
      // todo recovery == start
      // if (this.getToken) {
      //   try {
      //     await doLogout();
      //   } catch {
      //     console.log('註銷Token失敗');
      //   }
      // }
      // todo recovery == end
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      // todo remove == start
      ls.set('TEMP_USER_ID_KEY__', null);
      ls.set('TEMP_USER_INFO_KEY__', null);
      ls.set('TEMP_JSON_URL_KEY__', null);
      // todo remove == end
      // goLogin && router.push(PageEnum.BASE_LOGIN);
      if (goLogin) {
        window.location.href = import.meta.env.VITE_GLOB_OLD_MGT_URL + '/index.php?logout';
      }
      // router.push( import.meta.env.VITE_GLOB_OLD_MGT_URL+'/index.php?logout');
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
