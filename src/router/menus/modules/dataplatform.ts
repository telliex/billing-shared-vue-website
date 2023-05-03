/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2023-02-16 02:26:16
 * @LastEditors: Telliex
 * @LastEditTime: 2023-02-16 02:30:33
 */
import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';
const menu: MenuModule = {
  orderNo: 1,
  menu: {
    name: '=== dataplatform ===',
    path: '/dashboard',

    children: [
      {
        path: 'analysis',
        name: t('routes.dashboard.analysis'),
      },
      {
        path: 'workbench',
        name: t('routes.dashboard.workbench'),
      },
    ],
  },
};
export default menu;
