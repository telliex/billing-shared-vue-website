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
  DeptListModel,
  UserPageParams,
  UserItem,
  UserListModel,
} from './model/systemModel';

import { apiTransDataForHeader, correntReturn, errorReturn } from '/@/utils/tools';
import { isArray } from 'xe-utils';
import { Guid } from 'js-guid';

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
}

const version = '/v1.0';

export const GetDictionaryItems = (data: GetDictionaryModel) =>
  defHttp.post(
    {
      url: '/parameter' + version + Api.GetDictionary,
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
      url: version + Api.GetBillUserInfo,
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
      url: '/aws' + version + Api.GetParameterStoreFromAWS,
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
      url: '/parameter' + version + Api.GetBillCodeValue,
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
      url: '/aws' + version + Api.GetS3TargetUrlValue,
      data: body,
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);

          if (resObj.status === 1000 || resObj.status === 1001) {
            return {
              trace_id: '',
              total_pages: 0,
              current_page: 0,
              results: [resObj.results],
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
              msg: 'No data !!',
              requested_time: '',
              responsed_time: '',
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

export const GetUserPermissionRoleList = (body: any) =>
  defHttp.get(
    {
      url: '/api' + version + Api.GetUserPermissionRoleListValue,
      data: body,
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
      url: '/api' + version + Api.GetUserPermissionGetRoleScopeValue,
      data: body,
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
      url: '/api' + version + Api.GetUserPermissionValue,
      data: body,
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

// export const GetPowerBIFilterValue = (params: any) =>
//   defHttp.post(
//     {
//       url: Api.GetPowerBIFilterValueValue,
//       data: params,
//       transformResponse: [
//         function (data) {
//           // Do whatever you want to transform the data
//           console.log('------------');
//           console.log(data);
//           if (data) {
//             return {
//               trace_id: '',
//               total_pages: 0,
//               current_page: 0,
//               results: [JSON.parse(data)],
//               status: 1000,
//               msg: 'success',
//               requested_time: '',
//               responsed_time: '',
//             };
//           } else {
//             return {
//               trace_id: '',
//               total_pages: 0,
//               current_page: 0,
//               results: [],
//               status: 9999,
//               msg: data,
//               requested_time: '',
//               responsed_time: '',
//             };
//           }
//         },
//       ],
//     },
//     {
//       apiUrl: '/power-bi',
//     },
//   );

/**
 * @description: Role
 */
// API for account use
export const getAllRoleList = (params: RolePageParams) => {
  return defHttp.get<RolePageListGetResultModel>(
    {
      url: `/api${version}${Api.RoleList}`,
      data: {},
      params: {
        roleName: params.roleName,
        status: params.status,
        page: params.page || 1,
        pageSize: params.pageSize || 10,
      },
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          // let role permission string to array
          // resObj.forEach((item) => {
          //   item.roleValueOject = {
          //     value: item.id,
          //     label: item.roleName,
          //   };
          // });
          if (isArray(resObj)) {
            return correntReturn(resObj);
          } else {
            return errorReturn(resObj);
          }
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
      url: `/api${version}${Api.RoleList}`,
      data: {},
      params: {
        roleName: params.roleName,
        status: params.status,
        page: params.page || 1,
        pageSize: params.pageSize || 10,
      },
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          if (isArray(resObj)) {
            resObj.forEach((item) => {
              item.menuPermissionArray = item.menuPermission ? item.menuPermission.split(',') : [];
            });

            return correntReturn(resObj);
          } else {
            return errorReturn(resObj);
          }
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
      url: `/api${version}${Api.RoleStatus}/${id}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          if (isArray(resObj)) {
            return correntReturn(resObj);
          } else {
            return errorReturn(resObj);
          }
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
      url: `/api${version}${Api.RoleList}/${body.id}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          if (isArray(resObj)) {
            return correntReturn(resObj);
          } else {
            return errorReturn(resObj);
          }
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
      url: `/api${version}${Api.RoleList}/${body.id}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);

          if (isArray(resObj)) {
            return correntReturn(resObj);
          } else {
            return errorReturn(resObj);
          }
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
      url: `/api${version}${Api.RoleList}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);

          if (isArray(resObj)) {
            return correntReturn(resObj);
          } else {
            return errorReturn(resObj);
          }
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
  return defHttp.get<DeptListModel>(
    {
      url: `/api${version}${Api.DeptList}`,
      data: {},
      params: {
        deptName: params.deptName,
        status: params.status,
        page: params.page,
        pageSize: params.pageSize,
      },
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          // let role permission string to array
          if (isArray(resObj)) {
            return correntReturn(resObj);
          } else {
            return errorReturn(resObj);
          }
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
      url: `/api${version}${Api.DeptList}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);

          if (isArray(resObj)) {
            return correntReturn(resObj);
          } else {
            return errorReturn(resObj);
          }
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
      url: `/api${version}${Api.DeptList}/${body.id}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);

          if (isArray(resObj)) {
            return correntReturn(resObj);
          } else {
            return errorReturn(resObj);
          }
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
      url: `/api${version}${Api.DeptList}/${body.id}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          if (isArray(resObj)) {
            return correntReturn(resObj);
          } else {
            return errorReturn(resObj);
          }
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
export const isUserExist = (params: any) => {
  return defHttp.get<UserItem>(
    {
      url: `/api${version}${Api.IsUserExist}`,
      data: {},
      params: params,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('000000:', resObj);
          if (!resObj) {
            return {
              trace_id: Guid.newGuid().toString(),
              total_pages: 1,
              current_page: 1,
              results: [],
              status: 1000,
              msg: 'success',
              requested_time: '',
              responsed_time: new Date(),
            };
          } else {
            return {
              trace_id: Guid.newGuid().toString(),
              total_pages: 1,
              current_page: 1,
              results: null,
              status: 1000,
              msg: '帳號已存在',
              requested_time: '',
              responsed_time: new Date(),
            };
          }
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
  return defHttp.get<UserListModel>(
    {
      url: `/api${version}${Api.UserList}`,
      data: {},
      params: {
        userName: params.userName,
        status: params.status,
        dept: params.dept,
        page: params.page,
        pageSize: params.pageSize,
      },
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          // let role permission string to array

          if (isArray(resObj)) {
            resObj.forEach(
              (item) => (item.roles = item.rolesString ? item.rolesString.split(',') : []),
            );
            return correntReturn(resObj);
          } else {
            return errorReturn(resObj);
          }
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
      url: `/api${version}${Api.UserList}/${body.id}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          if (isArray(resObj)) {
            return correntReturn(resObj);
          } else {
            return errorReturn(resObj);
          }
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
      url: `/api${version}${Api.UserList}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);

          if (isArray(resObj)) {
            return correntReturn(resObj);
          } else {
            return errorReturn(resObj);
          }
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
      url: `/api${version}${Api.UserList}/${body.id}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);

          if (isArray(resObj)) {
            return correntReturn(resObj);
          } else {
            return errorReturn(resObj);
          }
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
