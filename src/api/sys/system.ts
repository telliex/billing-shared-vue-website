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
  RolePageListGetResultModel,
  RoleListGetResultModel,
  RolePageParams,
  RoleParams,
} from './model/systemModel';

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
  RolePageList = '/system/role',
  GetAllRoleList = '/system/getAllRoleList',
  SetRoleStatus = '/system/role/status',
  RoleList = '/system/menu',
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
    {
      url: '/aws' + version + Api.GetS3TargetUrlValue,
      data: params,
      transformResponse: [
        function (data) {
          console.log('9999999nodata999999');
          console.log(data);
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
              msg: 'No data resource on S3!!',
              requested_time: '',
              responsed_time: '',
            };
          }
        },
      ],
    },
    {
      apiUrl: '/elu-api',
    },
  );

export const GetUserPermissionRoleList = (params: any) =>
  defHttp.get(
    {
      url: '/api' + version + Api.GetUserPermissionRoleListValue,
      data: params,
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
    },
  );

export const GetUserPermissionGetRoleScope = (params: any) =>
  defHttp.post(
    {
      url: '/api' + version + Api.GetUserPermissionGetRoleScopeValue,
      data: params,
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
    },
  );

export const GetUserPermission = (params: any) =>
  defHttp.post(
    {
      url: '/api' + version + Api.GetUserPermissionValue,
      data: params,
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

// Role
export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const getRoleListByPage = (params: RolePageParams) => {
  console.log('jjjjjjjjjj');
  console.log(params);
  return defHttp.get<RolePageListGetResultModel>(
    {
      url: `/api${version}${Api.RolePageList}`,
      data: {},
      params: {
        roleName: params.roleName,
        status: params.status,
      },
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('return role items', resObj);
          if (resObj.length) {
            return {
              trace_id: '',
              total_pages: 1,
              current_page: 1,
              results: resObj,
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
      apiUrl: '/sys-api',
    },
  );
};

export const setRoleStatus = (id: string, params: any) => {
  return defHttp.patch<RolePageListGetResultModel>(
    {
      url: `/api${version}${Api.SetRoleStatus}/${id}`,
      data: params,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          if (resObj) {
            return {
              trace_id: '',
              total_pages: 1,
              current_page: 1,
              results: [],
              status: 1000,
              msg: 'success',
              requested_time: '',
              responsed_time: '',
            };
          }
        },
      ],
    },
    {
      apiUrl: '/sys-api',
    },
  );
};

export const removeRoleItem = (params: any) =>
  defHttp.delete<RolePageListGetResultModel>(
    {
      url: `/api${version}${Api.RolePageList}/${params.id}`,
      data: params,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          if (resObj) {
            return {
              trace_id: '',
              total_pages: 0,
              current_page: 0,
              results: [resObj],
              status: 1000,
              msg: 'success',
              requested_time: '',
              responsed_time: '',
            };
          }
        },
      ],
    },
    {
      apiUrl: '/sys-api',
    },
  );
export const updateRoleItem = (params: any) =>
  defHttp.patch<RolePageListGetResultModel>(
    {
      url: `/api${version}${Api.RoleList}/${params.id}`,
      data: params,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);

          if (resObj) {
            return {
              trace_id: '',
              total_pages: 0,
              current_page: 0,
              results: [resObj],
              status: 1000,
              msg: 'success',
              requested_time: '',
              responsed_time: '',
            };
          }
        },
      ],
    },
    {
      apiUrl: '/sys-api',
    },
  );

export const createRoleItem = (body: any) => {
  return defHttp.post<RolePageListGetResultModel>(
    {
      url: `/api${version}${Api.RoleList}`,
      data: body,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);

          if (resObj) {
            return {
              trace_id: '',
              total_pages: 0,
              current_page: 0,
              results: [resObj],
              status: 1000,
              msg: 'success',
              requested_time: '',
              responsed_time: '',
            };
          }
        },
      ],
    },
    {
      apiUrl: '/sys-api',
    },
  );
};
