/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2023-02-08 02:03:11
 * @LastEditors: Telliex
 * @LastEditTime: 2023-03-07 03:47:47
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const home: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/index',
  meta: {
    hideMenu: true,
    hideChildrenInMenu: true,
    icon: 'ri:home-4-line',
    title: t('routes.dashboard.frontpage'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'HomePage',
      component: () => import('/@/views/frontpage/index.vue'),
      // component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: {
        title: t('routes.dashboard.frontpage'),
        icon: 'ri:home-4-line',
      },
    },
  ],
};

export default home;
