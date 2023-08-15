import { defHttp } from '/@/utils/http/axios';
// import { GetUserInfoModel } from './model/userModel';

// import { ErrorMessageMode } from '/#/axios';
import { ErrorMessageMode } from '/#/axios';
import { apiTransDataForHeader } from '/@/utils/tools';
enum Api {
  Login = '/auth/login',
  Logout = '/auth/logout',
  // GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

const version = '/v1.0';

/**
 * @description: user login api
 */
export const loginApi = (body: any, mode: ErrorMessageMode = 'modal') =>
  defHttp.post(
    {
      url: '/api' + version + Api.Login,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('api login:', resObj);

          // Do whatever you want to transform the data
          // if (resObj.type === 'success') {
          return {
            ...resObj,
            total_pages: 0,
            current_page: 0,
          };
          // } else {
          //   return {
          //     ...resObj,
          //     results: resObj.results !== '' ? resObj.results : null,
          //     total_pages: 0,
          //     current_page: 0,
          //     status: 1000,
          //   };
          // }
        },
      ],
    },
    {
      errorMessageMode: mode,
      apiUrl: '/sys-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );

/**
 * @description: user logout api
 */
export const logoutApi = () =>
  defHttp.get(
    {
      url: '/api' + version + Api.Logout,
      // data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          console.log('=========logout======');
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
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );

/**
 * @description: getUserInfo
 */
// export function getUserInfo() {
//   return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
// }

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
