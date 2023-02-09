/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2022-10-06 08:36:18
 * @LastEditors: Telliex
 * @LastEditTime: 2023-02-09 06:26:25
 */
import type { AppRouteModule } from '/@/router/types';
import { RoleEnum } from '/@/enums/roleEnum';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const reports: AppRouteModule = {
  path: '/reports',
  name: 'Reports',
  component: LAYOUT,
  redirect: '/reports/reportCatogery1',
  meta: {
    icon: 'clarity:bar-chart-line',
    title: t('routes.reports.report'),
    orderNo: 1,
  },
  children: [
    {
      path: 'reportCatogery-template1',
      name: 'reportCatogery0',
      component: () => import('/@/views/reports/Report-template1.vue'),
      meta: {
        title: 'Report-template1',
        icon: 'ri:article-line',
        hideMenu: false,
      },
    },
    {
      path: 'reportCatogery-template2',
      name: 'reportCatogery-template2',
      component: () => import('/@/views/reports/Report-template2.vue'),
      meta: {
        title: 'Report-template2',
        icon: 'ri:article-line',
        hideMenu: false,
      },
    },
    {
      path: 'reportCatogery1',
      name: 'reportCatogery1',
      component: () => import('/@/views/reports/Report1.vue'),
      meta: {
        title: t('routes.reports.report1'),
        icon: 'ri:article-line',
        roles: [RoleEnum.TEST, RoleEnum.SUPER],
      },
    },
    {
      path: 'reportCatogery2',
      name: 'reportCatogery2',
      component: () => import('/@/views/reports/Report2.vue'),
      meta: {
        title: t('routes.reports.report2'),
        icon: 'ri:article-line',
        roles: [RoleEnum.DEVELOP, RoleEnum.SUPER],
      },
    },
    {
      path: 'reportCatogery3',
      name: 'reportCatogery3',
      component: () => import('/@/views/reports/Report3.vue'),
      meta: {
        hideMenu: true,
        title: t('routes.reports.report3'),
        icon: 'ri:article-line',
        roles: [RoleEnum.TEST, RoleEnum.SUPER],
      },
    },
    {
      path: 'reportCatogery4',
      name: 'reportCatogery4',
      component: () => import('/@/views/reports/Report4.vue'),
      meta: {
        hideMenu: true,
        title: t('routes.reports.report4'),
        icon: 'ri:article-line',
        roles: [RoleEnum.DEVELOP, RoleEnum.SUPER],
      },
    },
    {
      path: 'reportCatogery5',
      name: 'reportCatogery5',
      component: () => import('/@/views/reports/Report5.vue'),
      meta: {
        hideMenu: true,
        title: t('routes.reports.report5'),
        icon: 'ri:article-line',
        roles: [RoleEnum.TEST, RoleEnum.SUPER],
      },
    },
    {
      path: 'reportCatogery6',
      name: 'reportCatogery6',
      component: () => import('/@/views/reports/Report6.vue'),
      meta: {
        hideMenu: true,
        title: t('routes.reports.report6'),
        icon: 'ri:article-line',
        roles: [RoleEnum.DEVELOP, RoleEnum.SUPER],
      },
    },
    {
      path: 'reportCatogery7',
      name: 'reportCatogery7',
      component: () => import('/@/views/reports/Report7.vue'),
      meta: {
        hideMenu: true,
        title: t('routes.reports.report7'),
        icon: 'ri:article-line',
        roles: [RoleEnum.TEST, RoleEnum.SUPER],
      },
    },
  ],
};

export default reports;
