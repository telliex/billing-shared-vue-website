/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2022-09-30 08:02:54
 * @LastEditors: Telliex.Chiu Telliex.Chiu@ecliudvalle.com.tw
 * @LastEditTime: 2023-07-21 04:17:38
 */
import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: LAYOUT,
  redirect: '/system/account',
  meta: {
    orderNo: 80,
    icon: 'ion:settings-outline',
    title: t('routes.demo.system.moduleName'),
    roles: [RoleEnum.SUPER],
  },
  children: [
    {
      path: 'account',
      name: 'AccountManagement',
      meta: {
        title: t('routes.demo.system.account'),
        ignoreKeepAlive: false,
        hideMenu: true,
      },
      component: () => import('/@/views/sys/account/index.vue'),
    },
    {
      path: 'account_detail/:id',
      name: 'UserDetail',
      meta: {
        title: t('routes.demo.system.account_detail'),
        ignoreKeepAlive: true,
        showMenu: false,
        currentActiveMenu: '/system/account',
        hideMenu: true,
      },
      component: () => import('/@/views/sys/account/AccountDetail.vue'),
    },
    {
      path: 'role',
      name: 'RoleManagement',
      meta: {
        title: t('routes.demo.system.role'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/sys/role/index.vue'),
    },

    {
      path: 'menu',
      name: 'MenuManagement',
      meta: {
        title: t('routes.demo.system.menu'),
        ignoreKeepAlive: true,
      },
      component: () => import('/@/views/sys/menu/index.vue'),
    },
    {
      path: 'dept',
      name: 'DeptManagement',
      meta: {
        title: t('routes.demo.system.dept'),
        ignoreKeepAlive: true,
        hideMenu: true,
      },
      component: () => import('/@/views/sys/dept/index.vue'),
    },
    {
      path: 'changePassword',
      name: 'ChangePassword',
      meta: {
        title: t('routes.demo.system.password'),
        ignoreKeepAlive: true,
        hideMenu: true,
      },
      component: () => import('/@/views/sys/password/index.vue'),
    },
  ],
};

export default system;
