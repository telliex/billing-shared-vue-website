import {
  AccountParams,
  DeptListItem,
  MenuParams,
  NavParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  NavListResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
} from './model/systemModel';
import { useUserStore } from '/@/store/modules/user';
import { defHttp } from '/@/utils/http/axios';
import dayjs from 'dayjs';

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

enum Api {
  AccountList = '/system/getAccountList',
  IsAccountExist = '/system/accountExist',
  DeptList = '/system/getDeptList',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/system/getMenuList',
  NavList = '/system/menu',
  RolePageList = '/system/getRoleListByPage',
  GetAllRoleList = '/system/getAllRoleList',
}

interface FilterItems {
  menuName: string | null;
  status: number | null;
}

export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

// system menu===========
export const getNavList = (params: FilterItems) =>
  defHttp.get<NavListResultModel>(
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
          const resObj = JSON.parse(data);
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
          if (resObj.length) {
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
      apiUrl: '/sys',
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
      apiUrl: '/sys',
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
      apiUrl: '/sys',
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
      apiUrl: '/sys',
    },
  );

export const createNavItem = (body: any) => {
  console.log('000000000000000');
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
      apiUrl: '/sys',
    },
  );
};
export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });
