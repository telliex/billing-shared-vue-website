import type { AppRouteRecordRaw, Menu } from '/@/router/types';

import { defineStore } from 'pinia';
import { store } from '/@/store';
import { useI18n } from '/@/hooks/web/useI18n';
import { useUserStore } from './user';
import { useAppStoreWithOut } from './app';
import { toRaw } from 'vue';
import { transformObjToRoute, flatMultiLevelRoutes } from '/@/router/helper/routeHelper';
import { transformRouteToMenu } from '/@/router/helper/menuHelper';

import projectSetting from '/@/settings/projectSetting';

import { PermissionModeEnum } from '/@/enums/appEnum';

import { asyncRoutes } from '/@/router/routes';
import { ERROR_LOG_ROUTE, PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';

import { filter } from '/@/utils/helper/treeHelper';

// import { getMenuList } from '/@/api/sys/menu';
import { getDynamicNavList } from '/@/api/sys/menu';
import { getPermCode } from '/@/api/sys/user';

import { useMessage } from '/@/hooks/web/useMessage';
import { PageEnum } from '/@/enums/pageEnum';

interface PermissionState {
  // Permission code list
  // 權限代碼列表
  permCodeList: string[] | number[];
  // Whether the route has been dynamically added
  // 路由是否動態添加
  isDynamicAddedRoute: boolean;
  // To trigger a menu update
  // 觸發選單更新
  lastBuildMenuTime: number;
  // Backstage menu list
  // 後台選單列表
  backMenuList: Menu[];
  // 選單列表
  frontMenuList: Menu[];
}

export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    // 權限代碼列表
    permCodeList: [],
    // Whether the route has been dynamically added
    // 路由是否動態添加
    isDynamicAddedRoute: false,
    // To trigger a menu update
    // 觸發選單更新
    lastBuildMenuTime: 0,
    // Backstage menu list
    // 後台選單列表
    backMenuList: [],
    // menu List
    // 選單列表
    frontMenuList: [],
  }),
  getters: {
    getPermCodeList(state): string[] | number[] {
      return state.permCodeList;
    },
    getBackMenuList(state): Menu[] {
      return state.backMenuList;
    },
    getFrontMenuList(state): Menu[] {
      return state.frontMenuList;
    },
    getLastBuildMenuTime(state): number {
      return state.lastBuildMenuTime;
    },
    getIsDynamicAddedRoute(state): boolean {
      return state.isDynamicAddedRoute;
    },
  },
  actions: {
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList;
    },

    setBackMenuList(list: Menu[]) {
      this.backMenuList = list;
      list?.length > 0 && this.setLastBuildMenuTime();
    },

    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list;
    },

    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime();
    },

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    resetState(): void {
      this.isDynamicAddedRoute = false;
      this.permCodeList = [];
      this.backMenuList = [];
      this.lastBuildMenuTime = 0;
    },
    async changePermissionCode() {
      // depend on user id to get permission code list

      const codeList = await getPermCode();
      this.setPermCodeList(codeList.items);
    },

    // 構建路由
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const { t } = useI18n();
      const userStore = useUserStore();
      const appStore = useAppStoreWithOut();

      let routes: AppRouteRecordRaw[] = [];
      const roleList = toRaw(userStore.getRoleList) || [];
      const { permissionMode = projectSetting.permissionMode } = appStore.getProjectConfig;

      // 路由過濾器 在 函數filter 作為回調傳入遍歷使用
      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        // 抽出角色
        const { roles } = meta || {};
        if (!roles) return true;
        // 進行角色權限判斷
        return roleList.some((role) => roles.includes(role));
      };

      const routeRemoveIgnoreFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        // ignoreRoute 為true 則路由僅用於選單生成，不會在實際的路由表中出現
        const { ignoreRoute } = meta || {};
        // arr.filter 返回 true 表示該元素通過測試
        return !ignoreRoute;
      };

      /**
       * @description 根據設置的首頁path，修正routes中的affix標記（固定首頁）
       * */
      const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
        if (!routes || routes.length === 0) return;
        let homePath: string = userStore.getUserInfo.homePath || PageEnum.BASE_HOME;

        function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
          if (parentPath) parentPath = parentPath + '/';
          routes.forEach((route: AppRouteRecordRaw) => {
            const { path, children, redirect } = route;
            const currentPath = path.startsWith('/') ? path : parentPath + path;
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string;
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true });
                throw new Error('end');
              }
            }
            children && children.length > 0 && patcher(children, currentPath);
          });
        }

        try {
          patcher(routes);
        } catch (e) {
          // 已處理完畢跳出循環
        }
        return;
      };

      switch (permissionMode) {
        // 角色權限
        case PermissionModeEnum.ROLE:
          console.log('PermissionModeEnum.ROLE');
          // 對非一級路由進行過濾
          routes = filter(asyncRoutes, routeFilter);
          // 對一級路由根據角色權限過濾
          routes = routes.filter(routeFilter);
          // Convert multi-level routing to level 2 routing
          // 將多級路由轉換為 2 級路由
          routes = flatMultiLevelRoutes(routes);
          break;

        // 路由映射， 默認進入該case
        case PermissionModeEnum.ROUTE_MAPPING:
          console.log('PermissionModeEnum.ROUTE_MAPPING');
          // 對非一級路由進行過濾
          routes = filter(asyncRoutes, routeFilter);
          // 對一級路由再次根據角色權限過濾
          routes = routes.filter(routeFilter);
          // 將路由轉換成選單
          const menuList = transformRouteToMenu(routes, true);
          // 移除掉 ignoreRoute: true 的路由 非一級路由
          routes = filter(routes, routeRemoveIgnoreFilter);
          // 移除掉 ignoreRoute: true 的路由 一級路由；
          routes = routes.filter(routeRemoveIgnoreFilter);
          // 對選單進行排序
          menuList.sort((a, b) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
          });

          // 設置選單列表
          this.setFrontMenuList(menuList);

          // Convert multi-level routing to level 2 routing
          // 將多級路由轉換為 2 級路由
          routes = flatMultiLevelRoutes(routes);
          break;

        //  If you are sure that you do not need to do background dynamic permissions, please comment the entire judgment below
        //  如果確定不需要做後台動態權限，請在下方註釋整個判斷
        case PermissionModeEnum.BACK:
          const { createMessage } = useMessage();
          console.log('PermissionModeEnum.BACK');
          createMessage.loading({
            content: t('sys.app.menuLoading'),
            duration: 1,
          });

          // !Simulate to obtain permission codes from the background,
          // 模擬從後台獲取權限碼，
          // this function may only need to be executed once, and the actual project can be put at the right time by itself
          // 這個功能可能只需要執行一次，實際項目可以自己放在合適的時間
          // let routeListOri: AppRouteRecordRaw[] = [];
          let routeListOri: any[] = [];
          try {
            // write Permission codes to pinia
            await this.changePermissionCode();

            const temp = await getDynamicNavList();
            console.log('temp------------:', temp[0].items);

            const testMenu = [
              {
                id: '323ef5b1-e92e-467d-bef2-fc8e86eb3a04',
                type: 'catalog',
                path: '/home',
                name: 'Home',
                redirect: '/home/index',
                isExt: 0,
                parentMenu: '',
                caseSensitive: true,
                component: 'LAYOUT',
                componentName: 'Home',
                meta: {
                  hideMenu: true,
                  title: 'Home',
                  hideChildrenInMenu: true,
                  icon: 'bx:bx-home',
                  orderNo: 100,
                },
                children: [
                  {
                    id: 'b4c5d583-310d-4c27-b0b2-62303eab613d',
                    type: 'page',
                    path: 'index',
                    name: 'HomePage',
                    component: '/frontpage/index',
                    parentMenu: '323ef5b1-e92e-467d-bef2-fc8e86eb3a04',
                    meta: {
                      currentActiveMenu: '/home',
                      hideMenu: true,
                      hideBreadcrumb: true,
                      title: 'Home',
                      icon: 'ri:home-4-line',
                    },
                  },
                ],
              },
              {
                id: 'fe8a905b-7c3c-4fb1-9c84-e9ac1ef86bd4',
                type: 'page',
                path: '',
                title: 'About',
                name: 'AboutParent',
                status: 1,
                isExt: 0,
                redirect: null,
                parentMenu: '',
                caseSensitive: true,
                component: 'LAYOUT',
                componentName: 'About',
                meta: {
                  hideMenu: false,
                  title: 'About',
                  hideChildrenInMenu: false,
                  icon: 'ic:baseline-10k',
                  ignoreKeepAlive: false,
                  single: true,
                  affix: false,
                },
                children: [
                  {
                    id: 'fe8a905b-7c3c-4fb1-9c84-e9ac1ef86bd3',
                    type: 'page',
                    path: 'about',
                    title: 'About',
                    name: 'About',
                    status: 1,
                    isExt: 0,
                    redirect: null,
                    parentMenu: 'fe8a905b-7c3c-4fb1-9c84-e9ac1ef86bd4',
                    caseSensitive: true,
                    component: '/sys/about/index',
                    meta: {
                      hideMenu: false,
                      title: 'About',
                      hideChildrenInMenu: false,
                      icon: 'ic:baseline-10k',
                      ignoreKeepAlive: false,
                    },
                  },
                ],
              },
              {
                id: 'cad32205-7dde-498b-832f-e880ae29cb5a',
                type: 'catalog',
                path: '/system',
                title: 'System',
                name: 'System',
                status: 1,
                isExt: 0,
                redirect: null,
                parentMenu: '',
                caseSensitive: true,
                component: 'LAYOUT',
                componentName: 'System',
                meta: {
                  hideMenu: false,
                  title: 'System',
                  hideChildrenInMenu: false,
                  icon: 'ion:settings-outline',
                  ignoreKeepAlive: true,
                },
                children: [
                  {
                    id: 'a8814e3d-ff4d-4ad8-a7d4-60ad461e561e',
                    type: 'page',
                    path: 'user',
                    title: 'User',
                    name: 'User',
                    status: 1,
                    isExt: 0,
                    redirect: null,
                    parentMenu: 'cad32205-7dde-498b-832f-e880ae29cb5a',
                    caseSensitive: true,
                    componentName: 'User',
                    component: '/sys/account/index',
                    meta: {
                      hideMenu: false,
                      title: 'User',
                      hideChildrenInMenu: false,
                      icon: null,
                      ignoreKeepAlive: false,
                    },
                  },
                  {
                    id: 'ab1c4da4-98d1-4c6c-8e8a-39551d762160',
                    type: 'page',
                    path: 'role',
                    title: 'Role',
                    name: 'Role',
                    status: 1,
                    isExt: 0,
                    redirect: null,
                    parentMenu: 'cad32205-7dde-498b-832f-e880ae29cb5a',
                    caseSensitive: true,
                    componentName: 'Role',
                    component: '/sys/role/index',
                    meta: {
                      hideMenu: false,
                      title: 'Role',
                      hideChildrenInMenu: false,
                      icon: null,
                      ignoreKeepAlive: false,
                    },
                  },
                  {
                    id: '386c4117-2938-4041-97ae-2ffeddcf3a1b',
                    type: 'page',
                    path: 'menu',
                    title: 'Menu',
                    name: 'Menu',
                    status: 1,
                    isExt: 0,
                    redirect: null,
                    parentMenu: 'cad32205-7dde-498b-832f-e880ae29cb5a',
                    caseSensitive: true,
                    componentName: 'Menu',
                    component: '/sys/menu/index',
                    meta: {
                      hideMenu: false,
                      title: 'Menu',
                      hideChildrenInMenu: false,
                      icon: null,
                      ignoreKeepAlive: false,
                    },
                  },
                  {
                    id: 'e7479cec-8f7d-4a6c-94f8-06028c71b855',
                    type: 'page',
                    path: 'dept',
                    title: 'Department',
                    name: 'Dept',
                    status: 1,
                    isExt: 0,
                    redirect: null,
                    parentMenu: 'cad32205-7dde-498b-832f-e880ae29cb5a',
                    caseSensitive: true,
                    componentName: 'Dept',
                    component: '/sys/dept/index',
                    meta: {
                      hideMenu: false,
                      title: 'Dept',
                      hideChildrenInMenu: false,
                      icon: null,
                      ignoreKeepAlive: false,
                    },
                  },
                ],
              },
            ];
            routeListOri = temp[0].items;
          } catch (error) {
            console.error(error);
          }

          // Dynamically introduce components
          // 動態引入組件
          let routeList = transformObjToRoute(routeListOri);
          //  Background routing to menu structure
          //  後台路由到選單結構
          const backMenuList = transformRouteToMenu(routeList);
          this.setBackMenuList(backMenuList);

          // remove meta.ignoreRoute item
          // 刪除 meta.ignoreRoute 項
          routeList = filter(routeList, routeRemoveIgnoreFilter);
          routeList = routeList.filter(routeRemoveIgnoreFilter);

          routeList = flatMultiLevelRoutes(routeList);
          routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
          break;
      }
      routes.push(ERROR_LOG_ROUTE);
      patchHomeAffix(routes);
      return routes;
    },
  },
});

// Need to be used outside the setup
// 需要在設置之外使用
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
