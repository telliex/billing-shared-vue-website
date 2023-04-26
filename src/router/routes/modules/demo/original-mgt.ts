/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 3022-11-14 06:35:00
 * @LastEditors: Telliex
 * @LastEditTime: 2023-03-28 00:22:14
 */
import type { AppRouteModule } from '/@/router/types';
// import { RoleEnum } from '/@/enums/roleEnum';
import { LAYOUT } from '/@/router/constant';
const IFrame = () => import('/@/views/sys/iframe/FrameBlank.vue');
import { t } from '/@/hooks/web/useI18n';

const host = import.meta.env.VITE_GLOB_OLD_MGT_URL;
// const host = 'http://localhost:3131/';

const iframe: AppRouteModule = {
  path: '/frame',
  name: 'Frame',
  component: LAYOUT,

  redirect: `${host}`,
  // fullPath: `${host}`,
  meta: {
    icon: 'ion:arrow-undo-sharp',
    realPath: `${host}`,
    title: t('routes.demo.mgt.backMGT'),
    hideChildrenInMenu: true,
    orderNo: 1,
    hideMenu: true,
  },

  children: [
    {
      path: `${host}`,
      name: 'childOldMGT',
      component: IFrame,
      meta: {
        title: t('routes.demo.mgt.backMGT'),
      },
    },
  ],
};

export default iframe;
