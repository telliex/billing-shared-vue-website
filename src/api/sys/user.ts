import { defHttp } from '/@/utils/http/axios';
// import { GetUserInfoModel } from './model/userModel';

import { API_CONFIG } from '/@/settings/apiSetting';

// import { ErrorMessageMode } from '/#/axios';
import { ErrorMessageMode } from '/#/axios';
import { apiTransDataForHeader } from '/@/utils/tools';

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

export function getPermCode() {
  return defHttp.get({
    url: `${Api.GetPermCode}`,
    headers: apiTransDataForHeader(),
    transformResponse: [
      function (data) {
        const resObj = JSON.parse(data);
        return resObj;
      },
    ],
  });
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
