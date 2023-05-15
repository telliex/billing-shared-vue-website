/*
 * @Description:


 * @Anthor: Telliex
 * @Date: 2023-02-08 02:03:09
 * @LastEditors: Telliex
 * @LastEditTime: 2023-04-26 04:56:14
 */
import { defHttp } from '/@/utils/http/axios';
import { useUserStore } from '/@/store/modules/user';
// import { ErrorMessageMode } from '/#/axios';
import dayjs from 'dayjs';

import {
  GetDictionaryModel,
  GetUserInfoModel,
  GetParameterStoreFromAWSModel,
  GetParameterStoreBackAWSModel,
  GetBillCodeValueModel,
  GetBillCodeValueBackModel,
} from './model/systemModel';

enum Api {
  GetUserOwnMenu = '/admin/get-menu-query',
  GetBillUserInfo = '/admin/get-bill-user',
  GetParameterStoreFromAWS = '/get-parameter-store',
  GetBillCodeValue = '/get-billcode-list',
  GetDictionary = '/get-dict-value', // get dictionary
  GetS3TargetUrlValue = '/get-download-url',
  GetPowerBITokenValue = '/token',
}

const version = '/v1.0';
const userStore = useUserStore();
const who = userStore.getUserInfo?.userId;
const timeTemp = dayjs().utcOffset();
let timeZon = '';
if (timeTemp === 0) {
  timeZon = 'UTC+0';
} else if (timeTemp > 0) {
  timeZon = 'UTC+' + timeTemp / 60;
} else if (timeTemp < 0) {
  timeZon = 'UTC-' + timeTemp / 60;
}
export const GetDictionaryItems = (data: GetDictionaryModel) =>
  defHttp.post(
    {
      url: '/parameter' + version + Api.GetDictionary,
      data,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
    },
    {
      apiUrl: '/elu-api',
    },
  );

export const getUserInfo = (data: GetUserInfoModel) =>
  defHttp.post(
    {
      url: version + Api.GetBillUserInfo,
      data,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
    },
    {
      apiUrl: '/elu-api',
    },
  );
export const GetParameterStoreFromAWS = (data: GetParameterStoreFromAWSModel) =>
  defHttp.post<GetParameterStoreBackAWSModel[]>(
    {
      url: '/aws' + version + Api.GetParameterStoreFromAWS,
      data,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
    },
    {
      apiUrl: '/elu-api',
    },
  );

export const GetBillCodeValue = (data: GetBillCodeValueModel) =>
  defHttp.post<GetBillCodeValueBackModel[]>(
    {
      url: '/parameter' + version + Api.GetBillCodeValue,
      data,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
    },
    {
      apiUrl: '/elu-api',
    },
  );

export const GetS3TargetUrl = (params: any) =>
  defHttp.post(
    { url: '/aws' + version + Api.GetS3TargetUrlValue, data: params },
    {
      apiUrl: '/elu-api',
    },
  );

export const GetPowerBIToken = (params: any) =>
  defHttp.post(
    { url: '/', data: params },
    {
      apiUrl: 'https://login.microsoftonline.com/common/oauth2/token',
    },
  );
