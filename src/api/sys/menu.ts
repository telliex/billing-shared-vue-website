import { useUserStore } from '/@/store/modules/user';
import { router } from '/@/router';
import { defHttp } from '/@/utils/http/axios';
import { NavParams, NavListResultModel, getNavListResultModel } from './model/menuModel';
import dayjs from 'dayjs';

enum Api {
  GetDynamicNavList = '/system/menu/nav',
  NavList = '/system/menu',
}

interface FilterItems {
  menuName: string | null;
  alias: string | null;
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

/**
 * @description: Get user menu based on id
 */

export const getDynamicNavList = () =>
  defHttp.get(
    {
      url: '/api' + version + Api.GetDynamicNavList,
      data: {},
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('======nav resObj=======', resObj);
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
export const getNavTreeList = (params: FilterItems) =>
  defHttp.get<getNavListResultModel>(
    {
      url: `/api${version}${Api.NavList}`,
      data: {},
      params: {
        menuName: params.menuName,
        status: params.status,
      },
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
      transformResponse: [
        function (data) {
          let resObj = JSON.parse(data);
          resObj = resObj.filter((item) => item.type === 'catalog');
          console.log('return menu items', resObj);
          resObj.forEach((item) => {
            if (item.parentMenu == '' && item.type == 'catalog') {
              // menuTree.push(item);
            } else {
              resObj.forEach((subItem) => {
                if (item.parentMenu === subItem.id) {
                  if (subItem.children) {
                    subItem.children.push(item);
                  } else {
                    subItem.children = [item];
                  }
                }
              });
            }
          });
          console.log('resObj:', resObj);
          const menuTree = resObj.filter((item) => item.parentMenu == '' && item.type == 'catalog');
          console.log('menuTree:', menuTree);
          if (resObj.length >= 0) {
            return {
              trace_id: '',
              total_pages: 0,
              current_page: 0,
              results: menuTree,
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
        'User-Id': who,
        'Time-Zone': timeZon,
      },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('return menu items22222', resObj);
          const main = resObj.filter((item) => item.parentMenu == '' && item.type === 'catalog');
          const catalogs = resObj.filter((item) => item.type === 'catalog');
          const pages = resObj.filter((item) => item.type === 'page');
          const buttons = resObj.filter((item) => item.type === 'button');

          buttons.forEach((item) => {
            pages.forEach((pageItem) => {
              if (item.parentMenu === pageItem.id) {
                if (pageItem.children) {
                  pageItem.children.push(item);
                } else {
                  pageItem.children = [item];
                }
              }
            });
          });

          pages.forEach((item) => {
            catalogs.forEach((catalogItem) => {
              if (item.parentMenu === catalogItem.id) {
                if (catalogItem.children) {
                  catalogItem.children.push(item);
                } else {
                  catalogItem.children = [item];
                }
              }
            });
          });

          main.forEach((item) => {
            catalogs.forEach((catalogItem) => {
              if (item.id === catalogItem.parentMenu) {
                if (item.children) {
                  item.children.push(catalogItem);
                } else {
                  item.children = [catalogItem];
                }
              }
            });
          });

          // resObj.forEach((item) => {
          //   if (item.parentMenu == '' && item.type == 'catalog') {
          //     // menuTree.push(item);
          //   } else {
          //     resObj.forEach((subItem) => {
          //       if (item.parentMenu === subItem.id) {
          //         if (subItem.children) {
          //           subItem.children.push(item);
          //         } else {
          //           subItem.children = [item];
          //         }
          //       }
          //     });
          //   }
          // });
          // console.log('resObj:', resObj);
          // const menuTree = resObj.filter((item) => item.parentMenu == '' && item.type == 'catalog');
          // console.log('menuTree:', menuTree);
          if (resObj.length >= 0) {
            return {
              trace_id: '',
              total_pages: 0,
              current_page: 0,
              results: main,
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
        'User-Id': who,
        'Time-Zone': timeZon,
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

export const updateNavItem = (params: any) =>
  defHttp.patch<NavListResultModel>(
    {
      url: `/api${version}${Api.NavList}/${params.id}`,
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

export const createNavItem = (body: any) => {
  return defHttp.post<NavListResultModel>(
    {
      url: `/api${version}${Api.NavList}`,
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
