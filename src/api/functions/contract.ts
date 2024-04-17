import { defHttp } from '/@/utils/http/axios';

import { createLocalStorage } from '/@/utils/cache';

import {
  GetContractListSendModel,
  GetContractListResultModel,
  GetContractInfoSendModel,
  // GetContractInfoResultModel,
  // CreateContractSendModel,
  UpdateContractSendModel,
  DeleteContractSendModel,
  StopContractSendModel,
  GetContractIdDropdown,
  GetPayerAccountIdDropdown,
  GetContractTypeDropdown,
} from './model/contractModel';

import { API_CONFIG } from '/@/settings/apiSetting';
import { apiTransDataForHeader } from '/@/utils/tools';
const ls = createLocalStorage();
enum Api {
  ContractList = `/contract/get-contract-list`,
  ContractInfo = `/contract/get-contract`,
  ContractDelete = `/contract/delete-contract`,
  ContractCreate = `/contract/create-contract`,
  ContractUpdate = `/contract/update-contract`,
  ContractStop = `/contract/stop-contract`,
  ContractDropdown = `/contract/get-contract-dropdown`,
  ContractTypeDropdown = `/contract/get-contract-type-dropdown`,
  PayerAccountIdDropdown = `/common/get-payer-account-id-dropdown`,
}

// 查詢合約 res
export const getContractList = (body: GetContractListSendModel) =>
  defHttp.post<GetContractListResultModel>(
    {
      url: `${API_CONFIG.VERSION}${Api.ContractList}`,
      data: body,
      headers: { ...apiTransDataForHeader(), 'User-Id': ls.get('TEMP_MGT_ID_KEY__') },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/contract-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );

export const getContractInfo = (body: GetContractInfoSendModel) =>
  defHttp.post(
    {
      url: `${API_CONFIG.VERSION}${Api.ContractInfo}`,
      data: body,
      headers: { ...apiTransDataForHeader(), 'User-Id': ls.get('TEMP_MGT_ID_KEY__') },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/contract-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );

export const deleteContract = (body: DeleteContractSendModel) =>
  defHttp.post(
    {
      url: `${API_CONFIG.VERSION}${Api.ContractDelete}`,
      data: body,
      headers: { ...apiTransDataForHeader(), 'User-Id': ls.get('TEMP_MGT_ID_KEY__') },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/contract-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );

export const createContract = (body: any) =>
  defHttp.post(
    {
      url: `${API_CONFIG.VERSION}${Api.ContractCreate}`,
      data: body,
      headers: { ...apiTransDataForHeader(), 'User-Id': ls.get('TEMP_MGT_ID_KEY__') },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/contract-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );

export const updateContract = (body: UpdateContractSendModel) =>
  defHttp.post(
    {
      url: `${API_CONFIG.VERSION}${Api.ContractUpdate}`,
      data: body,
      headers: { ...apiTransDataForHeader(), 'User-Id': ls.get('TEMP_MGT_ID_KEY__') },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/contract-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );

export const stopContract = (body: StopContractSendModel) =>
  defHttp.post(
    {
      url: `${API_CONFIG.VERSION}${Api.ContractStop}`,
      data: body,
      headers: { ...apiTransDataForHeader(), 'User-Id': ls.get('TEMP_MGT_ID_KEY__') },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/contract-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );

export const getContractDropdown = (body: GetContractIdDropdown) =>
  defHttp.post(
    {
      url: `${API_CONFIG.VERSION}${Api.ContractDropdown}`,
      data: body,
      headers: { ...apiTransDataForHeader(), 'User-Id': ls.get('TEMP_MGT_ID_KEY__') },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/contract-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
// export const getContractDropdown = (data: GetContractIdDropdown) =>
//   defHttp.post(
//     {
//       url: '/v1.0' + Api.ContractDropdown,
//       data,
//       headers: {
//         'User-Id': 144,
//         'Time-Zone': 'UTC+0',
//       },
//     },
//     {
//       apiUrl: '/contract-api',
//     },
//   );

export const getContractTypeDropdown = (body: GetContractTypeDropdown) =>
  defHttp.post(
    {
      url: `${API_CONFIG.VERSION}${Api.ContractTypeDropdown}`,
      data: body,
      headers: { ...apiTransDataForHeader(), 'User-Id': ls.get('TEMP_MGT_ID_KEY__') },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/contract-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );

export const getPayerAccountIdDropdown = (body: GetPayerAccountIdDropdown) =>
  defHttp.post(
    {
      url: `${API_CONFIG.VERSION}${Api.PayerAccountIdDropdown}`,
      data: body,
      headers: { ...apiTransDataForHeader(), 'User-Id': ls.get('TEMP_MGT_ID_KEY__') },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/contract-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
