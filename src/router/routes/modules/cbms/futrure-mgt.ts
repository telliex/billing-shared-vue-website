/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2022-11-14 06:35:00
 * @LastEditors: Telliex
 * @LastEditTime: 2023-04-26 06:06:07
 */
import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';
import { LAYOUT } from '/@/router/constant';
// const IFrame = () => import('/@/views/sys/iframe/FrameBlank.vue');
import { t } from '/@/hooks/web/useI18n';

// const host = import.meta.env.VITE_GLOB_OLD_MGT_URL;
// const host = 'http://localhost:3131/';

const iframe: AppRouteModule[] = [
  // {
  //   path: '/eterne',
  //   name: 'customerAdd',
  //   component: LAYOUT,
  //   redirect: '/eterne/customer_new',
  //   meta: {
  //     icon: 'ion:disc-outline',
  //     title: t('routes.demo.mgt.billCustomerNew'),
  //     orderNo: 1006,
  //     hideMenu: false,
  //     hideChildrenInMenu: true,
  //   },
  //   children: [
  //     {
  //       path: 'customer_new',
  //       name: 'addCustomer',
  //       component: () => import('/@/views/pages/customer/AddCustomer.vue'),
  //       meta: {
  //         title: t('routes.demo.mgt.billCustomerNew'),
  //         hideMenu: false,
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/eterne',
  //   name: 'customerList',
  //   component: LAYOUT,
  //   redirect: '/eterne/customer_list',
  //   meta: {
  //     orderNo: 1004,
  //     icon: 'ion:disc-outline',
  //     title: t('routes.demo.mgt.billCustomerList'),
  //     hideMenu: false,
  //     hideChildrenInMenu: true,
  //   },
  //   children: [
  //     {
  //       path: 'customer_list',
  //       name: 'listCustomer',
  //       component: () => import('/@/views/pages/customer/ListCustomer.vue'),
  //       meta: {
  //         title: t('routes.demo.mgt.billCustomerList'),
  //         hideMenu: false,
  //       },
  //     },
  //   ],
  // },
  {
    path: '/eterne',
    name: 'contractList',
    component: LAYOUT,
    redirect: '/eterne/contract_list',
    meta: {
      orderNo: 1004,
      icon: 'ion:disc-outline',
      title: t('routes.demo.mgt.billContract'),
      hideMenu: true,
      hideChildrenInMenu: true,
    },
    children: [
      {
        path: 'contract_list',
        name: 'listCustomer',
        component: () => import('/@/views/pages/contract/index.vue'),
        meta: {
          title: t('routes.demo.mgt.billContractList'),
          hideMenu: false,
          roles: [
            RoleEnum.OPERATION,
            RoleEnum.SUPER,
            RoleEnum.DEVELOPER,
            RoleEnum.TEST,
            RoleEnum.BU,
          ],
        },
      },
    ],
  },
  {
    path: '/test',
    name: 'TestForAccountant',
    component: LAYOUT,
    redirect: '/test/accountant',
    meta: {
      orderNo: 1,
      icon: 'ion:disc-outline',
      title: 'TestForAccountant',
      hideMenu: false,
      hideChildrenInMenu: true,
      roles: [RoleEnum.ACCOUNTANT],
    },
    children: [
      {
        path: 'accountant',
        name: 'Accountant',
        component: () => import('/@/views/pages/test/Accountant.vue'),
        meta: {
          title: 'TestForAccountant',
          hideMenu: false,
        },
      },
    ],
  },
  {
    path: '/test',
    name: 'TestForDevelop',
    component: LAYOUT,
    redirect: '/test/develop',
    meta: {
      orderNo: 2,
      icon: 'ion:disc-outline',
      title: 'TestForDevelop',
      hideMenu: false,
      hideChildrenInMenu: true,
      roles: [RoleEnum.DEVELOP],
    },
    children: [
      {
        path: 'develop',
        name: 'Develop',
        component: () => import('/@/views/pages/test/Developer.vue'),
        meta: {
          title: 'TestForDevelop',
          hideMenu: false,
        },
      },
    ],
  },
  {
    path: '/test',
    name: 'TestForSales',
    component: LAYOUT,
    redirect: '/test/sales',
    meta: {
      orderNo: 2,
      icon: 'ion:disc-outline',
      title: 'TestForSales',
      hideMenu: false,
      hideChildrenInMenu: true,
      roles: [RoleEnum.SALES],
    },
    children: [
      {
        path: 'sales',
        name: 'Sales',
        component: () => import('/@/views/pages/test/Sales.vue'),
        meta: {
          title: 'TestForSales',
          hideMenu: false,
        },
      },
    ],
  },
];

export default iframe;
