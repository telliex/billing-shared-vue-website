/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2023-05-04 22:15:16
 * @LastEditors: Telliex.Chiu Telliex.Chiu@ecliudvalle.com.tw
 * @LastEditTime: 2023-07-18 05:20:14
 */
import { BasicFetchResult } from '/@/api/model/baseModel';

export type MenuParams = {
  menuName?: string;
  status?: string;
};
export interface MenuListItem {
  id: string;
  orderNo: string;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  permission: string;
}

/**
 * @description: Request list return value
 */

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;
