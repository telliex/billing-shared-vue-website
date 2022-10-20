/*
 * @Description:
 * @Anthor: Telliex
 * @Date: 2022-10-06 07:49:16
 * @LastEditors: Telliex
 * @LastEditTime: 2022-10-17 09:06:59
 */
import { Result } from '../utils';

const fakeUserInfo = {
  userId: '1',
  username: 'billing',
  realName: 'Data Platform Admin',
  desc: 'manager',
  password: '123456',
  token: 'fakeToken1',
  roles: [
    {
      roleName: 'Super Admin',
      value: 'super',
    },
  ],
};
export default class UserService {
  async login() {
    return Result.success(fakeUserInfo);
  }

  async getUserInfoById() {
    return Result.success(fakeUserInfo);
  }
}
