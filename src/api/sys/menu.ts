import { useUserStore } from '/@/store/modules/user';
import { router } from '/@/router';
import { defHttp } from '/@/utils/http/axios';
import {
  NavParams,
  NavListResultModel,
  getNavListResultModel,
  getButtonListResultModel,
  ButtonItem,
} from './model/menuModel';
import dayjs from 'dayjs';

import { buildNestedStructure, buildMenuNestedStructure } from '/@/utils/tools';

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

let who = 0;

const timeTemp = dayjs().utcOffset();
let timeZon = '';
if (timeTemp === 0) {
  timeZon = 'UTC+0';
} else if (timeTemp > 0) {
  timeZon = 'UTC+' + timeTemp / 60;
} else if (timeTemp < 0) {
  timeZon = 'UTC-' + timeTemp / 60;
}

// Fixed: Cannot access 'useUserStore' before initialization
router.beforeEach(async () => {
  if (useUserStore() === null) {
    who = useUserStore().getUserInfo?.userId as number;
  }
});

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
      headers: {
        'User-Id': useUserStore().getUserInfo?.userId,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
      },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('======dynamic menu resObj=======', resObj);

          processItems(resObj);
          if (resObj.length >= 0) {
            return {
              trace_id: '',
              total_pages: 0,
              current_page: 0,
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
              msg: 'No data resource on Nav List!!',
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
      headers: {
        'User-Id': useUserStore().getUserInfo?.userId,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
      },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          const expectedResult = buildNestedStructure(resObj);
          if (resObj.length >= 0) {
            return {
              trace_id: '',
              total_pages: 0,
              current_page: 0,
              results: expectedResult,
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
      headers: {
        'User-Id': useUserStore().getUserInfo?.userId,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
      },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data).filter((item: any) => item.type == 'catalog');
          console.log('resObj--------', resObj);
          const expectedResult = buildNestedStructure(resObj);
          if (resObj.length >= 0) {
            return {
              trace_id: '',
              total_pages: 0,
              current_page: 0,
              results: expectedResult,
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
      headers: {
        'User-Id': useUserStore().getUserInfo?.userId,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
      },
      transformResponse: [
        function (data) {
          let resObj = JSON.parse(data);
          if (typeof params.status === 'undefined') {
            resObj = buildMenuNestedStructure(resObj);
          }

          if (resObj.length >= 0) {
            return {
              trace_id: '',
              total_pages: 0,
              current_page: 0,
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

export const getNavItem = (params: NavParams) => {
  console.log('params=========', params);
  return defHttp.get<NavListResultModel>(
    {
      url: `/api${version}${Api.NavList}/${params.id}`,
      data: params,
      headers: {
        'User-Id': useUserStore().getUserInfo?.userId,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
      },
    },
    {
      apiUrl: '/sys-api',
    },
  );
};

export const removeNavItem = (params: any) =>
  defHttp.delete<NavListResultModel>(
    {
      url: `/api${version}${Api.NavList}/${params.id}`,
      data: params,
      headers: {
        'User-Id': useUserStore().getUserInfo?.userId,
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

export const updateNavItem = (params: any) =>
  defHttp.patch<NavListResultModel>(
    {
      url: `/api${version}${Api.NavList}/${params.id}`,
      data: params,
      headers: {
        'User-Id': useUserStore().getUserInfo?.userId,
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

export const createNavItem = (body: any) => {
  return defHttp.post<NavListResultModel>(
    {
      url: `/api${version}${Api.NavList}`,
      data: body,
      headers: {
        'User-Id': useUserStore().getUserInfo?.userId,
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

export const getButtonList = (params: FilterButtonItems) =>
  defHttp.get<getButtonListResultModel>(
    {
      url: `/api${version}${Api.ButtonsList}`,
      data: {},
      params: {
        belongMenuId: params.belongMenuId,
        status: params.status,
      },
      headers: {
        'User-Id': useUserStore().getUserInfo?.userId,
        'Time-Zone': timeZon,
        Authorization: useUserStore().getToken ? `Bearer ${useUserStore().getToken}` : '',
      },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          if (resObj.length >= 0) {
            return {
              trace_id: '',
              total_pages: 0,
              current_page: 0,
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

export const updateButtonItem = (params: any) =>
  defHttp.patch<ButtonItem>(
    {
      url: `/api${version}${Api.ButtonsList}/${params.id}`,
      data: params,
      headers: {
        'User-Id': useUserStore().getUserInfo?.userId,
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

export const createButtonItem = (body: any) => {
  return defHttp.post<ButtonItem>(
    {
      url: `/api${version}${Api.ButtonsList}`,
      data: body,
      headers: {
        'User-Id': useUserStore().getUserInfo?.userId,
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

export const removeButtonItem = (params: any) =>
  defHttp.delete<ButtonItem>(
    {
      url: `/api${version}${Api.ButtonsList}/${params.id}`,
      data: params,
      headers: {
        'User-Id': useUserStore().getUserInfo?.userId,
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
