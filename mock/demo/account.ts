import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess, resultError } from '../_util';
import { ResultEnum } from '../../src/enums/httpEnum';

const userInfo = {
  name: 'billing',
  userid: '00000001',
  email: 'test@gmail.com',
  signature: '海納百川，有容乃大',
  introduction: '微笑著，努力著，欣賞著',
  title: '交互專家',
  group: '某某某事業群－某某平臺部－某某技術部－UED',
  tags: [
    {
      key: '0',
      label: '很有想法的',
    },
    {
      key: '1',
      label: '專註設計',
    },
    {
      key: '2',
      label: '一周兩次運動',
    },
    {
      key: '3',
      label: '看電影',
    },
    {
      key: '4',
      label: '早睡早起',
    },
    {
      key: '5',
      label: '168 節食',
    },
  ],
  notifyCount: 12,
  unreadCount: 11,
  country: 'Taiwan',
  address: 'NewTaipei City',
  phone: '0900-123456',
};

export default [
  {
    url: '/basic-api/account/getAccountInfo',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(userInfo);
    },
  },
  {
    url: '/basic-api/user/sessionTimeout',
    method: 'post',
    statusCode: 401,
    response: () => {
      return resultError();
    },
  },
  {
    url: '/basic-api/user/tokenExpired',
    method: 'post',
    statusCode: 200,
    response: () => {
      return resultError('Token Expired!', { code: ResultEnum.TIMEOUT as number });
    },
  },
] as MockMethod[];
