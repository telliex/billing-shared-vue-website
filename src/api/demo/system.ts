import { MenuParams, MenuListGetResultModel } from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  MenuList = '/system/getMenuList',
}

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });
