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
    {
      userId: '503',
      username: '503',
      realName: 'Steven Jhu',
      avatar: 'https://picsum.photos/640/640',
      desc: 'Develop',
      password: '123456',
      token: 'fakeToken503',
      homePath: '/home',
      roles: [
        {
          roleName: 'develop',
          value: 'develop',
        },
      ],
    },
    {
      userId: '409',
      username: '409',
      realName: 'Devin Chen',
      avatar: 'https://picsum.photos/640/640',
      desc: 'super',
      password: '123456',
      token: 'fakeToken409',
      homePath: '/home',
      roles: [
        {
          roleName: 'Admin',
          value: 'super',
        },
      ],
    },
    {
      userId: '519',
      username: '519',
      mark: 'ecv',
      realName: 'Telliex Chiu',
      avatar: 'https://picsum.photos/640/640',
      desc: 'super',
      password: '123456',
      token: 'fakeToken519',
      homePath: '/home',
      roles: [
        {
          roleName: 'Admin',
          value: 'super',
        },
      ],
    },
    {
      userId: '560',
      username: '560',
      mark: 'ecr',
      realName: 'Telliex Chiu',
      avatar: 'https://picsum.photos/640/640',
      desc: 'super',
      password: '123456',
      token: 'fakeToken560',
      homePath: '/home',
      roles: [
        {
          roleName: 'Admin',
          value: 'super',
        },
      ],
    },
    {
      userId: '144',
      username: '144',
      password: '123456',
      realName: 'Gladys Ding',
      avatar: 'https://picsum.photos/640/640',
      desc: 'op',
      token: 'fakeToken144',
      homePath: '/home',
      roles: [
        {
          roleName: 'operation',
          value: 'operation',
        },
      ],
    },
    {
      userId: '542',
      username: '542',
      mark: 'ecv',
      password: '123456',
      realName: 'Eric Lin',
      avatar: 'https://picsum.photos/640/640',
      desc: 'op',
      token: 'fakeToken542',
      homePath: '/home',
      roles: [
        {
          roleName: 'operation',
          value: 'operation',
        },
      ],
    },
    {
      userId: '533',
      username: '533',
      mark: 'ecr',
      password: '123456',
      realName: 'Eric Lin',
      avatar: 'https://picsum.photos/640/640',
      desc: 'op',
      token: 'fakeToken533',
      homePath: '/home',
      roles: [
        {
          roleName: 'operation',
          value: 'operation',
        },
      ],
    },
    {
      userId: '583',
      username: '583',
      mark: 'ecv',
      password: '123456',
      realName: 'Janice Lee',
      avatar: 'https://picsum.photos/640/640',
      desc: 'op',
      token: 'fakeToken583',
      homePath: '/home',
      roles: [
        {
          roleName: 'operation',
          value: 'operation',
        },
      ],
    },
    {
      userId: '554',
      username: '554',
      mark: 'ecr',
      password: '123456',
      realName: 'Janice Lee',
      avatar: 'https://picsum.photos/640/640',
      desc: 'op',
      token: 'fakeToken554',
      homePath: '/home',
      roles: [
        {
          roleName: 'operation',
          value: 'operation',
        },
      ],
    },
    {
      userId: '464',
      username: '464',
      password: '123456',
      realName: 'Sally Hsu',
      avatar: 'https://picsum.photos/640/640',
      desc: 'op',
      token: 'fakeToken464',
      homePath: '/home',
      roles: [
        {
          roleName: 'operation',
          value: 'operation',
        },
      ],
    },
    {
      userId: '465',
      username: '465',
      password: '123456',
      realName: 'Jenah Chen',
      avatar: 'https://picsum.photos/640/640',
      desc: 'op',
      token: 'fakeToken465',
      homePath: '/home',
      roles: [
        {
          roleName: 'operation',
          value: 'operation',
        },
      ],
    },
    {
      userId: '361',
      username: '361',
      password: '123456',
      realName: 'Mike Hsiao',
      avatar: 'https://picsum.photos/640/640',
      desc: 'Tester',
      token: 'fakeToken361',
      homePath: '/home',
      roles: [
        {
          roleName: 'tester',
          value: 'tester',
        },
      ],
    },
    {
      userId: '329',
      username: '329',
      password: '123456',
      realName: 'Tiffany Chang',
      avatar: 'https://picsum.photos/640/640',
      desc: 'Tester',
      token: 'fakeToken329',
      homePath: '/home',
      roles: [
        {
          roleName: 'tester',
          value: 'tester',
        },
      ],
    },
    {
      userId: '623',
      username: '623',
      password: '123456',
      realName: 'Felix Chang',
      avatar: 'https://picsum.photos/640/640',
      desc: 'Tester',
      token: 'fakeToken623',
      homePath: '/home',
      roles: [
        {
          roleName: 'tester',
          value: 'tester',
        },
      ],
    },
    {
      userId: '280',
      username: '280',
      password: '123456',
      realName: 'Ricky Wu',
      avatar: 'https://picsum.photos/640/640',
      desc: 'Tester',
      token: 'fakeToken280',
      homePath: '/home',
      roles: [
        {
          roleName: 'tester',
          value: 'tester',
        },
      ],
    },
    {
      userId: '424',
      username: '424',
      password: '123456',
      realName: 'Eva Yang',
      avatar: 'https://picsum.photos/640/640',
      desc: 'Tester',
      token: 'fakeToken424',
      homePath: '/home',
      roles: [
        {
          roleName: 'tester',
          value: 'tester',
        },
      ],
    },
    {
      userId: '330',
      username: '330',
      password: '123456',
      realName: 'Silvia Lee',
      avatar: 'https://picsum.photos/640/640',
      desc: 'Tester',
      token: 'fakeToken330',
      homePath: '/home',
      roles: [
        {
          roleName: 'tester',
          value: 'tester',
        },
      ],
    },
    {
      userId: '346',
      username: '346',
      password: '123456',
      realName: 'Shuyi Fang',
      avatar: 'https://picsum.photos/640/640',
      desc: 'Tester',
      token: 'fakeToken346',
      homePath: '/home',
      roles: [
        {
          roleName: 'tester',
          value: 'tester',
        },
      ],
    },
    {
      userId: '50',
      username: '50',
      password: '123456',
      realName: 'Sophia Wu',
      avatar: 'https://picsum.photos/640/640',
      desc: 'Tester',
      token: 'fakeToken50',
      homePath: '/home',
      roles: [
        {
          roleName: 'tester',
          value: 'tester',
        },
      ],
    },
    {
      userId: '8',
      username: '8',
      password: '123456',
      realName: 'Linda Lin',
      avatar: 'https://picsum.photos/640/640',
      desc: 'Tester',
      token: 'fakeToken8',
      homePath: '/home',
      roles: [
        {
          roleName: 'tester',
          value: 'tester',
        },
      ],
    },
    {
      userId: '337',
      username: '337',
      mark: 'ecv',
      password: '123456',
      realName: 'Amy Hsieh',
      avatar: 'https://picsum.photos/640/640',
      desc: 'BU',
      token: 'fakeToken337',
      homePath: '/home',
      roles: [
        {
          roleName: 'bu',
          value: 'bu',
        },
      ],
    },
    {
      userId: '532',
      username: '532',
      mark: 'ecr',
      password: '123456',
      realName: 'Amy Hsieh',
      avatar: 'https://picsum.photos/640/640',
      desc: 'BU',
      token: 'fakeToken532',
      homePath: '/home',
      roles: [
        {
          roleName: 'bu',
          value: 'bu',
        },
      ],
    },
    {
      userId: '570',
      username: '570',
      password: '123456',
      realName: 'Doris Lo',
      avatar: 'https://picsum.photos/640/640',
      desc: 'BU',
      token: 'fakeToken570',
      homePath: '/home',
      roles: [
        {
          roleName: 'bu',
          value: 'bu',
        },
      ],
    },
    {
      userId: '522',
      username: '522',
      mark: 'ecr',
      password: '123456',
      realName: 'Doris Lo',
      avatar: 'https://picsum.photos/640/640',
      desc: 'BU',
      token: 'fakeToken522',
      homePath: '/home',
      roles: [
        {
          roleName: 'bu',
          value: 'bu',
        },
      ],
    },
    {
      userId: '451',
      username: '451',
      mark: 'ecv',
      password: '123456',
      realName: 'Lynne Lee',
      avatar: 'https://picsum.photos/640/640',
      desc: 'BU',
      token: 'fakeToken451',
      homePath: '/home',
      roles: [
        {
          roleName: 'bu',
          value: 'bu',
        },
      ],
    },
    {
      userId: '553',
      username: '553',
      mark: 'ecr',
      password: '123456',
      realName: 'Lynne Lee',
      avatar: 'https://picsum.photos/640/640',
      desc: 'BU',
      token: 'fakeToken553',
      homePath: '/home',
      roles: [
        {
          roleName: 'bu',
          value: 'bu',
        },
      ],
    },
    {
      userId: '571',
      username: '571',
      mark: 'ecv',
      password: '123456',
      realName: 'Claire Tai',
      avatar: 'https://picsum.photos/640/640',
      desc: 'BU',
      token: 'fakeToken571',
      homePath: '/home',
      roles: [
        {
          roleName: 'bu',
          value: 'bu',
        },
      ],
    },
    {
      userId: '548',
      username: '548',
      mark: 'ecr',
      password: '123456',
      realName: 'Claire Tai',
      avatar: 'https://picsum.photos/640/640',
      desc: 'BU',
      token: 'fakeToken548',
      homePath: '/home',
      roles: [
        {
          roleName: 'bu',
          value: 'bu',
        },
      ],
    },
    {
      userId: '572',
      username: '572',
      mark: 'ecv',
      password: '123456',
      realName: 'Cindy Lee',
      avatar: 'https://picsum.photos/640/640',
      desc: 'BU',
      token: 'fakeToken572',
      homePath: '/home',
      roles: [
        {
          roleName: 'bu',
          value: 'bu',
        },
      ],
    },
    {
      userId: '547',
      username: '547',
      mark: 'ecr',
      password: '123456',
      realName: 'Cindy Lee',
      avatar: 'https://picsum.photos/640/640',
      desc: 'BU',
      token: 'fakeToken547',
      homePath: '/home',
      roles: [
        {
          roleName: 'bu',
          value: 'bu',
        },
      ],
    },
    {
      userId: '581',
      username: '581',
      mark: 'ecv',
      password: '123456',
      realName: 'Youyun Chien',
      avatar: 'https://picsum.photos/640/640',
      desc: 'BU',
      token: 'fakeToken581',
      homePath: '/home',
      roles: [
        {
          roleName: 'bu',
          value: 'bu',
        },
      ],
    },
    {
      userId: '551',
      username: '551',
      mark: 'ecr',
      password: '123456',
      realName: 'Youyun Chien',
      avatar: 'https://picsum.photos/640/640',
      desc: 'BU',
      token: 'fakeToken551',
      homePath: '/home',
      roles: [
        {
          roleName: 'bu',
          value: 'bu',
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
  {
    url: '/basic-api/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body;
      const checkUser = createFakeUserList().find(
        (item) => item.username === username && password === item.password,
      );
      if (!checkUser) {
        return resultError('Incorrect account or password！');
      }
      const { userId, username: _username, token, realName, desc, roles } = checkUser;
      return resultSuccess({
        roles,
        userId,
        username: _username,
        token,
        realName,
        desc,
      });
    },
  },
  {
    url: '/basic-api/getUserInfo',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!');
      }
      return resultSuccess(checkUser);
    },
  },
  {
    url: '/basic-api/getPermCode',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid token!');
      }
      const codeList = fakeCodeList[checkUser.userId];

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
