import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util';

export function createFakeRoleList() {
  return [
    {
      id: 'c510b431-01c2-4593-95bc-6ce8f56c3a10',
      roleName: 'admin',
      remark: 'admin',
      status: 1,
      addMasterName: 'gladys.ding',
      addTime: '2023-07-20T00:00:00.000Z',
      changeMasterName: 'gladys.ding',
      changeTime: '2023-09-02T06:14:40.000Z',
    },
    {
      id: 'c510b431-01c2-4593-95bc-6ce8f56c3a11',
      roleName: 'default',
      remark: 'default',
      status: 1,
      addMasterName: 'gladys.ding',
      addTime: '2023-07-20T00:00:00.000Z',
      changeMasterName: 'gladys.ding',
      changeTime: '2023-09-02T06:14:40.000Z',
    },
    {
      id: 'c510b431-01c2-4593-95bc-6ce8f56c3a12',
      roleName: 'test',
      remark: 'test',
      status: 1,
      addMasterName: 'gladys.ding',
      addTime: '2023-07-20T00:00:00.000Z',
      changeMasterName: 'gladys.ding',
      changeTime: '2023-09-02T06:14:40.000Z',
    },
  ];
}

export function createFakeDeptList() {
  return [
    {
      id: 'fc43bed5-e3c4-47a8-82cb-1beee6dd1eaa',
      parentDept: '',
      deptName: 'billing',
      remark: 'billing 111111',
      status: 1,
      addMasterName: 'gladys.ding',
      addTime: '2023-07-20T00:00:00.000Z',
      changeMasterName: 'gladys.ding',
      changeTime: '2023-09-02T06:14:40.000Z',
    },
    {
      id: 'fc43bed5-e3c4-47a8-82cb-1beee6dd1eab',
      parentDept: '',
      deptName: 'acounting',
      remark: 'acounting 1111111',
      status: 1,
      addMasterName: 'gladys.ding',
      addTime: '2023-07-20T00:00:00.000Z',
      changeMasterName: 'gladys.ding',
      changeTime: '2023-09-02T06:14:40.000Z',
    },
    {
      id: 'fc43bed5-e3c4-47a8-82cb-1beee6dd1eac',
      parentDept: '',
      deptName: 'sales',
      remark: 'sales 111111',
      status: 1,
      addMasterName: 'gladys.ding',
      addTime: '2023-07-20T00:00:00.000Z',
      changeMasterName: 'gladys.ding',
      changeTime: '2023-09-02T06:14:40.000Z',
    },
  ];
}

export default [
  // mock user login
  {
    url: '/basic-api/api/v1.0/system/menu/dynamicNav',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body;
      console.log('username:', username);
      console.log('password:', password);

      return resultSuccess(createFakeRoleList());
    },
  },
  {
    url: '/basic-api/api/v1.0/system/role',
    method: 'get',
    response: ({ body }) => {
      const { username, password } = body;
      console.log('username:', username);
      console.log('password:', password);

      return resultSuccess(createFakeRoleList());
    },
  },
  {
    url: '/basic-api/api/v1.0/system/department',
    method: 'get',
    response: ({ body }) => {
      const { username, password } = body;
      console.log('username:', username);
      console.log('password:', password);

      return resultSuccess(createFakeDeptList());
    },
  },
] as MockMethod[];
