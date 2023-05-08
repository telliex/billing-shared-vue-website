import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';

import { mainOutRoutes } from './mainOut';
import { PageEnum } from '/@/enums/pageEnum';
import { t } from '/@/hooks/web/useI18n';

// import.meta.globEager() 直接引入所有的模块 Vite 独有的功能
const modules = import.meta.globEager('./modules/**/*.ts');
const routeModuleList: AppRouteModule[] = [];
console.log('menue-modules', modules);
// cbs ,cbms
const systemStr = new RegExp(`./modules/${import.meta.env.VITE_GLOB_SYSTEM}/`);
// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  // key.match(/\.\/modules\/cbms\/(.*)\.ts/);
  if (
    /\.\/modules\/common\/(.*)\.ts/.exec(key) ||
    systemStr.exec(key) ||
    /\.\/modules\/demo\/(.*)\.ts/.exec(key)
  ) {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];

    routeModuleList.push(...modList);
  }
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

// Basic routing without permission
// 未经许可的基本路由
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];
