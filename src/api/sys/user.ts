import { defHttp } from '/@/utils/http/axios';
import { GetUserInfoModel } from './model/userModel';

// import { ErrorMessageMode } from '/#/axios';
import { useUserStore } from '/@/store/modules/user';
import dayjs from 'dayjs';
enum Api {
  Login = '/auth/login',
  Logout = '/auth/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
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

/**
 * @description: user login api
 */
// export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
//   return defHttp.post<LoginResultModel>(
//     {
//       url: Api.Login,
//       params,
//     },
//     {
//       errorMessageMode: mode,
//     },
//   );
// }

export const loginApi = (body: any) =>
  defHttp.post(
    {
      url: '/api' + version + Api.Login,
      data: body,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
        Authorization: userStore.getToken ? `Bearer ${userStore.getToken}` : '',
      },
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

export const logoutApi = (body: any) =>
  defHttp.get(
    {
      url: '/api' + version + Api.Logout,
      data: body,
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
        Authorization: userStore.getToken ? `Bearer ${userStore.getToken}` : '',
      },
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

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
