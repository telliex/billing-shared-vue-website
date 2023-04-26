/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:00
 * @LastEditors: Telliex
 * @LastEditTime: 2023-03-07 03:12:47
 */
import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';
import { LAYOUT } from '/@/router/constant';
const IFrame = () => import('/@/views/sys/iframe/FrameBlank.vue');
// import { t } from '/@/hooks/web/useI18n';

const host = import.meta.env.VITE_GLOB_DATAPLATFORM_URL;
//const host = 'http://localhost:4141/';
const targetObj = [
  {
    path: `${host}/bill_master_list.php?searchreturn=y`,
    name: 'BillMasterList',
    icon: 'ph:activity-fill',
    orderNo: 2001,
    title: 'Report Demo1',
  },
  {
    path: `${host}/bill_master_new.php`,
    name: 'BillMasterNew',
    icon: 'ph:activity-fill',
    orderNo: 2002,
    title: 'Report Demo2',
  },
];

const iframe: AppRouteModule[] = [];

targetObj.forEach((item) => {
  // if (index !== 0) {
  iframe.push({
    path: '/frame',
    name: item.name,
    component: LAYOUT,
    redirect: item.path,
    meta: {
      hideChildrenInMenu: true,
      orderNo: item.orderNo,
      icon: item.icon,
      title: item.title,
      roles: [RoleEnum.SUPER],
    },
    children: [
      {
        path: item.path,
        name: 'child' + item.name,
        component: IFrame,
        meta: {
          title: item.title,
        },
      },
    ],
  });
  // }
});

export default iframe;
