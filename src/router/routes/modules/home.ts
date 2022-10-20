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
      meta: {
        title: t('routes.dashboard.frontpage'),
        icon: 'ri:home-4-line',
      },
    },
  ],
};

export default home;
