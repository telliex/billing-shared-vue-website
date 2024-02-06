import type { RouteMeta } from 'vue-router';
import { BasicFetchResult } from '/@/api/model/baseModel';

import { ItemAdditionInfo } from '/@/api/sys/model/normalModel';

export interface NavListItem extends ItemAdditionInfo {
  id: string;
  type: string;
  menuName: string;
  // alias: string;
  description: string;
  // permission: string;
  component: string;
  componentName: string;
  routePath: string;
  sortNo: number;
  icon: string;
  parentMenu: string;
  isExt: number;
  // isShow: number;
  status: number;
}

export interface RouteItem {
  id: string;
  path: string;
  type: number;
  component: string;
  componentName: string;
  meta: RouteMeta;
  name: string;
  isExt: number;
  parentMenu: string;
  caseSensitive: boolean;
  redirect?: string;
  children?: RouteItem[];
}

export type NavParams = {
  roleName?: string | null;
  status?: number | null;
};

/**
 * @description: Get menu return value
 */
// export type getMenuListResultModel = RouteItem[];
export type getNavListResultModel = RouteItem[];
export type NavListResultModel = BasicFetchResult<NavListItem>;

export interface ButtonItem extends ItemAdditionInfo {
  id: string;
  buttonName: string;
  description: string;
  belongMenu: string;
  permission: string;
  isShow: number;
  status: number;
}

export type getButtonListResultModel = ButtonItem[];
export type ButtonListResultModel = BasicFetchResult<ButtonItem>;
