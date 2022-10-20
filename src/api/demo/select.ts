/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2022-09-30 08:02:53
 * @LastEditors: Telliex
 * @LastEditTime: 2022-10-11 10:00:12
 */
import { defHttp } from '/@/utils/http/axios';
import { DemoOptionsItem, selectParams } from './model/optionsModel';
enum Api {
  OPTIONS_LIST = '/select/getDemoOptions',
}

/**
 * @description: Get sample options value
 */
export const optionsListApi = (params?: selectParams) =>
  defHttp.get<DemoOptionsItem[]>({ url: Api.OPTIONS_LIST, params });
