import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util';

export function createFakeUserList() {
  return [
    {
      id: 'c510b431-01c2-4593-95bc-6ce8f56c3e50',
      displayName: 'telliex.chiu',
      avatar: null,
      password: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
      remark: 'text 111111',
      apiToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZ3ROdW1iZXIiOjU0NSwic3ViIjoiYzUxMGI0MzEtMDFjMi00NTkzLTk1YmMtNmNlOGY1NmMzZTUxIiwiaWF0IjoxNjkxNjQ2NTE0LCJleHAiOjE2OTE2NDY4NzR9.W_s7ct1QK4qL3dNCPI2JToNLHGqFipC-rUHM_cEF2u0',
      status: 1,
      addMasterName: 'gladys.ding',
      addTime: '2023-07-20T00:00:00.000Z',
      changeMasterName: 'gladys.ding',
      changeTime: '2023-09-02T06:14:40.000Z',
      sex: 'F',
      birthday: '1999-10-10',
      tel: '227829232',
      mobile: '0968787878',
      email: 'telliex.chiu@gmail.com',
      address: '新北市板橋區',
      country: 'TW',
      roles: [
        {
          roleName: 'admin',
          value: '1f6d9b0f-ad84-4830-ad53-9b89726bac90',
        },
        {
          roleName: 'default',
          value: 'c59b5565-ccae-45f9-97b1-d1133abd7389',
        },
      ],
    },
    {
      id: 'c510b431-01c2-4593-95bc-6ce8f56c3e51',
      displayName: 'joe.lin',
      avatar: null,
      password: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
      remark: 'text 222222',
      apiToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZ3ROdW1iZXIiOjU0NSwic3ViIjoiYzUxMGI0MzEtMDFjMi00NTkzLTk1YmMtNmNlOGY1NmMzZTUxIiwiaWF0IjoxNjkxNjQ2NTE0LCJleHAiOjE2OTE2NDY4NzR9.W_s7ct1QK4qL3dNCPI2JToNLHGqFipC-rUHM_cEF2u0',
      status: 1,
      addMasterName: 'gladys.ding',
      addTime: '2023-07-20T00:00:00.000Z',
      changeMasterName: 'gladys.ding',
      changeTime: '2023-09-02T06:14:40.000Z',
      sex: 'F',
      birthday: '1999-10-11',
      tel: '227829232',
      mobile: '0968676767',
      email: 'joe.lin@gmail.com',
      address: '新北市中和區',
      country: 'TW',
      roles: [
        {
          roleName: 'admin',
          value: '1f6d9b0f-ad84-4830-ad53-9b89726bac90',
        },
        {
          roleName: 'default',
          value: 'c59b5565-ccae-45f9-97b1-d1133abd7389',
        },
      ],
    },
    {
      id: 'c510b431-01c2-4593-95bc-6ce8f56c3e52',
      displayName: 'jasica.zhang',
      avatar: null,
      password: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
      remark: 'text 3333333',
      apiToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZ3ROdW1iZXIiOjU0NSwic3ViIjoiYzUxMGI0MzEtMDFjMi00NTkzLTk1YmMtNmNlOGY1NmMzZTUxIiwiaWF0IjoxNjkxNjQ2NTE0LCJleHAiOjE2OTE2NDY4NzR9.W_s7ct1QK4qL3dNCPI2JToNLHGqFipC-rUHM_cEF2u0',
      status: 1,
      addMasterName: 'gladys.ding',
      addTime: '2023-07-20T00:00:00.000Z',
      changeMasterName: 'gladys.ding',
      changeTime: '2023-09-02T06:14:40.000Z',
      sex: 'F',
      birthday: '1999-10-10',
      tel: '227829232',
      mobile: '0968787878',
      email: 'jasica.zhang@gmail.com',
      address: '新北市新店區',
      country: 'TW',
      roles: [
        {
          roleName: 'admin',
          value: '1f6d9b0f-ad84-4830-ad53-9b89726bac90',
        },
        {
          roleName: 'default',
          value: 'c59b5565-ccae-45f9-97b1-d1133abd7389',
        },
      ],
    },
    {
      id: 'c510b431-01c2-4593-95bc-6ce8f56c3e53',
      displayName: 'oma.chen',
      avatar: null,
      password: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
      remark: 'text 444444',
      apiToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZ3ROdW1iZXIiOjU0NSwic3ViIjoiYzUxMGI0MzEtMDFjMi00NTkzLTk1YmMtNmNlOGY1NmMzZTUxIiwiaWF0IjoxNjkxNjQ2NTE0LCJleHAiOjE2OTE2NDY4NzR9.W_s7ct1QK4qL3dNCPI2JToNLHGqFipC-rUHM_cEF2u0',
      status: 1,
      addMasterName: 'gladys.ding',
      addTime: '2023-07-20T00:00:00.000Z',
      changeMasterName: 'gladys.ding',
      changeTime: '2023-09-02T06:14:40.000Z',
      sex: 'F',
      birthday: '1939-10-10',
      tel: '227219232',
      mobile: '0928787878',
      email: 'oma.chen@gmail.com',
      address: '新竹市',
      country: 'TW',
      roles: [
        {
          roleName: 'admin',
          value: '1f6d9b0f-ad84-4830-ad53-9b89726bac90',
        },
        {
          roleName: 'default',
          value: 'c59b5565-ccae-45f9-97b1-d1133abd7389',
        },
      ],
    },
    {
      id: 'c510b431-01c2-4593-95bc-6ce8f56c3e54',
      displayName: 'ming.chen',
      avatar: null,
      password: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
      remark: 'text 5555555',
      apiToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZ3ROdW1iZXIiOjU0NSwic3ViIjoiYzUxMGI0MzEtMDFjMi00NTkzLTk1YmMtNmNlOGY1NmMzZTUxIiwiaWF0IjoxNjkxNjQ2NTE0LCJleHAiOjE2OTE2NDY4NzR9.W_s7ct1QK4qL3dNCPI2JToNLHGqFipC-rUHM_cEF2u0',
      status: 1,
      addMasterName: 'gladys.ding',
      addTime: '2023-07-20T00:00:00.000Z',
      changeMasterName: 'gladys.ding',
      changeTime: '2023-09-02T06:14:40.000Z',
      sex: 'F',
      birthday: '1999-03-02',
      tel: '227829232',
      mobile: '0928673842',
      email: 'ming.chen@gmail.com',
      address: '新北市板橋區',
      country: 'TW',
      roles: [
        {
          roleName: 'admin',
          value: '1f6d9b0f-ad84-4830-ad53-9b89726bac90',
        },
        {
          roleName: 'default',
          value: 'c59b5565-ccae-45f9-97b1-d1133abd7389',
        },
      ],
    },
    {
      id: 'c510b431-01c2-4593-95bc-6ce8f56c3e55',
      displayName: 'ning.chiu',
      avatar: null,
      password: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
      remark: 'text 666666',
      apiToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZ3ROdW1iZXIiOjU0NSwic3ViIjoiYzUxMGI0MzEtMDFjMi00NTkzLTk1YmMtNmNlOGY1NmMzZTUxIiwiaWF0IjoxNjkxNjQ2NTE0LCJleHAiOjE2OTE2NDY4NzR9.W_s7ct1QK4qL3dNCPI2JToNLHGqFipC-rUHM_cEF2u0',
      status: 1,
      addMasterName: 'gladys.ding',
      addTime: '2023-07-20T00:00:00.000Z',
      changeMasterName: 'gladys.ding',
      changeTime: '2023-09-02T06:14:40.000Z',
      sex: 'M',
      birthday: '1939-10-10',
      tel: '247829232',
      mobile: '096834532',
      email: 'ning.chiu@gmail.com',
      address: '新北市板橋區',
      country: 'TW',
      roles: [
        {
          roleName: 'admin',
          value: '1f6d9b0f-ad84-4830-ad53-9b89726bac90',
        },
        {
          roleName: 'default',
          value: 'c59b5565-ccae-45f9-97b1-d1133abd7389',
        },
      ],
    },
    {
      id: 'c510b431-01c2-4593-95bc-6ce8f56c3e56',
      displayName: 'tim.li',
      avatar: null,
      password: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
      remark: 'text 7777777',
      apiToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZ3ROdW1iZXIiOjU0NSwic3ViIjoiYzUxMGI0MzEtMDFjMi00NTkzLTk1YmMtNmNlOGY1NmMzZTUxIiwiaWF0IjoxNjkxNjQ2NTE0LCJleHAiOjE2OTE2NDY4NzR9.W_s7ct1QK4qL3dNCPI2JToNLHGqFipC-rUHM_cEF2u0',
      status: 1,
      addMasterName: 'gladys.ding',
      addTime: '2023-07-20T00:00:00.000Z',
      changeMasterName: 'gladys.ding',
      changeTime: '2023-09-02T06:14:40.000Z',
      sex: 'F',
      birthday: '1999-10-10',
      tel: '227829232',
      mobile: '0968787878',
      email: 'tim.li@gmail.com',
      address: '臺北市大安區',
      country: 'TW',
      roles: [
        {
          roleName: 'admin',
          value: '1f6d9b0f-ad84-4830-ad53-9b89726bac90',
        },
        {
          roleName: 'default',
          value: 'c59b5565-ccae-45f9-97b1-d1133abd7389',
        },
      ],
    },
    {
      id: 'c510b431-01c2-4593-95bc-6ce8f56c3e57',
      displayName: 'jack.wei',
      avatar: null,
      password: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
      remark: 'text 888888',
      apiToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZ3ROdW1iZXIiOjU0NSwic3ViIjoiYzUxMGI0MzEtMDFjMi00NTkzLTk1YmMtNmNlOGY1NmMzZTUxIiwiaWF0IjoxNjkxNjQ2NTE0LCJleHAiOjE2OTE2NDY4NzR9.W_s7ct1QK4qL3dNCPI2JToNLHGqFipC-rUHM_cEF2u0',
      status: 1,
      addMasterName: 'gladys.ding',
      addTime: '2023-07-20T00:00:00.000Z',
      changeMasterName: 'gladys.ding',
      changeTime: '2023-09-02T06:14:40.000Z',
      sex: 'F',
      birthday: '1999-10-10',
      tel: '227829232',
      mobile: '0968787878',
      email: 'jack.wei@gmail.com',
      address: '新北市樹林區',
      country: 'TW',
      roles: [
        {
          roleName: 'admin',
          value: '1f6d9b0f-ad84-4830-ad53-9b89726bac90',
        },
        {
          roleName: 'default',
          value: 'c59b5565-ccae-45f9-97b1-d1133abd7389',
        },
      ],
    },
    {
      id: 'c510b431-01c2-4593-95bc-6ce8f56c3e58',
      displayName: 'nana.xiao',
      avatar: null,
      password: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
      remark: 'text 999999',
      apiToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZ3ROdW1iZXIiOjU0NSwic3ViIjoiYzUxMGI0MzEtMDFjMi00NTkzLTk1YmMtNmNlOGY1NmMzZTUxIiwiaWF0IjoxNjkxNjQ2NTE0LCJleHAiOjE2OTE2NDY4NzR9.W_s7ct1QK4qL3dNCPI2JToNLHGqFipC-rUHM_cEF2u0',
      status: 1,
      addMasterName: 'gladys.ding',
      addTime: '2023-07-20T00:00:00.000Z',
      changeMasterName: 'gladys.ding',
      changeTime: '2023-09-02T06:14:40.000Z',
      sex: 'F',
      birthday: '1979-06-03',
      tel: '227829226',
      mobile: '0961313221',
      email: 'nana.xiao@gmail.com',
      address: '新北市板橋區',
      country: 'TW',
      roles: [
        {
          roleName: 'admin',
          value: '1f6d9b0f-ad84-4830-ad53-9b89726bac90',
        },
        {
          roleName: 'default',
          value: 'c59b5565-ccae-45f9-97b1-d1133abd7389',
        },
      ],
    },
    {
      id: 'c510b431-01c2-4593-95bc-6ce8f56c3e59',
      displayName: 'chaz.zhang',
      avatar: null,
      password: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
      remark: 'text 000000',
      apiToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZ3ROdW1iZXIiOjU0NSwic3ViIjoiYzUxMGI0MzEtMDFjMi00NTkzLTk1YmMtNmNlOGY1NmMzZTUxIiwiaWF0IjoxNjkxNjQ2NTE0LCJleHAiOjE2OTE2NDY4NzR9.W_s7ct1QK4qL3dNCPI2JToNLHGqFipC-rUHM_cEF2u0',
      status: 1,
      addMasterName: 'gladys.ding',
      addTime: '2023-07-20T00:00:00.000Z',
      changeMasterName: 'gladys.ding',
      changeTime: '2023-09-02T06:14:40.000Z',
      sex: 'F',
      birthday: '1994-03-10',
      tel: '227829232',
      mobile: '0963787878',
      email: 'chaz.zhang@gmail.com',
      address: '桃園市中壢區',
      country: 'TW',
      roles: [
        {
          roleName: 'admin',
          value: '1f6d9b0f-ad84-4830-ad53-9b89726bac90',
        },
        {
          roleName: 'default',
          value: 'c59b5565-ccae-45f9-97b1-d1133abd7389',
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
    url: '/basic-api/api/v1.0/auth/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body;
      console.log('username:', username);
      console.log('password:', password);
      const checkUser = createFakeUserList().find(
        (item) => item.email === username && password === item.password,
      );
      if (!checkUser) {
        return resultError(null, { msg: 'Incorrect account or password！' });
      }

      return resultSuccess([checkUser]);
    },
  },
  {
    url: '/basic-api/api/v1.0/system/user',
    timeout: 200,
    method: 'get',
    response: () => {
      return resultSuccess(createFakeUserList());
    },
  },
  {
    url: '/basic-api/getPermCode',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      // const token = getRequestToken(request);
      // if (!token) return resultError(null, { msg: 'Invalid token!' });
      // const checkUser = createFakeUserList().find((item) => item.token === token);
      // if (!checkUser) {
      //   return resultError('Invalid token!');
      // }
      const codeList = fakeCodeList['1'];
      return resultSuccess(codeList);
    },
  },
  {
    url: '/basic-api/testRetry',
    statusCode: 405,
    method: 'get',
    response: () => {
      return resultError(null, { msg: 'testRetry' });
    },
  },
] as MockMethod[];
