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
  DeptPageParams,
  DeptItem,
  DeptListModel,
  UserPageParams,
  UserItem,
  UserListModel,
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
  GetAllRoleList = '/system/getAllRoleList', // O
  RoleStatus = '/system/role/status',
  RoleList = '/system/role',
  DeptList = '/system/department',
  UserList = '/system/user',
  IsUserExist = '/system/user/exist',
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
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
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
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
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
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
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
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
      },
    },
    {
      apiUrl: '/elu-api',
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
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
      },
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
          console.log('return role11111111 items', resObj);
          if (resObj.length >= 0) {
            return {
              traceId: '',
              totalPages: 1,
              currentPage: 1,
              results: resObj,
              status: 1000,
              msg: 'success',
              requestedTime: '',
              responsedTime: '',
            };
          } else {
            return {
              traceId: '',
              totalPages: 0,
              currentPage: 0,
              results: [],
              status: 9999,
              msg: data,
              requestedTime: '',
              responsedTime: '',
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

// Role list
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
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
      },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          // let role permission string to array
          resObj.forEach((item) => {
            item.menuPermissionArray = item.menuPermission ? item.menuPermission.split(',') : [];
          });
          console.log('return role items', resObj);
          if (resObj.length >= 0) {
            return {
              traceId: '',
              totalPages: 1,
              currentPage: 1,
              results: resObj,
              status: 1000,
              msg: 'success',
              requestedTime: '',
              responsedTime: '',
            };
          } else {
            return {
              traceId: '',
              totalPages: 0,
              currentPage: 0,
              results: [],
              status: 9999,
              msg: data,
              requestedTime: '',
              responsedTime: '',
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

export const setRoleStatus = (id: string, body: any) => {
  return defHttp.patch<RolePageListGetResultModel>(
    {
      url: `/api${version}${Api.RoleStatus}/${id}`,
      data: body,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
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

export const removeRoleItem = (body: any) =>
  defHttp.delete<RolePageListGetResultModel>(
    {
      url: `/api${version}${Api.RoleList}/${body.id}`,
      data: body,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
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
export const updateRoleItem = (body: any) =>
  defHttp.patch<RolePageListGetResultModel>(
    {
      url: `/api${version}${Api.RoleList}/${body.id}`,
      data: body,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
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
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
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
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
        Authorization: userStore.getToken ? `Bearer ${userStore.getToken}` : '',
      },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          // let role permission string to array
          console.log('return dept items', resObj);
          if (resObj.length >= 0) {
            return {
              traceId: '',
              totalPages: 1,
              currentPage: 1,
              results: resObj,
              status: 1000,
              msg: 'success',
              requestedTime: '',
              responsedTime: '',
            };
          } else {
            return {
              traceId: '',
              totalPages: 0,
              currentPage: 0,
              results: [],
              status: 9999,
              msg: data,
              requestedTime: '',
              responsedTime: '',
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

export const createDeptItem = (body: any) => {
  return defHttp.post<DeptItem>(
    {
      url: `/api${version}${Api.DeptList}`,
      data: body,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
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

export const updateDeptItem = (body: any) =>
  defHttp.patch<DeptItem>(
    {
      url: `/api${version}${Api.DeptList}/${body.id}`,
      data: body,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
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

export const removeDeptItem = (body: any) =>
  defHttp.delete<DeptItem>(
    {
      url: `/api${version}${Api.DeptList}/${body.id}`,
      data: body,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
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
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
      },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('data:77777', resObj);
          if (!resObj) {
            return {
              trace_id: '',
              total_pages: 0,
              current_page: 0,
              results: [],
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
              results: null,
              status: 1000,
              msg: '帳號已存在',
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
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
      },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          // let role permission string to array
          resObj.forEach(
            (item) => (item.roles = item.rolesString ? item.rolesString.split(',') : []),
          );

          console.log('return dept items', resObj);
          if (resObj.length >= 0) {
            return {
              traceId: '',
              totalPages: 1,
              currentPage: 1,
              results: resObj,
              status: 1000,
              msg: 'success',
              requestedTime: '',
              responsedTime: '',
            };
          } else {
            return {
              traceId: '',
              totalPages: 0,
              currentPage: 0,
              results: [],
              status: 9999,
              msg: data,
              requestedTime: '',
              responsedTime: '',
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

export const removeUserItem = (body: any) =>
  defHttp.delete<UserItem>(
    {
      url: `/api${version}${Api.UserList}/${body.id}`,
      data: body,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
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
export const createUserItem = (body: any) => {
  return defHttp.post<UserItem>(
    {
      url: `/api${version}${Api.UserList}`,
      data: body,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
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

export const updateUserItem = (body: any) =>
  defHttp.patch<UserItem>(
    {
      url: `/api${version}${Api.UserList}/${body.id}`,
      data: body,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
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
