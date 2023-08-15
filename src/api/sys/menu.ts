import { defHttp } from '/@/utils/http/axios';
import {
  NavParams,
  NavListResultModel,
  getNavListResultModel,
  getButtonListResultModel,
  ButtonItem,
} from './model/menuModel';

import {
  buildNestedStructure,
  buildMenuNestedStructure,
  apiTransDataForHeader,
  correntReturn,
  errorReturn,
} from '/@/utils/tools';
import { isArray } from 'xe-utils';

enum Api {
  GetDynamicNavList = '/system/menu/nav',
  NavTreeList = '/system/menu/tree',
  NavList = '/system/menu',
  ButtonsList = '/system/menu-buttons',
}

interface FilterItems {
  menuName: string | null;
  alias: string | null;
  status: number | null;
}

interface FilterButtonItems {
  belongMenuId: string | null;
  status: number | null;
}

const version = '/v1.0';

const processItems = (data: any[]) => {
  data.forEach((item) => {
    // Check if isExt is 0 and children is an empty array

    if (
      item.type === 'catalog' &&
      item.isExt === 0 &&
      (!item.children || item.children.length === 0)
    ) {
      item.meta.hideMenu = true;
    }

    // If item has children, recursively process them
    if (item.children && item.children.length > 0) {
      processItems(item.children);
    }
  });
};

/**
 * @description: Get user menu based on id
 */

export const getDynamicNavList = () =>
  defHttp.get(
    {
      url: '/api' + version + Api.GetDynamicNavList,
      data: {},
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('======dynamic menu resObj=======', resObj);

          if (isArray(resObj)) {
            processItems(resObj);
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

// system menu===========
export const getNavTreeListWithButton = (params: FilterItems) =>
  defHttp.get<getNavListResultModel>(
    {
      url: `/api${version}${Api.NavTreeList}`,
      data: {},
      params: {
        menuName: params.menuName,
        alias: params.alias,
        status: params.status,
      },
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);

          if (isArray(resObj)) {
            const expectedResult = buildNestedStructure(resObj);
            return correntReturn(expectedResult);
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

export const getNavTreeListOnlyCatalog = (params: FilterItems) =>
  defHttp.get<getNavListResultModel>(
    {
      url: `/api${version}${Api.NavTreeList}`,
      data: {},
      params: {
        menuName: params.menuName,
        alias: params.alias,
        status: params.status,
      },
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          let resObj = JSON.parse(data);
          if (isArray(resObj)) {
            resObj = resObj.filter((item: any) => item.type == 'catalog');

            const expectedResult = buildNestedStructure(resObj);
            return correntReturn(expectedResult);
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
 * @description: menu management list
 */

// main table
export const getNavList = (params: FilterItems) =>
  defHttp.get<getNavListResultModel>(
    {
      url: `/api${version}${Api.NavList}`,
      data: {},
      params: {
        menuName: params.menuName,
        alias: params.alias,
        status: params.status,
      },
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          let resObj = JSON.parse(data);
          if (isArray(resObj)) {
            if (typeof params.status === 'undefined') {
              resObj = buildMenuNestedStructure(resObj);
            }
            return correntReturn(resObj);
          } else {
            console.log('errorrrrrrrr');
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

export const getNavItem = (params: NavParams) => {
  console.log('params=========', params);
  return defHttp.get<NavListResultModel>(
    {
      url: `/api${version}${Api.NavList}/${params.id}`,
      data: params,
      headers: apiTransDataForHeader(),
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

export const removeNavItem = (params: any) =>
  defHttp.delete<NavListResultModel>(
    {
      url: `/api${version}${Api.NavList}/${params.id}`,
      data: params,
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

export const updateNavItem = (params: any) =>
  defHttp.patch<NavListResultModel>(
    {
      url: `/api${version}${Api.NavList}/${params.id}`,
      data: params,
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

export const createNavItem = (body: any) => {
  return defHttp.post<NavListResultModel>(
    {
      url: `/api${version}${Api.NavList}`,
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

export const getButtonList = (params: FilterButtonItems) =>
  defHttp.get<getButtonListResultModel>(
    {
      url: `/api${version}${Api.ButtonsList}`,
      data: {},
      params: {
        belongMenuId: params.belongMenuId,
        status: params.status,
      },
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

export const updateButtonItem = (params: any) =>
  defHttp.patch<ButtonItem>(
    {
      url: `/api${version}${Api.ButtonsList}/${params.id}`,
      data: params,
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

export const createButtonItem = (body: any) => {
  return defHttp.post<ButtonItem>(
    {
      url: `/api${version}${Api.ButtonsList}`,
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

export const removeButtonItem = (params: any) =>
  defHttp.delete<ButtonItem>(
    {
      url: `/api${version}${Api.ButtonsList}/${params.id}`,
      data: params,
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
