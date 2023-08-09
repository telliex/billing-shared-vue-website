import { defHttp } from '/@/utils/http/axios';
import { GetUserInfoModel } from './model/userModel';

// import { ErrorMessageMode } from '/#/axios';
import { useUserStore } from '/@/store/modules/user';
import dayjs from 'dayjs';
import { router } from '/@/router';
import { ErrorMessageMode } from '/#/axios';
enum Api {
  Login = '/auth/login',
  Logout = '/auth/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}
let who = 0;
const version = '/v1.0';
// const userStore = useUserStore();

router.beforeEach(async () => {
  if (useUserStore() === null) {
    who = useUserStore().getUserInfo?.userId as number;
  }
});

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

export const loginApi = (body: any, mode: ErrorMessageMode = 'modal') =>
  defHttp.post(
    {
      url: '/api' + version + Api.Login,
      data: body,
      headers: {
        'User-Id': useUserStore().getUserInfo?.userId,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
      },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('data111111:', resObj);

          // Do whatever you want to transform the data
          if (resObj.type === 'success') {
            return {
              ...resObj,
              total_pages: 0,
              current_page: 0,
            };
          } else {
            return {
              ...resObj,
              results: resObj.results !== '' ? resObj.results : null,
              total_pages: 0,
              current_page: 0,
              status: 1000,
            };
          }
        },
      ],
    },
    {
      errorMessageMode: mode,
      apiUrl: '/sys-api',
    },
  );

export const logoutApi = () =>
  defHttp.get(
    {
      url: '/api' + version + Api.Logout,
      // data: body,
      headers: {
        'User-Id': useUserStore().getUserInfo?.userId,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
      },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          // Do whatever you want to transform the data
          if (resObj.type === 'success') {
            return {
              ...resObj,
              total_pages: 0,
              current_page: 0,
            };
          } else {
            return {
              ...resObj,
              results: resObj.results !== '' ? resObj.results : null,
              total_pages: 0,
              current_page: 0,
              status: 1000,
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
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

// export function doLogout() {
//   return defHttp.get({ url: Api.Logout });
// }

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
