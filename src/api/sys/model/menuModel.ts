import type { RouteMeta } from 'vue-router';
import { BasicFetchResult } from '/@/api/model/baseModel';

export interface NavListItem {
  id: string;
  type: string;
  menuName: string;
  alias: string;
  description: string;
  permission: string;
  component: string;
  componentName: string;
  routePath: string;
  orderNo: number;
  icon: string;
  parentMenu: string;
  iExt: number;
  isCache: number;
  isShow: number;
  status: number;
  addMaster: number;
  addTime: string;
  changeMaster: number;
  changeTime: string;
}
export interface RouteItem {
  path: string;
  component: any;
  meta: RouteMeta;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
}

export type NavParams = {
  id?: string;
  status?: number;
};

/**
 * @description: Get menu return value
 */
// export type getMenuListResultModel = RouteItem[];
export type getNavListResultModel = RouteItem[];

export type NavListResultModel = BasicFetchResult<NavListItem>;
