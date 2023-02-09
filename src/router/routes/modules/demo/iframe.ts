/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2023-02-08 01:59:18
 * @LastEditors: Telliex
 * @LastEditTime: 2023-02-08 08:13:31
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
const IFrame = () => import('/@/views/sys/iframe/FrameBlank.vue');
import { t } from '/@/hooks/web/useI18n';

const iframe: AppRouteModule = {
  path: '/frame',
  name: 'Frame',
  component: LAYOUT,
  redirect: '/frame/doc',
  meta: {
    orderNo: 1000,
    icon: 'ion:tv-outline',
    title: t('routes.demo.iframe.frame'),
  },

  children: [
    {
      path: 'antv',
      name: 'Antv',
      component: IFrame,
      meta: {
        frameSrc:
          'https://app.powerbi.com/view?r=eyJrIjoiOTYzYThmMDItM2I1OC00NTc1LTkyMWUtZWY0YTE0Njc2M2VhIiwidCI6IjI0ZGI0MDhjLWE3YzgtNGYzYS04ZmY5LTEwODYwYTQ4ZDIzNSIsImMiOjEwfQ%3D%3D',
        title: 'POWER BI',
      },
    },
  ],
};

export default iframe;
