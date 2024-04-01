import { defHttp } from '/@/utils/http/axios';
// import { ErrorMessageMode } from '/#/axios';

import {
  GetDictionaryModel,
  // GetBillingUserInfoModel,
  GetParameterStoreFromAWSModel,
  GetParameterStoreBackAWSModel,
  GetBillCodeValueModel,
  GetBillCodeValueBackModel,
  RolePageListGetResultModel,
  // RoleListGetResultModel,
  RolePageParams,
  // RoleParams,
  DeptPageParams,
  DeptItem,
  DeptPageListGetResultModel,
  UserPageParams,
  UserItem,
  UserPageListGetResultModel,
} from './model/systemModel';

import { API_CONFIG } from '/@/settings/apiSetting';
import { apiTransDataForHeader } from '/@/utils/tools';
import { createLocalStorage } from '/@/utils/cache';
const ls = createLocalStorage();

enum Api {
  GetUserOwnMenu = '/admin/get-menu-query',
  GetBillUserInfo = '/admin/get-bill-user',
  GetParameterStoreFromAWS = '/get-parameter-store',
  GetBillCodeValue = '/get-billcode-list',
  GetDictionary = '/get-dict-value', // get dictionary
  GetS3TargetUrlValue = '/get-download-url',
  GetPowerBIAccessTokenValue = '/billing-powerbi-get-access-token',
  GetPowerBIEmbedInfoValue = '/billing-powerbi-get-embed-info',
  GetPowerBIEmbedDataValue = '/billing-powerbi-get-embed-data',
  GetUserPermissionValue = '/mgt-permission/get-user-permission-by-user',
  GetUserPermissionRoleListValue = '/mgt-permission/get-permission',
  // GetPowerBIFilterValueValue = '/billing-powerbi-get-filter-value',
  GetUserPermissionGetRoleScopeValue = '/mgt-permission/get-role-scope',
  GetAllRoleList = '/system/getAllRoleList', // O
  RoleStatus = '/system/role/status',
  RoleList = '/system/role',
  DeptList = '/system/department',
  UserList = '/system/user',
  IsUserExist = '/system/user/exist',
  IsUserEmailExist = '/system/user/isUserEmailExist',
  ChangePassword = '/system/user/changePassword',
}

// =====/elu-api=====
export const GetDictionaryItems = (data: GetDictionaryModel) =>
  defHttp.post(
    {
      url: `/parameter${API_CONFIG.VERSION}${Api.GetDictionary}`,
      data,
      headers: apiTransDataForHeader(),
    },
    {
      apiUrl: '/elu-api',
    },
  );

