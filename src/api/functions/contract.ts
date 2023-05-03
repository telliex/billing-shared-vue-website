import { defHttp } from '/@/utils/http/axios';
import { useUserStore } from '/@/store/modules/user';
import dayjs from 'dayjs';
import {
  GetContractListSendModel,
  GetContractListResultModel,
  GetContractInfoSendModel,
  GetContractInfoResultModel,
  // CreateContractSendModel,
  UpdateContractSendModel,
  DeleteContractSendModel,
  StopContractSendModel,
  GetContractIdDropdown,
  GetPayerAccountIdDropdown,
  GetContractTypeDropdown,
} from './model/contractModel';

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
export const getContractList = (data: GetContractListSendModel) =>
  defHttp.post<GetContractListResultModel>(
    {
      url: version + Api.ContractList,
      data,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
    },
    {
      apiUrl: '/api',
    },
  );

export const getContractInfo = (data: GetContractInfoSendModel) =>
  defHttp.post<GetContractInfoResultModel>(
    {
      url: version + Api.ContractInfo,
      data,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
    },
    {
      apiUrl: '/api',
    },
  );

export const deleteContract = (data: DeleteContractSendModel) =>
  defHttp.post(
    {
      url: version + Api.ContractDelete,
      data,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
    },
    {
      apiUrl: '/api',
    },
  );

export const createContract = (data: any) =>
  defHttp.post(
    {
      url: version + Api.ContractCreate,
      data,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
    },
    {
      apiUrl: '/api',
    },
  );

export const updateContract = (data: UpdateContractSendModel) =>
  defHttp.post(
    {
      url: version + Api.ContractUpdate,
      data,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
    },
    {
      apiUrl: '/api',
    },
  );

export const stopContract = (data: StopContractSendModel) =>
  defHttp.post(
    {
      url: version + Api.ContractStop,
      data,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
    },
    {
      apiUrl: '/api',
    },
  );

export const getContractDropdown = (data: GetContractIdDropdown) =>
  defHttp.post(
    {
      url: version + Api.ContractDropdown,
      data,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
    },
    {
      apiUrl: '/api',
    },
  );

export const getContractTypeDropdown = (data: GetContractTypeDropdown) =>
  defHttp.post(
    {
      url: version + Api.ContractTypeDropdown,
      data,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
    },
    {
      apiUrl: '/api',
    },
  );
export interface selectParams {
  trace_id: string;
}

export const getPayerAccountIdDropdown = (data: GetPayerAccountIdDropdown) =>
  defHttp.post(
    {
      url: version + Api.PayerAccountIdDropdown,
      data,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
    },
    {
      apiUrl: '/api',
    },
  );

// export const getPayerAccountIdDropdown = (params?: selectParams) =>
//   defHttp.post({ url: version + Api.PayerAccountIdDropdown, params });
