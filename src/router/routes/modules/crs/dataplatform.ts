import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const report: AppRouteModule = {
  path: '/reports',
  name: 'Reports',
  component: LAYOUT,
  redirect: '/reports/dop-cost',
  meta: {
    orderNo: 500,
    icon: 'ion:bar-chart-outline',
    title: t('routes.reports.reportCollection'),
  },
  children: [
    {
      path: 'dop-cost',
      name: 'dop-cost',
      meta: {
        title: t('routes.reports.dropCost'),
      },
      component: () => import('/@/views/pages/reports/dop-cost.vue'),
    },
    {
      path: 'powerbi',
      name: 'PowerBI',
      meta: {
        title: t('routes.reports.powerBI'),
      },
      // component: () => import('/@/views/pages/reports/Report1.vue'),
      component: () => import('/@/views/pages/reports/Report-template2.vue'),
    },
  ],
};

export default report;