export const getBillUserInfo = (data: any) =>
  defHttp.post(
    {
      url: `${API_CONFIG.VERSION}${Api.GetBillUserInfo}`,
      data,
      headers: apiTransDataForHeader(),
    },
    {
      apiUrl: '/elu-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
export const GetParameterStoreFromAWS = (data: GetParameterStoreFromAWSModel) =>
  defHttp.post<GetParameterStoreBackAWSModel[]>(
    {
      url: `/aws${API_CONFIG.VERSION}${Api.GetParameterStoreFromAWS}`,
      data,
      headers: apiTransDataForHeader(),
    },
    {
      apiUrl: '/elu-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );

export const GetBillCodeValue = (data: GetBillCodeValueModel) =>
  defHttp.post<GetBillCodeValueBackModel[]>(
    {
      url: `/parameter${API_CONFIG.VERSION}${Api.GetBillCodeValue}`,
      data,
      headers: apiTransDataForHeader(),
    },
    {
      apiUrl: '/elu-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );

export const GetS3TargetUrl = (body: any) =>
  defHttp.post(
    {
      url: `/aws${API_CONFIG.VERSION}${Api.GetS3TargetUrlValue}`,
      data: body,
      headers: apiTransDataForHeader(),
      // responseType: 'arraybuffer',
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);

          if (resObj.status === 1000 || resObj.status === 1001) {
            return {
              ...resObj,
              results: [resObj.results],
              msg: 'Success',
            };
          } else {
            return {
              ...resObj,
              results: [],
              msg: 'No data !!',
            };
          }
        },
      ],
    },
    {
      apiUrl: '/elu-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );

// =====/permission-api=====
export const GetUserPermissionRoleList = (body: any) =>
  defHttp.get(
    {
      url: `/api${API_CONFIG.VERSION}${Api.GetUserPermissionRoleListValue}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          // Do whatever you want to transform the data
          if (data.length) {
            return {
              trace_id: '',
              total_pages: 0,
              current_page: 0,
              results: [JSON.parse(data)],
              status: 1000,
              msg: 'success',
              requested_time: '',
              responsed_time: '',
            };
          } else {
            return {
              trace_id: '',
              total_pages: 0,
              current_page: 0,
              results: [],
              status: 9999,
              msg: data,
              requested_time: '',
              responsed_time: '',
            };
          }
        },
      ],
    },
    {
      apiUrl: '/permission-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );

export const GetUserPermissionGetRoleScope = (body: any) =>
  defHttp.post(
    {
      url: `/api${API_CONFIG.VERSION}${Api.GetUserPermissionGetRoleScopeValue}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          // Do whatever you want to transform the data
          if (data.length) {
            return {
              trace_id: '',
              total_pages: 0,
              current_page: 0,
              results: [JSON.parse(data)],
              status: 1000,
              msg: 'success',
              requested_time: '',
              responsed_time: '',
            };
          } else {
            return {
              trace_id: '',
              total_pages: 0,
              current_page: 0,
              results: [],
              status: 9999,
              msg: data,
              requested_time: '',
              responsed_time: '',
            };
          }
        },
      ],
    },
    {
      apiUrl: '/permission-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );

export const GetUserPermission = (body: any) =>
  defHttp.post(
    {
      url: `/api${API_CONFIG.VERSION}${Api.GetUserPermissionValue}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          // Do whatever you want to transform the data
          if (data.length) {
            return {
              trace_id: '',
              total_pages: 0,
              current_page: 0,
              results: [JSON.parse(data)],
              status: 1000,
              msg: 'success',
              requested_time: '',
              responsed_time: '',
            };
          } else {
            return {
              trace_id: '',
              total_pages: 0,
              current_page: 0,
              results: [],
              status: 9999,
              msg: data,
              requested_time: '',
              responsed_time: '',
            };
          }
        },
      ],
    },
    {
      apiUrl: '/permission-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );

// =====/sys-api=====

/**
 * @description: Role
 */
// API for account use
export const getAllRoleList = (params: RolePageParams) => {
  return defHttp.get<RolePageListGetResultModel>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.RoleList}`,
      data: {},
      params: {
        roleName: params.roleName,
        status: params.status,
        currentPage: null,
        pageSize: null,
      },
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('========role resObj from API=========:', resObj);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/sys-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
};

/**
 * @description: table Role list
 */
export const getRoleListByPage = (params: RolePageParams) => {
  return defHttp.get<RolePageListGetResultModel>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.RoleList}`,
      data: {},
      params: {
        roleName: params.roleName || null,
        status: params.status,
        currentPage: params.currentPage || 1,
        pageSize: params.pageSize || 10,
        sortBy: params.sortBy || 'ace',
      },
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/sys-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
};

export const setRoleStatus = (id: string, body: any) => {
  return defHttp.patch<RolePageListGetResultModel>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.RoleStatus}/${id}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/sys-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
};

export const removeRoleItem = (body: any) =>
  defHttp.delete<RolePageListGetResultModel>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.RoleList}/${body.id}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/sys-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
export const updateRoleItem = (body: any) =>
  defHttp.patch<RolePageListGetResultModel>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.RoleList}/${body.id}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/sys-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );

export const createRoleItem = (body: any) => {
  return defHttp.post<RolePageListGetResultModel>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.RoleList}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/sys-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
};

/**
 * @description: Department
 */
export const getDeptList = (params: DeptPageParams) => {
  return defHttp.get<DeptPageListGetResultModel>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.DeptList}`,
      data: {},
      params: {
        deptName: params.deptName,
        status: params.status,
        currentPage: params.currentPage,
        pageSize: params.pageSize,
      },
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/sys-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
};

export const createDeptItem = (body: any) => {
  return defHttp.post<DeptItem>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.DeptList}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/sys-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
};

export const updateDeptItem = (body: any) =>
  defHttp.patch<DeptItem>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.DeptList}/${body.id}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/sys-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );

export const removeDeptItem = (body: any) =>
  defHttp.delete<DeptItem>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.DeptList}/${body.id}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/sys-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );

/**
 * @description: User
 */
// check user if exist
export const isUserEmailExist = (params: any) => {
  return defHttp.get<UserItem>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.IsUserEmailExist}`,
      data: {},
      params: params,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('========isUserExist=========:', resObj);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/sys-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
};

export const isUserExist = (params: any) => {
  return defHttp.get<UserItem>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.IsUserExist}`,
      data: {},
      params: params,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('========isUserExist=========:', resObj);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/sys-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
};

export const getUserList = (params: UserPageParams) => {
  return defHttp.get<UserPageListGetResultModel>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.UserList}`,
      data: {},
      params: {
        displayName: params.displayName || null,
        status: params.status,
        currentPage: params.currentPage || 1,
        pageSize: params.pageSize || 10,
        sortBy: params.sortBy || 'ace',
      },
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('========user=========:', resObj);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/sys-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
};

export const changePassword = (body: any) => {
  const header = apiTransDataForHeader();
  const userId = ls.get('TEMP_USER_INFO_KEY__').id;

  header['User-Id'] = userId; // 5519695a-5397-475a-9925-da817107bcfd
  return defHttp.patch<UserItem>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.ChangePassword}/${userId}`,
      data: body,
      headers: header,
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('change password:', resObj);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/sys-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
};

export const removeUserItem = (body: any) =>
  defHttp.delete<UserItem>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.UserList}/${body.id}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/sys-api',
    },
  );
export const createUserItem = (body: any) => {
  return defHttp.post<UserItem>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.UserList}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          return resObj;
        },
      ],
    },
    {
      apiUrl: '/sys-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
};

export const updateUserItem = (body: any) =>
  defHttp.patch<UserItem>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.UserList}/${body.id}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);

          return resObj;
        },
      ],
    },
    {
      apiUrl: '/sys-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
