import { Guid } from 'js-guid';
import { useUserStore } from '/@/store/modules/user';
import dayjs from 'dayjs';
import moment from 'moment';
import projectSetting from '/@/settings/projectSetting';
export function buildNestedStructure(data: any[]) {
  const map: any = {}; // 用來快速查找 id 對應的物件
  const result: any[] = []; // 最終的結果

  // 將原始資料放入 map 中
  data.forEach((item) => {
    map[item.id] = item;
    item.children = []; // 初始化 children 屬性
  });

  // 將每個 item 放到對應的 parent 的 children 中
  data.forEach((item) => {
    if (item.parentMenu !== '') {
      const parent = map[item.parentMenu];
      if (parent) {
        parent.children.push(item);
      }
    } else {
      result.push(item); // 沒有 parentMenu 的 item 是根節點，放到最終結果中
    }
  });

  return result;
}

export function buildMenuNestedStructure(data: any[]) {
  const map: any = {}; // 用來快速查找 id 對應的物件
  const result: any[] = []; // 最終的結果

  // 將原始資料放入 map 中
  data.forEach((item) => {
    map[item.id] = item;
    item.children = undefined; // 初始化 children 屬性
  });

  // 將每個 item 放到對應的 parent 的 children 中
  data.forEach((item) => {
    if (item.parentMenu !== '') {
      const parent = map[item.parentMenu];
      if (parent) {
        if (parent.children) {
          parent.children.push(item);
        } else {
          parent.children = [item];
        }
      }
    } else {
      result.push(item); // 沒有 parentMenu 的 item 是根節點，放到最終結果中
    }
  });

  return result;
}

export function apiTransDataForHeader() {
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

  return {
    'User-Id': who,
    'Time-Zone': timeZon,
    Authorization: userStore.getToken ? `Bearer ${userStore.getToken}` : '',
  };
}

export function correctReturn(obj: any) {
  return {
    trace_id: Guid.newGuid().toString(),
    total_pages: 1,
    current_page: 1,
    results: obj,
    status: 1000,
    msg: 'success',
    requested_time: '',
    responsed_time: '',
  };
}

export function errorReturn(error: any) {
  return {
    trace_id: Guid.newGuid().toString(),
    total_pages: 0,
    current_page: 0,
    results: null,
    status: 9999,
    msg: error.message,
    requested_time: '',
    responsed_time: new Date(),
  };
}

export function checkLoginTimeout(user: any) {
  const { loginTimeout } = projectSetting;
  let compareTime = '2021-01-01 00:00:00';
  if (user.lastActiveTime) {
    compareTime = user.lastActiveTime;
  }
  const idleDuration = moment(moment.utc().format('YYYY-MM-DD HH:mm:ss')).diff(
    moment(compareTime),
    'minutes',
  );
  // If idle duration exceeds 3 hours, log the user out
  if (idleDuration >= loginTimeout) {
    return false;
    // Perform logout action, e.g., clear session
  } else {
    return true;
  }
}
