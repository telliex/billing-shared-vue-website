import { defHttp } from '/@/utils/http/axios';
// import { GetUserInfoModel } from './model/userModel';

import { API_CONFIG } from '/@/settings/apiSetting';

// import { ErrorMessageMode } from '/#/axios';
import { ErrorMessageMode } from '/#/axios';
import { apiTransDataForHeader, correctReturn, errorReturn } from '/@/utils/tools';
import { isArray } from 'xe-utils';

import { createLocalStorage } from '/@/utils/cache';
const ls = createLocalStorage();

enum Api {
  Login = '/auth/login',
  LoginTransition = '/system/user/mgt',
  Logout = '/auth/logout',
  JWTLogin = '/jwt/login',
  JWTLogout = '/jwt/logout',
  JWTRefresh = '/jwt/refresh-token',
  finalActiveTimeURL = '/auth/userFinalActiveTime',
  // GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

interface LoginApiObject {
  username: string;
  password: string;
}

interface JWTLoginApiObject {
  email: string;
}

/**
 * @description: Get JWT token
 */
export const JWTLoginApi = (body: JWTLoginApiObject, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/api${API_CONFIG.VERSION}${Api.JWTLogin}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data, headers = {}) {
          const resObj = JSON.parse(data);
          resObj.results[0].apiToken = headers['x-access-token'];
          resObj.results[0].apiTokenRefresh = headers['x-refresh-token'];
          resObj.results[0].time = new Date().getTime();
          return resObj;
        },
      ],
    },

    {
      errorMessageMode: mode,
      apiUrl: '/jwt-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
};

/**
 * @description: Get JWT token
 */
export const JWTRefreshApi = () => {
  return defHttp.get(
    {
      url: `/api${API_CONFIG.VERSION}${Api.JWTRefresh}`,
      // data: body,
      headers: {
        ...apiTransDataForHeader(),
        'X-Refresh-Token': ls.get('USER_TOKEN_OBJECT_KEY__').apiTokenRefresh,
      },
      transformResponse: [
        function (data, headers = {}) {
          const resObj = JSON.parse(data);
          console.log('jwt refresh:', resObj);
          resObj.results[0].apiToken = headers['x-access-token'];
          resObj.results[0].apiTokenRefresh = ls.get('USER_TOKEN_OBJECT_KEY__').apiTokenRefresh;
          resObj.results[0].time = new Date().getTime();
          return resObj;
        },
      ],
    },

    {
      apiUrl: '/jwt-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
};

/**
 * @description: Get JWT token
 */
export const JWTlogoutApi = (token = '') => {
  const headersObj = token
    ? { ...apiTransDataForHeader(), 'X-Access-Token': `${token}` }
    : { ...apiTransDataForHeader() };

  return defHttp.get(
    {
      url: `/api${API_CONFIG.VERSION}${Api.JWTLogout}`,
      // data: body,
      headers: headersObj,
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('jwt logout:', resObj);

          return resObj;
        },
      ],
    },

    {
      apiUrl: '/jwt-api',
      retryRequest: {
        isOpenRetry: false,
        count: 1,
        waitTime: 3000,
      },
    },
  );
};

/**
 * @description: user login api
 */
