import { defHttp } from '/@/utils/http/axios';
import {
  NavParams,
  NavListResultModel,
  getNavListResultModel,
  getButtonListResultModel,
  ButtonItem,
} from './model/menuModel';

import { API_CONFIG } from '/@/settings/apiSetting';

import {
  buildNestedStructure,
  buildMenuNestedStructure,
  apiTransDataForHeader,
  correctReturn,
  errorReturn,
} from '/@/utils/tools';
import { isArray } from 'xe-utils';

enum Api {
  GetDynamicNavList = '/system/menu/dynamicNav',
  NavTreeList = '/system/menu/tree',
  MenuList = '/system/menu',
  ButtonsList = '/system/menu/buttons',
}

interface FilterItems {
  status: number | null;
}

interface FilterButtonItems {
  belongMenuId: string | null;
  status: number | null;
}

/**
 * 將提供的數據項處理為適合前端顯示的格式。
 * 如果項目是目錄類型且不是外部鏈接且沒有子項目，則將其隱藏。
 * 如果項目有子項目，則遞歸處理這些子項目。
 * @param data 需要處理的數據項數組。
 */
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
 * 獲取動態導航列表。
 * 從服務器請求導航數據，並進行處理以適應前端顯示。
 * @returns 處理後的導航數據。
 */
export const getDynamicNavList = () =>
  defHttp.get(
    {
      url: `/api${API_CONFIG.VERSION}${Api.GetDynamicNavList}`,
      data: {},
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('======dynamic menu resObj=======', resObj);

          // if (isArray(resObj)) {
          //   processItems(resObj);
          //   return correctReturn(resObj);
          // } else {
          //   return errorReturn(resObj);
          // }
          return resObj;
        },
      ],
    },
    // {
    //   apiUrl: '/sys-api',
    //   retryRequest: {
    //     isOpenRetry: false,
    //     count: 1,
    //     waitTime: 3000,
    //   },
    // },
  );

export const getNavWholeTreeNode = (params: FilterItems) =>
  defHttp.get<getNavListResultModel>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.NavTreeList}`,
      data: {},
      params: {
        menuName: params.menuName,
        alias: params.alias,
        status: params.status,
      },
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          // TODO remove the button node . Need to recover.
          const resObj = JSON.parse(data).filter((item: any) => item.type != 'button');
          if (isArray(resObj)) {
            const expectedResult = buildNestedStructure(resObj);
            return correctReturn(expectedResult);
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

export const getNavTreeNodeOnlyCatalog = (params: FilterItems) =>
  defHttp.get<getNavListResultModel>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.NavTreeList}`,
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
            return correctReturn(expectedResult);
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
  defHttp.get(
    {
      url: `/api${API_CONFIG.VERSION}${Api.MenuList}`,
      data: {},
      params: {
        status: params.status,
      },
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);

          console.log('menu data from API:', resObj);

          return resObj;
        },
      ],
    },
    // TODO: recover the area below.
    // {
    //   apiUrl: '/sys-api',
    //   retryRequest: {
    //     isOpenRetry: false,
    //     count: 1,
    //     waitTime: 3000,
    //   },
    // },
  );

export const getNavItem = (params: NavParams) => {
  console.log('params=========', params);
  return defHttp.get<NavListResultModel>(
    {
      url: `/api${API_CONFIG.VERSION}${Api.MenuList}/${params.id}`,
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
      url: `/api${API_CONFIG.VERSION}${Api.MenuList}/${params.id}`,
      data: params,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          if (isArray(resObj)) {
            return correctReturn(resObj);
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
      url: `/api${API_CONFIG.VERSION}${Api.MenuList}/${params.id}`,
      data: params,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);

          if (isArray(resObj)) {
            return correctReturn(resObj);
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
      url: `/api${API_CONFIG.VERSION}${Api.MenuList}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);

          if (isArray(resObj)) {
            return correctReturn(resObj);
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
      url: `/api${API_CONFIG.VERSION}${Api.ButtonsList}`,
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
            return correctReturn(resObj);
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
      url: `/api${API_CONFIG.VERSION}${Api.ButtonsList}/${params.id}`,
      data: params,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          if (isArray(resObj)) {
            return correctReturn(resObj);
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
      url: `/api${API_CONFIG.VERSION}${Api.ButtonsList}`,
      data: body,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);

          if (isArray(resObj)) {
            return correctReturn(resObj);
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
      url: `/api${API_CONFIG.VERSION}${Api.ButtonsList}/${params.id}`,
      data: params,
      headers: apiTransDataForHeader(),
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          if (isArray(resObj)) {
            return correctReturn(resObj);
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
