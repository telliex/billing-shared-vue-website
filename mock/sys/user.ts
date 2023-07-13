import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util';

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'billing',
      realName: 'billing Admin',
      avatar: 'https://picsum.photos/640/640',
      desc: 'super',
      password: '123456',
      token: 'fakeToken1',
      homePath: '/home',
      roles: [
        {
          roleName: 'Admin',
          value: 'super',
        },
      ],
    },
    {
      userId: '2',
      username: 'tester',
      password: '123456',
      realName: 'test user',
      avatar: 'https://picsum.photos/640/640',
      desc: 'test',
      token: 'fakeToken2',
      homePath: '/home',
      roles: [
        {
          roleName: 'tester',
          value: 'tester',
        },
      ],
    },
    {
      userId: '3',
      username: 'develop',
      password: '123456',
      realName: 'developer',
      avatar: 'https://picsum.photos/640/640',
      desc: 'Develop',
      token: 'fakeToken3',
      homePath: '/home',
      roles: [
        {
          roleName: 'develop',
          value: 'develop',
        },
      ],
    },
    {
      userId: '4',
      username: 'sales',
      password: '123456',
      realName: 'sales user',
      avatar: 'https://picsum.photos/640/640',
      desc: 'sales',
      token: 'fakeToken4',
      homePath: '/home',
      roles: [
        {
          roleName: 'sales',
          value: 'sales',
        },
      ],
    },
    {
      userId: '5',
      username: 'accountant',
      password: '123456',
      realName: 'accountant user',
      avatar: 'https://picsum.photos/640/640',
      desc: 'Accountant',
      token: 'fakeToken5',
      homePath: '/home',
      roles: [
        {
          roleName: 'accountant',
          value: 'accountant',
        },
      ],
    },
  ];
}

const fakeCodeList: any = {
  '1': ['1000', '3000', '5000'],

  '2': ['2000', '4000', '6000'],
};
export default [
  // mock user login
  // {
  //   url: '/basic-api/login',
  //   timeout: 200,
  //   method: 'post',
  //   response: ({ body }) => {
  //     const { username, password } = body;
  //     const checkUser = createFakeUserList().find(
  //       (item) => item.username === username && password === item.password,
  //     );
  //     if (!checkUser) {
  //       return resultError('Incorrect account or password！');
  //     }
  //     const { userId, username: _username, token, realName, desc, roles } = checkUser;
  //     return resultSuccess({
  //       roles,
  //       userId,
  //       username: _username,
  //       token,
  //       realName,
  //       desc,
  //     });
  //   },
  // },
  // {
  //   url: '/basic-api/getUserInfo',
  //   method: 'get',
  //   response: (request: requestParams) => {
  //     const token = getRequestToken(request);

  //     if (!token) return resultError('Invalid token');
  //     const checkUser = createFakeUserList().find((item) => item.token === token);
  //     if (!checkUser) {
  //       return resultError('The corresponding user information was not obtained!');
  //     }
  //     return resultSuccess(checkUser);
  //   },
  // },
  {
    url: '/basic-api/getPermCode',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      console.log('ggggggggg', request);
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      // const checkUser = createFakeUserList().find((item) => item.token === token);
      // if (!checkUser) {
      //   return resultError('Invalid token!');
      // }
      const codeList = fakeCodeList[0];

      return resultSuccess(codeList);
    },
  },
  {
    url: '/basic-api/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid token!');
      }
      return resultSuccess(undefined, { msg: 'Token has been destroyed' });
    },
  },
  {
    url: '/basic-api/testRetry',
    statusCode: 405,
    method: 'get',
    response: () => {
      return resultError('Error!');
    },
  },
] as MockMethod[];
