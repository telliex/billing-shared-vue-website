import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';
// import { useUserStore } from '/@/store/modules/user';
import dayjs from 'dayjs';

const version = '/v1.0';
// const userStore = useUserStore();
// const who = userStore.getUserInfo?.userId;
const who = 144;
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
  GetMenuList = '/getMenuList',
  GetNavList = '/system/menu/nav',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};

export const getNavList = () =>
  defHttp.get(
    {
      url: '/api' + version + Api.GetNavList,
      data: {},
      headers: {
        'User-Id': who,
        'Time-Zone': timeZon,
      },
      transformResponse: [
        function (data) {
          const resObj = JSON.parse(data);
          console.log('======nav resObj=======', resObj);
          if (resObj.length) {
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