export const loginApi = (body: LoginApiObject, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post(
    {
      url: `/api${API_CONFIG.VERSION}${Api.Login}`,
      data: body,
      headers: apiTransDataForHeader(),
      // headers: {
      //   'Content-Type': 'application/json',
      //   'User-Id': '5519695a-5397-475a-9925-da817107bcfd',
      //   'Time-Zone': 'UTC+0',
      //   Authorization:
      //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlY3YtYmlsbGluZyIsInN1YiI6InRlbGxpZXguY2hpdUBlY2xvdWR2YWxsZXkuY29tIiwiYXVkIjoiRUNWIEJpbGxpbmcgTW9kdWxlIiwiZXhwIjoxNzA3MjM2NTE0LCJpYXQiOjE3MDcyMzQ3MTQsImp0aSI6Ijg3NmUyZWZhLTgzODItNDczYi05ZGNiLTI1MTI4MjI2NzRjOCIsIm91dCI6IjMyZjk5OWEyYTM2ZTRmNTU5Y2YxYTgyZjMyN2RmZjc5IiwibmJmIjoxNzA3MjM0NzE0fQ.-5KLaDu1og-qsyncaX7LVzEb-gZdgHBGp_U-Dd7oS5I',
      //   'Trace-Id': '98c701ce-584d-4c20-9a61-a24a270c5f6c',
      //   'X-Api-Key': '484CD16940B64F878DC9CCE2E79EA08E',
      // },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('api login:', resObj);
          return resObj;
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
};

export const loginApiTransition = (mgtId) => {
  const myToken = ls.get('USER_TOKEN_TEMP_KEY__').apiToken;
  return defHttp.get(
    {
      url: `/api${API_CONFIG.VERSION}${Api.LoginTransition}/${mgtId}`,
      headers: {
        ...apiTransDataForHeader(),
        Authorization: `Bearer ${myToken}`,
      },

      // headers: {
      //   'Content-Type': 'application/json',
      //   'User-Id': '5519695a-5397-475a-9925-da817107bcfd',
      //   'Time-Zone': 'UTC+0',
      //   Authorization:
      //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJlY3YtYmlsbGluZyIsInN1YiI6InRlbGxpZXguY2hpdUBlY2xvdWR2YWxsZXkuY29tIiwiYXVkIjoiRUNWIEJpbGxpbmcgTW9kdWxlIiwiZXhwIjoxNzA3MjM2NTE0LCJpYXQiOjE3MDcyMzQ3MTQsImp0aSI6Ijg3NmUyZWZhLTgzODItNDczYi05ZGNiLTI1MTI4MjI2NzRjOCIsIm91dCI6IjMyZjk5OWEyYTM2ZTRmNTU5Y2YxYTgyZjMyN2RmZjc5IiwibmJmIjoxNzA3MjM0NzE0fQ.-5KLaDu1og-qsyncaX7LVzEb-gZdgHBGp_U-Dd7oS5I',
      //   'Trace-Id': '98c701ce-584d-4c20-9a61-a24a270c5f6c',
      //   'X-Api-Key': '484CD16940B64F878DC9CCE2E79EA08E',
      // },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('api login transition========:', resObj);
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
 * @description: user logout api
 */
export const logoutApi = () =>
  defHttp.get(
    {
      url: `/api${API_CONFIG.VERSION}${Api.Logout}`,
      // data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          console.log('=========logout======');
          const resObj = JSON.parse(data);
          // Do whatever you want to transform the data
          // if (resObj.type === 'success') {
          //   return {
          //     ...resObj,
          //     total_pages: 0,
          //     current_page: 0,
          //   };
          // } else {
          //   return {
          //     ...resObj,
          //     results: resObj.results !== '' ? resObj.results : null,
          //     total_pages: 0,
          //     current_page: 0,
          //     status: 1000,
          //   };
          // }
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
 * @description: getUserInfo
 */
// export function getUserInfo() {
//   return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
// }

export function getPermCode() {
  return defHttp.get({
    url: `${Api.GetPermCode}`,
    headers: apiTransDataForHeader(),
    transformResponse: [
      function (data) {
        const resObj = JSON.parse(data);

        // Do whatever you want to transform the data
        // if (resObj.type === 'success') {
        return resObj;
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
  });
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

/**
 * @description: get user final active time
 */
// export const getFinalActiveTime = () =>
//   defHttp.get(
//     {
//       url: `/api${API_CONFIG.VERSION}${Api.finalActiveTimeURL}`,
//       // data: body,
//       headers: apiTransDataForHeader(),
//       transformResponse: [
//         function (data) {
//           const resObj = JSON.parse(data);
//           // Do whatever you want to transform the data
//           if (isArray(resObj)) {
//             return correctReturn(resObj);
//           } else {
//             return errorReturn(resObj);
//           }
//         },
//       ],
//     },
//     {
//       apiUrl: '/sys-api',
//       retryRequest: {
//         isOpenRetry: false,
//         count: 1,
//         waitTime: 3000,
//       },
//     },
//   );
/**
 * @description: write user final react time
 */
// export const writeFinalActiveTime = () =>
//   defHttp.post(
//     {
//       url: `/api${API_CONFIG.VERSION}${Api.finalActiveTimeURL}`,
//       // data: body,
//       headers: apiTransDataForHeader(),
//       transformResponse: [
//         function (data) {
//           const resObj = JSON.parse(data);
//           // Do whatever you want to transform the data
//           if (isArray(resObj)) {
//             return correctReturn(resObj);
//           } else {
//             return errorReturn(resObj);
//           }
//         },
//       ],
//     },
//     {
//       apiUrl: '/sys-api',
//       retryRequest: {
//         isOpenRetry: false,
//         count: 1,
//         waitTime: 3000,
//       },
//     },
//   );
