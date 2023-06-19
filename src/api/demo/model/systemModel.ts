/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2023-05-04 22:15:16
 * @LastEditors: Telliex
 * @LastEditTime: 2023-06-19 02:36:14
 */
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type AccountParams = BasicPageParams & {
  account?: string;
  nickname?: string;
};

export type RoleParams = {
  roleName?: string;
  status?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export type DeptParams = {
  deptName?: string;
  status?: string;
};

export type MenuParams = {
  menuName?: string;
  status?: string;
};
export type NavParams = {
  id?: string;
  status?: string;
};

export interface AccountListItem {
  id: string;
  account: string;
  email: string;
  nickname: string;
  role: number;
  createTime: string;
  remark: string;
  status: number;
}

export interface DeptListItem {
  id: string;
  orderNo: string;
  createTime: string;
  remark: string;
  status: number;
}

export interface MenuListItem {
  id: string;
  orderNo: string;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
}

export interface RoleListItem {
  id: string;
  roleName: string;
  roleValue: string;
  status: number;
  orderNo: string;
  createTime: string;
}

export interface NavListItem {
  id: string;
  type: string;
  menuName: string;
  description: string;
  permission: string;
  component: string;
  componentName: string;
  routPath: string;
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

/**
 * @description: Request list return value
 */
export type AccountListGetResultModel = BasicFetchResult<AccountListItem>;

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];

export type NavListResultModel = BasicFetchResult<NavListItem>;
